// eslint-disable-next-line @typescript-eslint/no-var-requires
import HtmlWebpackPlugin from 'html-webpack-plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import CopyWebpackPlugin from 'copy-webpack-plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {resolve} from "path";

export default () => {
    return {
        mode: 'development',
        entry: {
            app: {import: ['./src/app.ts', './src/decorated-form.ts'], dependOn: ['cardinal']},
            cardinal: {import: '@icure/cardinal-sdk'},
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html',
            }),
            new CopyWebpackPlugin({
                patterns: [{
                    context: 'node_modules/@webcomponents/webcomponentsjs',
                    from: '**/*.js',
                    to: 'webcomponents'
                }],
            }),
        ],
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.yaml$/,
                    use: 'raw-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s([ca])ss$/,
                    use: [
                        {
                            loader: 'lit-scss-loader',
                            options: {
                                minify: true, // defaults to false
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'lit-scss-loader',
                            options: {
                                minify: true, // defaults to false
                            },
                        },
                        'extract-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.m?js/,
                    resolve: {
                        fullySpecified: false,
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: '[name].bundle.js',
            path: resolve('.', 'dist'),
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
            },
        },
    }
}
