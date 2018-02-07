var express = require("express");
var router = express.Router();
var app = express();
var User = require('../models/users');//用户数据模型

var jwt = require('jsonwebtoken'); // 用来创建和确认用户信息
var config = require('../../config');  //找到config.js文件
app.set('superSecret',config.secret);  //超级密码

//登录==》用户认证接口
router.post('/',function(req,res){
    //同过用户传递的信息 在mongoDB数据库中查找
    User.findOne({name:req.body.name},function(err,result){
        if(err) throw err;
        if(!result){
            res.json({
                success:false,
                message:"认证失败！用户信息不存在"
            })
        }else if(result.password != req.body.password){
            res.json({
                success:false,
                message:"认证失败！密码不正确"
            })
        }else{
            //生成token 引用jwt模块的sign方法  前面一个对象随意填  后面一个字符串 
            var token = jwt.sign({name:'foo'},app.get('superSecret'))
            //回馈信息
            res.json({
                success:true,
                message:"认证成功!",
                token:token 
            })
        }
    })
})

//路由端口监听
module.exports = router;
