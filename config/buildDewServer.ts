import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export function buildDewServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        hot: true,
    }
}