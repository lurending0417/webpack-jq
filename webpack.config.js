const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function lessResourceLoader() {
    let loaders = [
        'css-loader',
        'less-loader',
        {
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    path.resolve(__dirname, './src/css/common/config.less'),
                ]
            }
        }
    ];
    return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
    })
}




//配置文件
const config = {
    entry: {
        index: './src/js/index.js',
        login: './src/js/login.js',
        vendor: ['jquery', './node_modules/bootstrap/dist/js/bootstrap.min.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].[hash:8].js",
        publicPath: '',
        chunkFilename: "[name].[chunkHash:8].js",
    },
    module: {
        rules: [
            // {
            //     test: /\.(woff2?)(\?v=[0-9]\.[0-9]\.[0-9])$/,
            //     loader: 'url-loader?limit=10000&name=fonts/[hash:8].[name].[ext]&mimetype=application/font-woff'
            // },
            {
                test: /\.((woff2?|svg|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))$/,
                use: [
                    'url-loader?&limit=10000&name=fonts/[hash:8].[name].[ext]'
                ]
            },
            {
                test: /\.(svg|jpe?g|png|gif|ico)$/,
                use: [
                    //小于10KB的图片会自动转成dataUrl，
                    'url-loader?&limit=10000&name=img/[hash:8].[name].[ext]'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: lessResourceLoader()
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件*/
                //include: path.resolve(__dirname, 'src'),//在config中查看 编译时，需要包含哪些文件*/
            },
            {
                test:require.resolve('jquery'),
                loader:'expose-loader?$!expose-loader?jQuery'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: 'inline-html-withimg-loader!'+path.resolve(__dirname, './src/login.html'),
            chunks:['runtime','vendor', 'login'],
            hash: true,
            minify: {
                removeAttributeQuotes:true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'inline-html-withimg-loader!'+path.resolve(__dirname, './src/index.html'),
            chunks:['runtime', 'vendor', 'index'],
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
        host:'0.0.0.0'
    }
};




module.exports = config;
