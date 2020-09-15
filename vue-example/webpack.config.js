const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: "development",
    entry: './index.js',
    devtool:'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /.css$/,
                loader: ['style-loader','css-loader','less-loader']
            },
            {
                test: /.less$/,
                loader: ['style-loader','css-loader','less-loader']
            },
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ],
    devServer:{
        contentBase: './dist',
        port: 9999,
        hot: true,
        open: true
    }
}