import webpack from "webpack";
import {buildDewServer} from "./buildDewServer";
import {buildLoader} from "./buildLoader";
import {BuildOptions} from "./types/types";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";



export function buildWebpack(options: BuildOptions): webpack.Configuration {

    const {mode, paths} = options
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',
        entry: paths.entry,  // путь до вхоного файла
        output: {                                           // куда происхдить сборка
            path: paths.output,
            filename: 'bundle.js',                          // имя файла
            clean: true                                     // очищаем каждый раз перед новой сборкой
        },

        plugins: buildPlugins(options),

        module: {
            rules: buildLoader(options),
        },

        resolve: buildResolvers(options),

        devtool: isDev ? 'inline-source-map' : false,

        devServer: buildDewServer(options),

    }
}