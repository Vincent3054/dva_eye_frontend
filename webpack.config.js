const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name]-[hash:5].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets/'),
      routes: path.resolve(__dirname, './src/routes/'),
      components: path.resolve(__dirname, './src/components/'),
      layouts: path.resolve(__dirname, './src/layouts/'),
      utils: path.resolve(__dirname, './src/utils/'),
      services: path.resolve(__dirname, './src/services/'),
      node_modules: path.resolve(__dirname, './node_modules'),
      data: path.resolve(__dirname, './src/data'),
    },
    extensions: ['.js']
  },
  node: { fs: 'empty' },//匯出excel用的
  module: {
    rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
    },{
      test: /\.less$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
      }, {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          }
        }
      }],
    },
    {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }],
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.(png|jpg)$/,
      include: path.join(__dirname, 'dist/assets'),
      loader: 'file-loader'
    }, {
      enforce: 'pre',
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    },
    { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
    { test: /\.(jpe?g|png|gif|svg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.ico')
    }),
    new Dotenv(),
  ],
  devServer: {
    port: dotenv.parsed.APP_PORT || 8080,
    host: dotenv.parsed.APP_HOST || 'localhost',
    inline: false,
    hot: false,
  },
};
