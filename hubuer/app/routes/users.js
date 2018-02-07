var express = require("express");
var router = express.Router();
var User = require('../models/users')

//注册
router.post('/register',function(req,res){
	let param = {
      name:req.body.userName,
      password:req.body.userPwd
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
	User.findOne(param,function(err,doc){
	    if(err){
	      res.json({"status":"1",msg:err.message})
	    }else{
	      if(!doc){
	        res.json({"status":'1',msg:'',result:'用户名和密码错误'})
	      }
	      res.cookie('userId',doc._id,{
	        path:'/',
	        maxAge:1000 * 60 * 60 * 24
	      })
	      res.cookie('userName',doc.name,{
	        path:'/',
	        maxAge:1000 * 60 * 60 * 24
	      })
	
	      if(doc){
	        res.json({
	          status:0,
	          msg:'登录成功！',
	          result:{
	            name:doc
	          }
	        })
	      }
	    }
	})
	
})

//路由端口监听
module.exports = router;