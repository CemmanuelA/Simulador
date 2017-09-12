/*Declaramos la configuracion del webpack-plugin para pasar nuestro index.html a la carpeta build
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
   template: __dirname + '/App/index.html',
   filename: 'index.html',
   inject: 'body'
});*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('./App/css/styles.css');

//module.exports convierte nuestro JSX de App.js en JS puro con BABEL-LOADER y lo pasa a build/transformed.js con su respectivo index.html
module.exports = {
    entry: __dirname + '/src/index.jsx',
    module:{
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }

            ]

    },
    output: {
        filename: 'transformed.js',
        path: __dirname + '/App/js'
    },
    plugins: [extractCSS]
};
