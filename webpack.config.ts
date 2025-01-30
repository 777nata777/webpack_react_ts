import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


type Mode = 'production'  | 'development';

interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development';

    const config: {
        mode: "production" | "development";
        output: { path: string; filename: string; clean: boolean };
        devtool: string | boolean;
        devServer: { port: number; hot: boolean; open: boolean };
        entry: string;
        resolve: { extensions: string[] };
        plugins: (HtmlWebpackPlugin | webpack.ProgressPlugin | ReactRefreshPlugin)[];
        module: { rules: ({ test: RegExp; use: string[] } | { test: RegExp; use: string; exclude: RegExp })[] }
    } = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),  // путь до вхоного файла
        output: {                                           // куда происхдить сборка
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',                          // имя файла
            clean: true                                     // очищаем каждый раз перед новой сборкой
        },

        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }), //подставляет скрипты в нашу html. для генерации HTML-файла
            new webpack.ProgressPlugin(), // при build видим процент загрузки, медленный
            new ReactRefreshWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        ],

        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
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
            ],
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },

        devtool: isDev ? 'inline-source-map' : false,

        devServer: {
            port: 3000,
            open: true,
            hot: true,
        }

    }

    return config;
};