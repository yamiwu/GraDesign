//导入模块
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var morgan = require('morgan');



//导入config和User的内容
var config = require('./config');//读取配置文件config.js信息

//导入路由文件category.js
var UserRouter  = require('./app/routes/users');
var CatRouter  = require('./app/routes/cats');
var Goods  = require('./app/routes/goods');

//配置================================

//配置文件  设置端口
var port = process.env.PORT || 3000;
mongoose.connect(config.database);//连接数据库
app.set('superSecret', config.secret);

//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

//外部路由设置
app.use('/users',UserRouter);
app.use('/cats',CatRouter);
app.use('/goods',Goods);

app.listen(port);
console.log('正常启动了~');