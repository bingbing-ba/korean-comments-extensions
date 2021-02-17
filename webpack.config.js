const path = require('path')
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin') // extension용 manifest
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseManifest = require('./manifest.json')
module.exports = {
  entry: {
    index_bundle: './src/index.js',
    background: './background.js',
  }, // 리액트 파일이 시작하는 곳
  output: {
    // bundled compiled 파일
    path: path.join(__dirname, '/dist'), //__dirname : 현재 디렉토리, dist 폴더에 모든 컴파일된 하나의 번들파일을 넣을 예정
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    // javascript 모듈을 생성할 규칙을 지정 (node_module을 제외한.js 파일을 babel-loader로 불러와 모듈을 생성
    rules: [
      {
        test: /\.(js|jsx)$/, // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
        exclude: /node_module/, // node module 폴더는 babel 컴파일에서 제외
        use: {
          loader: 'babel-loader', // babel loader가 파이프를 통해 js 코드를 불러옴
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // to use images with js
        test: /\.(png|jpg|jpeg)$/i,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new WebpackExtensionManifestPlugin({ config: { base: baseManifest } }),
    new CopyPlugin({
      //just to copy static files
      patterns: [{ from: 'static' }],
    }),
    new HtmlWebpackPlugin({ template: 'popup.html', filename: 'popup.html' }),
  ],
}
