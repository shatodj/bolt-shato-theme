import chalk from "chalk";
import path from "path";
import fs from "fs"; // Using fs promises API for asynchronous file operations

const copyFiles = async (files, destinationDir) => {
  for (const file of files) {
    const fileName = path.basename(file);
    const destination = path.join(destinationDir, fileName);
    const newDestination = path.join(
      destinationDir,
      `__${fileName}`,
    );

    // check if file exists and rename it if necessary but only if __ is not already present
    if (fs.existsSync(destination)) {
      if (fs.existsSync(newDestination)) {
        console.warn(
          chalk.yellow(`File ${fileName} already exists as __${fileName}. Skipping rename.`)
        );
      } else {
        console.log(`File ${fileName} already exists. Renaming to ${newDestination}`);
        await fs.promises.rename(destination, newDestination);
      }
    }

    console.log(`Copying ${file} to ${destination}`);
    await fs.promises.copyFile(file, destination);
  }
}

const copyThemeFiles = async () => {
  console.log("Copying theme files to the Bolt config directory.");

  const themeFiles = [
    path.resolve("./config/bolt/contenttypes.yaml"),
    path.resolve("./config/bolt/taxonomy.yaml"),
    path.resolve("./config/bolt/menu.yaml"),
  ];
  const boltConfigDir = path.resolve("./../../../config/bolt");

  const configFiles = [
    path.resolve("./config/bolt/services.yaml"),
  ]
  const boltConfigDirServices = path.resolve("./../../../config");

  copyFiles(themeFiles, boltConfigDir);
  copyFiles(configFiles, boltConfigDirServices);

  console.log(chalk.green("Theme files copied successfully."));
}

const runTasks = async () => {
  try {
    await copyThemeFiles();

    console.log(chalk.green("Preparation tasks completed successfully."));
  } catch (error) {
    console.error(chalk.red(error.message));
    throw error;
  }
};

runTasks();
