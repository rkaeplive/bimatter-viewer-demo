const path = require("path");
const webpack = require("webpack");
module.exports = {
    entry: "./index.js",
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    stats: "errors-only",
    watchOptions: {
        poll: true,
        ignored: "**/node_modules",
    },
    devServer: {
        historyApiFallback: true,
        static: [
            {
                directory: path.resolve(__dirname),
            },
            {
                directory: path.resolve(__dirname, "Models"),
            },
        ],
        port: 8000,
    },
    output: {
        path: path.resolve(__dirname),
        filename: "build/bundle.js",
    },
};
