// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');


module.exports = {
    // 入口文件，指向app.js
    entry: {
        index: './js/index.js',
        login: './js/login.js',
        jquery: './node_modules/jquery/dist/jquery.min.js',
        bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js'
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'chunkhash=[chunkhash:10].name=[name].id=[id].js'
    },
    // loader
    module: {
        rules: [
            {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            }
        ]
    },
    // 将插件添加到webpack中
    plugins: [
        // 这里是添加的插件
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './html/login.html',
            chunks:['login'],
            hash: true,
            minify: {
                removeAttributeQuotes:true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './html/index.html',
            chunks:['index'],
            hash: true,
            minify: {
                removeAttributeQuotes:true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['jquery', 'bootstrap', 'runtime'],
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            chunks: ['index','login']//从first.js和second.js中抽取commons chunk
        }),
        new ExtractTextPlugin({
            //这里关键至极,filename:[name].[contenthash:5].css;之前我们项目是这样写的，这样写，打包出来的css就跑到dist/js里面去了，
            // 虽然不影响使用，但是混到一起就是很不舒服，
            //这里你们非常有必要先试试，filename:[name].[contenthash:5].css
            //还有就是最外层建一个 css文件夹  ，然后这样配置filename:css/[name].[contenthash:5].css,然后看看具体打包出什么，
            filename: (getPath)=>{
                return getPath('[name].[contenthash:5].css').replace("js","css")
            }
        }),
    ]
}