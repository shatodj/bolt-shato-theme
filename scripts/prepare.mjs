import chalk from "chalk";
import path from "path";
import fs from "fs"; // Using fs promises API for asynchronous file operations
import yaml from "yaml";
import handlebars from "handlebars";

const ENV_FILES = [path.resolve("./config/env.json.dist")];

const BOLT_CONFIG_FILES = [
  path.resolve("./../../../config/bolt/contenttypes.yaml"),
  path.resolve("./../../../config/bolt/taxonomy.yaml"),
  path.resolve("./../../../config/bolt/menu.yaml"),
];

const THEME_CONFIG_DIR = path.resolve("./config");

const prepareContentTypes = async () => {
  console.log("Preparing theme specific content types.");

  const promises = BOLT_CONFIG_FILES.map(async (boltConfigFile) => {
    const boltFileBaseName = path.basename(boltConfigFile);
    const [boltFile, themeFile] = await Promise.all([
      fs.promises.readFile(boltConfigFile, "utf8"),
      fs.promises.readFile(
        path.join(THEME_CONFIG_DIR, boltFileBaseName),
        "utf8",
      ),
    ]);

    const boltParsed = yaml.parse(boltFile);
    const themeParsed = yaml.parse(themeFile);

    const themeFirstKey = Object.keys(themeParsed)[0];

    if (boltParsed[themeFirstKey]) {
      console.log(
        `Bolt config file '${boltFileBaseName}' already configured. Skipping...`,
      );
      return boltFile;
    }

    console.log(
      `Saving backup of ${boltFileBaseName} >> __${boltFileBaseName}`,
    );
    await fs.promises.writeFile(
      path.join(path.dirname(boltConfigFile), `__${boltFileBaseName}`),
      boltFile + themeFile,
    );

    console.log(`Configuring config file ${boltFileBaseName}`);
    await fs.promises.writeFile(boltConfigFile, boltFile + themeFile);

    return boltConfigFile;
  });

  return Promise.all(promises);
};

const prepareEnvironment = async () => {
  console.log("Preparing environment.");

  const promises = ENV_FILES.map(async (envFile) => {
    const outputFile = envFile.replace(".dist", "");

    console.log(`Generating '${outputFile}'`);
    const themePath = path.resolve("./");
    const themeBaseName = path.basename(themePath);
    const proxyUrl = "bolt4.webpack.com";

    const source = await fs.promises.readFile(envFile);
    const template = handlebars.compile(source.toString());
    const contents = template({
      TEMPLATE_PATH: `/theme/${themeBaseName}/`,
      PROXY_URL: proxyUrl,
      HEADER:
        "This file is auto-generated using `npm run prepare`. Do not change it here or commit this file.",
    });

    await fs.promises.writeFile(outputFile, contents);

    return outputFile;
  });

  return Promise.all(promises);
};

const runTasks = async () => {
  try {
    await prepareEnvironment();
    console.log(chalk.green("Environment prepared successfully.\n"));
    await prepareContentTypes();
    console.log(chalk.green("Content types ready!\n"));
  } catch (error) {
    console.error(chalk.red(error.message));
    throw error;
  }
};

runTasks();
