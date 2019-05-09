const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (env) => {
    //获取环境变量
    return {
        entry:['./src/index.js'],
        output:{
            path: path.join(__dirname,'dist'),
            filename:'main.js'
        },
        
        devServer:{
            contentBase:path.join(__dirname,'dist'),
            open: true,
            hot: true,
            port:9900,
        },
        module:{
            rules:[
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                },
            ]
        },
        plugins:[
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'hello webpack',
            }),
        ]
    }
}