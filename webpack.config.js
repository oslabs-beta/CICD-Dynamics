// Modules
import path from 'path';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';// generate an HTML file and inject the necessary script tags automatically

dotenv.config();

export default {
  entry: path.join(path.resolve(), './frontend/src/', 'index.js'),
  output: {
    filename: 'bundle.js', // NOTE Specified name 'bundle.js' for when webpack builds app and generates a bundle containing all modules and dependencies
    path: path.resolve(path.resolve(), 'build'),
  },
  mode: process.env.MODE,
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }], '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CICDash',
      template: path.join(path.resolve(), './frontend/public', 'index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(path.resolve(), '/build'),
      publicPath: '/',
    },
    hot: true, // enables Hot Module Replacement
    historyApiFallback: true,
    compress: true,
    port: process.env.DEV_PORT,
    proxy: [
      {
        '/api': {
          target: `http://localhost:${process.env.SERV_PORT}/`,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  performance: {
    hints: false, // webpack won't emit warnings based on these size limits during the build
    maxEntrypointSize: 512000, // sets the max size, in bytes, that the entry point (main bundle) file should be before triggering a warning or error
    maxAssetSize: 512000, // sets the maximum size for individual assets (like images, stylesheets, etc.)
  },
};
