// Утилита для работы с путями
const path = require('path');

// Плагин для работ ы webpack с html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Плагин для очистки папки dist при каждой новой сборке
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Плагин для объединения нескольких css-файлов в один
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    // Подключаем плагин html-webpack-plugin
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    // Подключаем плагин clean-webpack-plugin
    new CleanWebpackPlugin(),
    // Подключаем плагин mini-css-extract-plugin
    new MiniCssExtractPlugin(),
  ],
};
