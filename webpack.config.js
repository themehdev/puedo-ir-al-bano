// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
	entry: "./signup.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "signup.bundle.js",
		libraryTarget: "commonjs2", // For Node.js compatibility
	},
	plugins: [
		// fix "process is not defined" error:
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
		new webpack.ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
		}),
		new HtmlWebpackPlugin({
			template: "./fun.html", // Your HTML template file
		}),
		new NodePolyfillPlugin(),
	],
	resolve: {
		fallback: {
			buffer: require.resolve("buffer/"),
			crypto: require.resolve("crypto-browserify"),
			https: require.resolve("https-browserify"),
			http: require.resolve("stream-http"),
			zlib: require.resolve("browserify-zlib"),
			vm: require.resolve("vm-browserify"),
			//bindings: false,
			//fs: false,
		},
		extensions: [".ts", ".js"],
	},
	externals: [],
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/, // Apply to JavaScript files
				exclude: /node_modules/, // Exclude node_modules
				use: {
					loader: "babel-loader", // Use Babel for transpiling
					options: {
						presets: ["@babel/preset-env"], // Use Babel presets for browser compatibility
					},
				},
			},
			{
				test: /\.css$/, // Apply to CSS files
				use: ["style-loader", "css-loader"], // Use loaders for CSS
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i, // Apply to image files
				type: "asset/resource",
			},
		],
	},
};
