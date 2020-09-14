const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    library: 'Drawer',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: 'index.js',
    umdNamedDefine: true,
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss']
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
              hmr: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, 'postcss.config.js'),
              }
            }
          },
          'sass-loader',
        ]
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-source-map' : false,
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, '..', 'public'),
    stats: 'errors-only',
    clientLogLevel: 'none',
    compress: true,
    open: true,
    quiet: false,
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: [
    new ProgressBarPlugin(),
    // 这里我们指定编译需要用模板，模板文件是./src/template/index.html，所以接下来我们要创建一个index.html文件
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/drawer.min.css',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
