var express = require("express");
var router = express.Router();
var app = express();
var User = require('../models/users');//用户数据模型

var jwt = require('jsonwebtoken'); // 用来创建和确认用户信息
var config = require('../../config');  //找到config.js文件
app.set('superSecret',config.secret);  //超级密码

//注册
router.post('/register',function(req,res){
	let param = {
      name:req.body.userName,
      password:req.body.userPwd,
      phone:req.body.phone
 	}
	User.findOne({name:param.name},function(err,doc){
		if(err){
	      res.json({"status":"1",msg:err.message})
	    }else{
	      if(doc){
	        res.json({"status":'1',msg:'用户名已存在'})
	      }else{
	      	var admin= new User({
			      name:param.name,
			      password:param.password,
			      phone:param.phone,
			      admin:true
	      	})
	      	console.log(admin.password.length)
	      	if(admin.password.length < 6 ||admin.password.length >20){
	      		res.json({"status":'1',msg:'密码长度应为6-20位，请重新设置'})
	      	}else{
	      		admin.save(function(err){
			        if(err){
			            res.json({
			        	success: false,
			            message: "注册失败"+err
			    		})
			    	}
			      	res.json({
			      		success: true,
			      		"status":'0',
			      		msg:'注册成功！',
			      		doc:doc,
			      		user:admin
			    	})
		        })
	      	}
	      	
	      }
	    }
	})
})

//登录
router.post('/login',function(req,res){
	let param = {
      name:req.body.userName,
      password:req.body.userPwd
 	}
    //同过用户传递的信息 在mongoDB数据库中查找
    User.findOne({name:param.name},function(err,result){
        if(err) throw err;
        if(!result){
            res.json({
                success:false,
                message:"登录失败！用户信息不存在"
            })
        }else if(result.password != param.password){
            res.json({
                success:false,
                message:"登录失败！密码不正确"
            })
        }else{
            //生成token 引用jwt模块的sign方法  前面一个对象随意填  后面一个字符串 
            var token = jwt.sign({name:'foo'},app.get('superSecret'))
            //回馈信息
            res.json({
                success:true,
                message:"登录成功!",
                token:token,
                result:result
            })
        }
    })
})
	

//	User.findOne(param,function(err,doc){
//	    if(err){
//	      res.json({"status":"1",msg:err.message})
//	    }else{
//	      if(!doc){
//	        res.json({"status":'1',msg:'',result:'用户名或密码错误'})
//	      }
//	      res.cookie('userId',doc._id,{
//	        path:'/',
//	        maxAge:1000 * 60 * 60 * 24
//	      })
//	      res.cookie('userName',doc.name,{
//	        path:'/',
//	        maxAge:1000 * 60 * 60 * 24
//	      })
//	
//	      if(doc){
//	        res.json({
//	          status:0,
//	          msg:'登录成功！',
//	          result:{
//	              name:doc
//	          }
//	        })
//	      }
//	    }
//	})
	
//})

//路由端口监听
module.exports = router;