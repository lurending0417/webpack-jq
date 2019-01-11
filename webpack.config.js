const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//配置文件
const config = {
    entry: {
        index: './src/js/index.js',
        login: './src/js/login.js',
        vendor: ['./node_modules/bootstrap/dist/js/bootstrap.min.js', 'jquery']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].[hash:8].js",
        publicPath: '',
        chunkFilename: "[name].[chunkHash:8].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                use: [
                    //小于10KB的图片会自动转成dataUrl，
                    'url-loader?limit=10000&name=img/[hash:8].[name].[ext]'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                /*exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件*/
                /*include: path.resolve(__dirname, 'src'),//在config中查看 编译时，需要包含哪些文件*/
            },
            {
                test:require.resolve('jquery'),
                loader:'expose-loader?$!expose-loader?jQuery'
            }
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['vendor']
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendor', 'runtime'],
        //     filename: '[name].js',
        //     minChunks: Infinity
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: '[name].js',
        //     chunks: ['index','login']//从index.js和login.js中抽取commons chunk
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            filename: '[name].js',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: 'inline-html-withimg-loader!'+path.resolve(__dirname, './src/login.html'),
            chunks:['manifest','vendor', 'login'],
            hash: true,
            minify: {
                removeAttributeQuotes:true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'inline-html-withimg-loader!'+path.resolve(__dirname, './src/index.html'),
            chunks:['manifest', 'vendor', 'index'],
            hash: true,
            minify: {
                removeAttributeQuotes:true
            }
        }),
        new ExtractTextPlugin('css/[name][id].css'),
        new ExtractTextPlugin('css/[name][id].css'),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './src/pages'),
            to: path.resolve(__dirname, './dist/pages'),
        }]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './src/css/common'),
            to: path.resolve(__dirname, './dist/css/common'),
        }]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './src/img'),
            to: path.resolve(__dirname, './dist/img'),
        }]),
        new webpack.ProvidePlugin({
           $: 'jquery'
        })
    ],
    devServer: {
        contentBase: './dist/',
        port: 3000,
        disableHostCheck: false,
        public: '192.168.20.199',
        host:'0.0.0.0'
    }
};




module.exports = config;
