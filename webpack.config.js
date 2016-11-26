var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var fs = require('fs-extra');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//bebin-----------packageInfo信息获取
var packageInfo = fs.readJsonSync("./package.json");
var getInfo = function(package){
  return !!(
    packageInfo.dependencies && packageInfo.dependencies[package] 
    || packageInfo.devDependencies && packageInfo.devDependencies[package]
  );  
}
var useSass = getInfo("sass-loader") && getInfo("node-sass");
var useImmutable = getInfo("immutable") && getInfo("redux-immutable");
//end  -----------packageInfo信息获取
//是否为生产环境
var isProduction = process.env.NODE_ENV === "production";

if(isProduction){
  var entry =  [
    './demo/index.jsx'
  ];
}else{
  var entry =  [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',//热替换入口文件
    './demo/index.jsx'
  ];
}
//webpack配置项
var config = {
  devtool: isProduction ? "source-map":"eval-source-map",
  entry: {
    app: entry,
  }, 
  output: {
    filename: 'bundle.js?hash=[hash]',
    //js打包输出目录，以package.json为准，是用相对路径
    path: path.resolve(__dirname,'./public/js'),
    //内存和打包静态文件输出目录，以index.html为准,使用绝对路径，最好以斜杠/结尾，要不有意想不到的bug
    publicPath: '/js/',
    //定义require.ensure文件名
		chunkFilename: '[name]-[id]-[chunkHash].chunk.js',
    libraryTarget: "var",
    sourceMapFilename: "[file].map"
  },
  module: {
    rules: [
      //匹配到rquire中以.css结尾的文件则直接使用指定loader
      { 
        test: /\.css$/, 
        loader: isProduction ? ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader",
        }) : ["style-loader","css-loader"], 
      },
      //limit是base64转换最大限制，小于设置值，都会转为base64格式
      //name是在css中提取图片的命名方式
      { 
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, //匹配图片或字体格式的文件
        //[path]是以publicPath为准
        loader: 'url-loader',
        query: {
          limit: 50000,
          name: isProduction ? "[path]../images/[name].[hash].[ext]" : "images/[name].[hash].[ext]",
        }
      },
      { 
        //匹配.js或.jsx后缀名的文件
        test: /\.js[x]?$/, 
        loader: 'babel-loader',
        //不解析node_modules的es6语法 
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
  },
  resolve: {
    //设置需要类库包调用位置，默认是node_modules
    modules: [
      path.resolve(__dirname,"src"),
      "web_modules",
      "node_modules",
    ],
    alias: {
    }, 
    //不可留空字符串
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), 
      'useImmutable': JSON.stringify(useImmutable), 
    }),
    new HtmlWebpackPlugin({
      template: 'html_template/index.html',
      //通过生成的html文件，使用上级目录在webpack-dev-middleware生成的内存文件中是访问不到的
      //不使用上级目录就可以，生产环境就没问题
      filename: isProduction ? './../index.html' : 'index.html',//以output.publicPath为参考位置,index.html在其上一级 
    }),
  ]
};
//使用sass配置
if(useSass) {
  config.module.rules.push(
    { 
      test: /\.scss$/, 
      loader: isProduction ? ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: ["css-loader","sass-loader"],
      }) : ["style-loader","css-loader"], 
    }
  );
}
if(isProduction){
  var loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
    // optionally pass test, include and exclude, default affects all loaders
    test: /\.css|.js|.jsx|.scss$/, 
    minimize: true,
    debug: false,
  })
  config.plugins.push(loaderOptionsPlugin)
  var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    sourceMap: true,
    compress: {
      warnings: false
    }
  });
  config.plugins.push(UglifyJsPlugin)
  config.plugins.push(
    //生成环境才把css单独打包，这样在开发环境css的热替也能生效。
    new ExtractTextPlugin({
      filename: '../css/styles.css?hash=[hash]',
      allChunks: true //最好true,要不后面加上sass-loader等时，会出现css没有提取的现象
    })
  )
}else{
  //热替换必须的开启的插件
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = config;

