const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const rand =  Math.floor(Math.random() * 999999);

module.exports = {
    entry: ['@babel/polyfill','./src/index.tsx'],
    output: {
        filename: 'scripts/bundle'+rand+'.js',
        path: path.resolve(__dirname, 'dist')
        //,publicPath: '/' //CURRENTLY FAILING FOR LOCAL. we need this for local testing, REMOVE Before Bundle

    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        // UNCOMMENT FOR BUILD:
       new HtmlWebpackPlugin({ template: path.join(__dirname, 'src', 'index.html'), filename: "./index.aspx" }),

        // COMMENT OUT FOR BUILD - WE ONLY NEED THIS FOR LOCAL TESTING ON A MAC
        //  new HtmlWebpackPlugin({ template: path.join(__dirname, 'src', 'index.html') }),

        new webpack.DefinePlugin({
            "process.env.API_URL":JSON.stringify("https://lobapps.sharepoint.com/demo")
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{ from: './src/favicon.ico', to: 'favicon.ico' }])
    ],
    module: {
        rules: [
            { test: /\.js$/, enforce: 'pre', exclude: /node_modules/,
            use: [{ loader: `babel-loader`, query: { presets: ['@babel/preset-env','@babel/preset-react']}}]},
            { test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.(png|jpg|gif)$/, use: [{ loader: 'url-loader', options: { limit: 8192 } }] }
        ],
    },
    mode: "development",
    devtool: 'source-map',
    devtool: 'cheap-eval-source-map'
};

