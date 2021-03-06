const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJSON = require('./package.json');

module.exports = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8081/'
  },
  devServer: {
    port: 8081,
    // 使用 html5 history API 时，所有的 404 请求都会响应 index.html 文件 
    historyApiFallback: true 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            // 1. 避免 babel 语法转义后，函数重复
            // 2. 避免 babel polyfill 将 API 添加到全局
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        "./MarketingApp": "./src/bootstrap.js"
      },
      shared: packageJSON.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}