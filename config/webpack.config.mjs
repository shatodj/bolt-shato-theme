import { merge } from "webpack-merge";
import commonConfig from "./webpack.config.common.mjs";

const envConfig =
  process.env.NODE_ENV === "production"
    ? await import("./webpack.config.prod.mjs")
    : await import("./webpack.config.dev.mjs");

export default merge(commonConfig, (await envConfig).default);
