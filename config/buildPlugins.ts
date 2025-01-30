import webpack, {Configuration, WebpackPluginInstance} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";



export function buildPlugins({mode, paths}: BuildOptions): WebpackPluginInstance[] {
    return [
        new HtmlWebpackPlugin({ template: paths.html }), //подставляет скрипты в нашу html. для генерации HTML-файла
        new webpack.ProgressPlugin() as unknown as WebpackPluginInstance, // при build видим процент загрузки, медленный
        new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        })
    ]
}