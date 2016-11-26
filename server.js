var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');//webpack.config.js同一目录
var port = 6688;
var app = express();
var compiler = webpack(config);

var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  //publicPath必须跟webpack.config.js的ouput.publickPath一致
  publicPath: config.output.publicPath,
})
app.use(webpackDevMiddleware);
app.use(require('webpack-hot-middleware')(compiler));
//访问的静态文件
app.use(express.static(path.join(__dirname, './public'),{
  //禁用目录index索引，要不生成环境打包后，开发环境访问域名会直接访问到index.html。
  index: false,
}));
//这里是特殊处理，因为是内存文件，在地址重写时，要重内存中把index.html文件内容取出来
compiler.plugin("done", function(stats) {
  try{
    var fs = compiler.outputFileSystem;
    var index_path = webpackDevMiddleware.getFilenameFromUrl(config.output.publicPath + "/index.html");
    //console.log(fs)
    var index = fs.readFileSync(index_path);
    //所有请求都定位到内存文件index.html
    app.get('*', function(req, res) {
      res.send(index.toString('utf8', 0, index.length));
    });
  }catch(e){
    console.log("----------",e)  
    console.log("----------")  
  }
})

var host = "localhost"
app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.info("==> 🌎  Listening on port %s. Open up http://"+host+":%s/ in your browser.", port, port)
});

