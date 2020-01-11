
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const chalk = require('chalk');
const webpack = require('webpack');
const webpackFormatMessages = require('webpack-format-messages');
const webpackConfig = require('./webpack.config');

// Process CLI arguments
const argv = process.argv.slice(2);
const mode = argv.indexOf('--dev') !== -1 ? 'development' : 'production';

// build function (via webpack)
const build = () => {
  // eslint-disable-next-line no-console
  console.log(`Creating an optimized ${mode} build...`);

  const compiler = webpack(webpackConfig(mode));
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }
        messages = webpackFormatMessages({
          errors: [err.message],
          warnings: [],
        });
      } else {
        messages = stats.toJson({ all: false, warnings: true, errors: true });
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI
          && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false')
          && messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n'
                + 'Most CI servers set it automatically.\n',
          ),
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      const resolveArgs = {
        stats,
        warnings: messages.warnings,
      };

      return resolve(resolveArgs);
    });
  });
};


// run build async task
build()
  .then(({ stats, warnings }) => {
    if (stats.length) {
      console.log(chalk.yellow('Compilation stats.\n'));
      console.log(stats.join('\n\n'));
    }
    if (warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(warnings.join('\n\n'));
      console.log(
        `\nSearch for the ${chalk.underline(
          chalk.yellow('keywords'),
        )} to learn more about each warning.`,
      );
      console.log(
        `To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.\n`,
      );
    } else {
      console.log(chalk.green('Compiled successfully.\n'));
    }
  },
  (err) => {
    console.log(chalk.red('Failed to compile.\n'));
    console.error(err.message);

    process.exit(1);
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
