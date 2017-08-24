const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack=require('webpack');
const url = require('url')

const publicPath = '';

module.exports = function(){
    var env={}
    env.dev=process.env.NODE_ENV !== 'production'
    console.log("开发状态---",env.dev)
    return {
        entry: {
            vendor: './src/vendor.js',
            index: './src/index.js'
        },
        output: {
            filename: env.dev?'[name].js':'[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: env.dev ? '/' : publicPath
        }, plugins: env.dev ?[
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new webpack.HotModuleReplacementPlugin()
        ]:[
            new CleanWebpackPlugin(['dist']),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            })
        ],
        //不要用于生产环境
        devtool: env.dev ? '#eval-source-map' : '#source-map',
        devServer:{

            historyApiFallback: {
                index: url.parse(env.dev ? '/' : publicPath).pathname
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                },{
                    test: /\.html$/,
                    use: 'html-loader'
                },{
                    test: /favicon\.png$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash]'
                        }
                    }]
                }, {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                },{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                }
            ]}
    }
};