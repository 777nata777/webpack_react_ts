import {ModuleOptions} from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";


export function buildLoader(options: BuildOptions): ModuleOptions ['rules'] {
    return [

        {
            test: /\.module\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: options.isDev ? "[path][name]__[local]" : "[hash:base64:8]",
                        },
                    },
                },
                "sass-loader",
            ],
        },

        {
            test: /\.s[ac]ss$/i,
            exclude: /\.module\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",]
        },

        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ]
}