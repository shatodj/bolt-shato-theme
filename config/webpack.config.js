import { merge } from "webpack-merge";
import commonConfig from "./webpack.config.common.js";

const envConfig =
  process.env.NODE_ENV === "production"
    ? await import("./webpack.config.prod.js")
    : await import("./webpack.config.dev.js");

export default merge(commonConfig, (await envConfig).default);
