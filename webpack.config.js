const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        bundle: './docs/demo.js'
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        publicPath: './docs/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
          }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devServer: {
        contentBase: './docs/',
        compress: true,
        progress: true,
        port: 4000,
        open: true,
        stats: {
          assets: true,
          children: false,
          chunks: false,
          hash: false,
          modules: false,
          publicPath: false,
          timings: false,
          version: false,
          warnings: true,
          colors: true
        }
      }
}