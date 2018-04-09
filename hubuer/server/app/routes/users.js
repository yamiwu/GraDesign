var express = require("express");
var router = express.Router();
var app = express();
var User = require('../models/users');//用户数据模型
var Goods = require('../models/goods');//用户数据模型

var jwt = require('jsonwebtoken'); // 用来创建和确认用户信息
var config = require('../../config');  //找到config.js文件
app.set('superSecret',config.secret);  //超级密码

//注册
router.post('/register',function(req,res){
	let param =req.body;
	User.findOne({userId:param.userId},function(err,doc){
		if(err){
			res.writeHead(200, {
			    "Content-Type": "text/plain; charset=utf-8",
			    "Access-Control-Allow-Origin": "*"
			});
            
	      return res.json({"status":"1",msg:err.message})
	    }else{
	      if(doc){
	      	res.writeHead(200, {
			    "Content-Type": "text/plain; charset=utf-8",
			    "Access-Control-Allow-Origin": "*"
			});
            
	       return res.json({"status":'1',msg:'该学号已存在'})
	      }else{
	      	var admin= new User({
	      	  "name": param.name,
			  "password": param.password,
			  "userId":param.userId,
			  "phone":param.phone
	      	});
	      	console.log(admin.password.length);
	      	if(admin.password.length < 6 ||admin.password.length >20){
	      		res.writeHead(200, {
			    "Content-Type": "text/plain; charset=utf-8",
			    "Access-Control-Allow-Origin": "*"
			});
            
	      	return res.json({"status":'1',msg:'密码长度应为6-20位，请重新设置'})
	      	}else{
	      		res.writeHead(200, {
				    "Content-Type": "text/plain; charset=utf-8",
				    "Access-Control-Allow-Origin": "*"
				});
            
	      		admin.save(function(err){
			        if(err){
			            return res.json({
			        	success: false,
			            message: "注册失败"+err
			    		})
			    	}
			      	return res.json({
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
	let param = req.body;
    //同过用户传递的信息 在mongoDB数据库中查找
    User.findOne({userId:param.userId},function(err,result){
    	res.writeHead(200, {
		    "Content-Type": "text/plain; charset=utf-8",
		    "Access-Control-Allow-Origin": "*"
		});
            
        if(err) throw err;
        if(!result){
            return res.json({
                success:false,
                message:"登录失败！用户信息不存在"
            })
        }else if(result.password != param.password){
            return res.json({
                success:false,
                message:"登录失败！密码不正确"
            })
        }else{
            //生成token 引用jwt模块的sign方法  前面一个对象随意填  后面一个字符串 
            var token = jwt.sign({name:'foo'},app.get('superSecret'))
            //回馈信息
            return res.json({
                success:true,
                message:"登录成功!",
                token:token,
                result:result
            })
        }
    })
})

//查看购物车
router.get('/cartList',function(req,res,next){
  let userId = req.query.userId;
  res.writeHead(200, {
	"Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  });
            
  User.findOne({userId:userId},function(err,doc){
    return res.json({
      status:0,
      msg:'查看购物车成功！',
      result:doc.cartList
    })
  })
})

//商品加入购物车
router.post('/addCart',function(req,res,next){
  var userId = req.body.userId;
  var goodsId = req.body.goods_id;
//var goodsNum = req.body.goods_num;

  User.findOne({userId:userId},function(err,userDoc){

    let goodsItem = '';
    // 当我们添加商品的时候，判断购物车里面有没有这个商品
    userDoc.cartList.forEach(function(item){
      if(item.goods_id == goodsId){
          goodsItem = item;
          item.goods_num++;
      }
    })

    if (goodsItem){
      userDoc.save(function (err2, doc2) {
      	res.writeHead(200, {
			"Content-Type": "text/plain; charset=utf-8",
		    "Access-Control-Allow-Origin": "*"
	    });
            
      	if(err2) throw err2;
        return res.json({
          status: '0',
          msg: '',
          result: '商品数量（+1）添加成功',//
          data:doc2
        })
      })
    }else{
      Goods.findOne({ 'goods_id': goodsId }, function (err, goodsDoc) {
        goodsDoc.goods_num = 1;
        goodsDoc.checked = 1;
        console.log(goodsDoc.checked);//=>1
        console.log(goodsDoc); //=> 没有checked属性
        userDoc.cartList.push(goodsDoc);
        userDoc.save(function (err3, doc3) {
        	res.writeHead(200, {
			    "Content-Type": "text/plain; charset=utf-8",
			    "Access-Control-Allow-Origin": "*"
			});
            return
          if(err3) throw err3;
          res.json({
            status: '0',
            msg: '',
            result: '加入购物车成功！',
            data:doc3
          })
        })
      })
    }
  })

})


	
//路由端口监听
module.exports = router;