/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const yaml = require('yaml');
const { compile } = require('handlebars');

const ENV_FILES = [
  path.resolve('./config/env.json.dist'),
  path.resolve('./config/env.scss.dist'),
];

const BOLT_CONFIG_FILES = [
  path.resolve('./../../../config/bolt/contenttypes.yaml'),
  path.resolve('./../../../config/bolt/taxonomy.yaml'),
];

const THEME_CONFIG_DIR = path.resolve('./config');

const prepareContentTypes = () => {
  console.log('Preparing theme specific content types.');

  const promises = BOLT_CONFIG_FILES.map((boltConfigFile) => new Promise((resolve, reject) => {
    try {
      const boltFileBaseName = path.basename(boltConfigFile);
      const boltFile = fs.readFileSync(boltConfigFile, 'utf8');
      const boltConfigFileBackup = path.join(path.dirname(boltConfigFile), `__${boltFileBaseName}`);
      const themeConfigFile = path.join(THEME_CONFIG_DIR, boltFileBaseName);
      const themeFile = fs.readFileSync(themeConfigFile, 'utf8');

      const boltParsed = yaml.parse(boltFile);
      const themeParsed = yaml.parse(themeFile);

      const themeFirstKey = Object.keys(themeParsed)[0];

      if (boltParsed[themeFirstKey]) {
        console.log(`Bolt config file '${boltFileBaseName}' already configured. Skipping...`);
        return resolve(boltFile);
      }

      console.log(`Saving backup of ${boltFileBaseName} >> __${boltFileBaseName}`);
      fs.writeFileSync(boltConfigFileBackup, boltFile + themeFile);

      console.log(`Configuring config file ${boltFileBaseName}`);
      fs.writeFileSync(boltConfigFile, boltFile + themeFile);

      return resolve(boltConfigFile);
    } catch (error) {
      return reject(error);
    }
  }));

  return Promise.all(promises);
};

const prepareEnvironment = () => {
  console.log('Preparing environment.');

  const promises = ENV_FILES.map((envFile) => {
    const outputFile = envFile.replace('.dist', '');

    console.log(`Generating '${outputFile}'`);
    const themePath = path.resolve('./');
    const themeBaseName = path.basename(themePath);
    const proxyUrl = 'bolt4.webpack.com';

    return new Promise((resolve, reject) => {
      try {
        const source = fs.readFileSync(envFile);
        const template = compile(source.toString());
        const contents = template({
          TEMPLATE_PATH: `/theme/${themeBaseName}/`,
          PROXY_URL: proxyUrl,
          HEADER:
            'Generated file using `npm run prepare`. Do change here or git commit.',
        });

        fs.writeFileSync(outputFile, contents);

        resolve(outputFile);
      } catch (error) {
        reject(error);
      }
    });
  });

  return Promise.all(promises);
};

prepareEnvironment()
  .then(() => {
    console.log(
      chalk.green('Environment prepared successfully.\n'),
    );
  })
  .then(() => prepareContentTypes())
  .then(() => {
    console.log(
      chalk.green('Content types ready!\'\n'),
    );
  })
  .catch((err) => {
    if (err && err.message) {
      console.error(chalk.red(err.message));
    }
    process.exit(1);
  });
