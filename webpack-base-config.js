const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const WEBPACK_DEFAULT =  {
    entry: '',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        }
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({  
        filename: 'index.html',
        template: 'src/client/index.html',
        // hash: true
      }),
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/client'),
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist/client'),
      compress: true,
      port: 3000
    }
  };

  module.exports = WEBPACK_DEFAULT;