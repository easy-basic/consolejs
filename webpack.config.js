const path = require('path');

module.exports = {
    entry: './src/terminal.js',
    output: {
        // path: path.resolve(__dirname, 'dist'),
        path: path.resolve(__dirname, '../easy-basic.github.io/src/src/assets/'),
        filename: 'terminal.bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};