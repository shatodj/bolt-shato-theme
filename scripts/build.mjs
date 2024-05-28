import webpack from "webpack";
import chalk from "chalk";
import webpackFormatMessages from "webpack-format-messages";

// Process CLI arguments
const argv = process.argv.slice(2);
const mode = argv.indexOf("--dev") !== -1 ? "development" : "production";
const isWatch = argv.indexOf("--watch") !== -1;

const build = () => {
  let compiler = webpack({
    mode: mode,
    watch: isWatch,
  });

  return new Promise((resolve, reject) => {
    const handler = (err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }
        messages = webpackFormatMessages({
          errors: [err.message],
          warnings: [wee.warnings],
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
        return reject(
          new Error(
            messages.errors
              .map((err) => {
                return `[${err.loc}] ${err.message}`;
              })
              .join("\r\n")
          )
        );
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== "string" ||
          process.env.CI.toLowerCase() !== "false") &&
        messages.warnings.length
      ) {
        console.log(
          chalk.cyan(
            "\nTreating warnings as errors because process.env.CI = true.\n" +
              "Most CI servers set it automatically.\n"
          )
        );
        return reject(new Error(messages.warnings.join("\n\n")));
      }

      const resolveArgs = {
        stats,
        warnings: messages.warnings,
      };

      return resolve(resolveArgs);
    };

    if (isWatch) {
      compiler.watch({}, handler);
    } else {
      compiler.run(handler);
    }
  });
};

build()
  .then(
    ({ stats, warnings }) => {
      if (stats.length) {
        console.log(chalk.yellow("Compilation stats.\n"));
        console.log(stats.join("\n\n"));
      }
      if (warnings.length) {
        console.log(chalk.yellow("Compiled with warnings.\n"));
        console.log(warnings.join("\n\n"));
        console.log(
          `\nSearch for the ${chalk.underline(
            chalk.yellow("keywords")
          )} to learn more about each warning.`
        );
        console.log(
          `To ignore, add ${chalk.cyan(
            "// eslint-disable-next-line"
          )} to the line before.\n`
        );
      } else {
        console.log(chalk.green("Compiled successfully.\n"));
      }
    },
    (err) => {
      console.log(chalk.red("Failed to compile.\n"));

      throw err;
    }
  )
  .catch((err) => {
    if (err && err.message) {
      console.error(chalk.red(err.message));
    }
    process.exit(1);
  });
