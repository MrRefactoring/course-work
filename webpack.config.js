const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
  const ENV = process.env.NODE_ENV || 'development';

  const config = {
    watch: ENV === 'development',
    target: 'web',
    entry: {
      app: './src/index.js'
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      publicPath: ENV === 'development' ? '/' : './'
    },
    devServer: {
      contentBase: path.join(__dirname, './dist'),
      historyApiFallback: true
    },
    stats: {
      colors: true,
      chunks: false,
      modules: false,
    },
    resolve: {
      alias: {
        api: path.join(__dirname, './src/api'),
        components: path.join(__dirname, './src/components'),
        pages: path.join(__dirname, './src/pages'),
        router: path.join(__dirname, './src/router'),
        helpers: path.join(__dirname, './src/helpers'),
        store: path.join(__dirname, './src/store')
      }
    },
    module: {
      rules: [
        {
          test: [/\.js$/, /\.jsx$/],
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader']
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
          use: 'file-loader?name=[name].[ext]?[hash]'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
        },
        {
          test: [/\.js$/, /\.jsx$/],
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: './src/assets',
          to: './assets'
        }
      ]),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        template: './src/index.html',
        inject: 'body',
        hash: true,
        chunks: ['app'],
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        allChunks: true,
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
  };

  switch (ENV) {
    case 'production':
      config.devtool = false;
      config.optimization = { minimize: true };
      break;
    case 'development':
      config.devtool = false;
      break;
    case 'test':
      config.devtool = false;
      delete config.entry;
      break;
    default:
      break;
  }

  return config;
};
