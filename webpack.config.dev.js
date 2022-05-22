const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',// el punto de entrada de mi aplicación
  output: {// Esta es la salida de mi bundle
    path: path.resolve(__dirname, 'dist'),
    // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
    // para no tener conflictos entre Linux, Windows, etc
    clean: true,
    filename: '[name].js',// EL NOMBRE DEL ARCHIVO FINAL,
    assetModuleFilename: 'assets/images/[name][ext][query]'
  },
  mode: 'development',
  watch: true,
  resolve: {
    extensions: ['.js'],// LOS ARCHIVOS QUE WEBPACK VA A LEER
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module: {// REGLAS PARA TRABAJAR CON WEBPACK
    rules: [
      {// Test declara que extensión de archivos aplicara el loader
        test: /\.m?js$/,
        exclude: /node_modules/,// Exclude permite omitir archivos o carpetas especificas
        use: {// Use es un arreglo u objeto donde dices que loader aplicaras
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/fonts/[name][ext]",
        },
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10000,// O LE PASAMOS UN NUMERO
        //     // Habilita o deshabilita la transformación de archivos en base64.
        //     mimetype: "application/font-woff",
        //     name: "[name].[contenthash].[ext]",// EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN
        //     // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
        //     // ubuntu-regularhola.woff
        //     outputPath: "./assets/fonts/",// EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
        //     publicPath: "./assets/fonts/",// EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
        //     esModule: false,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css'
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src", "assets/images"),
    //       to: "assets/images"
    //     }
    //   ]
    // }),
    new Dotenv(),
  ],
}