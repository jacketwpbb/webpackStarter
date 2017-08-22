const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack=require('webpack');
const url = require('url')

const publicPath = '';

module.exports = function(env){
    return {
        entry: {
            vendor: './src/vendor',
            index: './src/index.js'
        },
        output: {
            filename: env.dev?'bundle.js':'bundle.js?[chunkhash]',
            path: path.resolve(__dirname, 'dist'),
            publicPath: env.dev ? '/src/' : publicPath
        }, plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']
            }),
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new webpack.HotModuleReplacementPlugin()

        ],
        //不要用于生产环境
        devtool: env.dev ? '#eval-source-map' : '#source-map',
        devServer:{
            contentBase:"./dist",
            hot: true,
            historyApiFallback: {
                index: url.parse(env.dev ? '/assets/' : publicPath).pathname
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
                }
            ]}
    }
};