var express = require("express");
var router = express.Router();
var app = express();
var User = require('../models/users');//用户数据模型
var Goods = require('../models/goods');//用户数据模型

var jwt = require('jsonwebtoken'); // 用来创建和确认用户信息
var config = require('../../config');  //找到config.js文件
app.set('superSecret',config.secret);  //超级密码

//检测账号是否可用
router.post('/registerTest',function(req,res){
	res.writeHead(200, {
		"Access-Control-Allow-Origin": "*"
	});
	let param =req.body;
	User.findOne({userId:param.userId},function(err,doc){
		if(err){
			res.write(JSON.stringify({
					"status":"1",
					msg:err.message
				})
			)
    		res.end();
	    }else{
	    	
	      if(doc){
	      	res.write(JSON.stringify({
					"status":'1',
					msg:'该学号已存在'
				})
			)
    		res.end();
	       
	      }else{
	      	res.write(JSON.stringify({
					"status":'0',
					msg:'该学号可用'
				})
			)
    		res.end();
	      }
	    }
	})
});

//注册
router.post('/register',function(req,res){
	res.writeHead(200, {
		"Access-Control-Allow-Origin": "*"
	});
	let param =req.body;
	User.findOne({userId:param.userId},function(err,doc){
		if(err){
			res.write(JSON.stringify({
					"status":"1",
					msg:err.message
				})
			)
    		res.end();
	    }else{
	    	
	      if(doc){
	      	res.write(JSON.stringify({
					"status":'1',
					msg:'该学号已存在'
				})
			)
    		res.end();
	       
	      }else{
	      	
	      	var admin= new User({
	      	  "name": param.name,
			  "password": param.password,
			  "userId":param.userId,
			  "phone":param.phone
	      	});
	      	console.log(admin.password.length);
	      	if(admin.password.length < 6 ||admin.password.length >20){
        		res.write(JSON.stringify({
	        			"status":'1',
	        			msg:'密码长度应为6-20位，请重新设置'
        			})
				)
    			res.end();
	      	}else{
	      		admin.save(function(err){
			        if(err){
			        	res.write(JSON.stringify({
								success: false,
				            	message: "注册失败"+err
							})
						)
    					res.end();
			    	}
			        res.write(JSON.stringify({
							success: true,
				      		"status":'0',
				      		msg:'注册成功！',
				      		doc:doc,
				      		user:admin
						})
					)
    				res.end();

		        })
	      	}
	      	
	      }
	    }
	})
})

//登录
router.post('/login',function(req,res){
	res.writeHead(200, {
		"Access-Control-Allow-Origin": "*"
	});
	let param = req.body;
    //同过用户传递的信息 在mongoDB数据库中查找
    User.findOne({userId:param.userId},function(err,result){
        if(err) throw err;
        console.log(req)
        console.log(param)
        if(!result){
        	res.write(JSON.stringify({
					success:false,
                	message:"登录失败！用户信息不存在"
				})
			)
    		res.end();
        }else if(result.password != param.password){
        	res.write(JSON.stringify({
					success:false,
                	message:"登录失败！密码不正确"
				})
			)
    		res.end();
        }else{
            //生成token 引用jwt模块的sign方法  前面一个对象随意填  后面一个字符串 
            var token = jwt.sign({name:'foo'},app.get('superSecret'))
            //回馈信息
            res.write(JSON.stringify({
					success:true,
	                message:"登录成功!",
	                token:token,
	                result:result
				})
			)
    		res.end();
        }
    })
})

//查看购物车
router.get('/cartList',function(req,res,next){
  let userId = req.query.userId;
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*"
  });
            
  User.findOne({userId:userId},function(err,doc){
  	res.write(JSON.stringify({
			status:0,
		    msg:'查看购物车成功！',
		    result:doc.cartList
		})
	)
    res.end();
  })
  
})


//商品加入购物车 及数量修改
router.post('/addCart',function(req,res,next){
  res.writeHead(200, {
	"Access-Control-Allow-Origin": "*"
  });	

  var userId = req.body.userId;
  var goodsId = req.body.goods_id;
  var goodsNum = req.body.goods_num;
//console.log(req.body)
  Goods.findOne({ 'goods_id': goodsId }, function (err, goodDoc) {
  	good_image = goodDoc.good_image;
  })
  
  User.findOne({userId:userId},function(err,userDoc){
	console.log(userDoc);
    let goodsItem = '';
    // 当我们添加商品的时候，判断购物车里面有没有这个商品
    userDoc.cartList.forEach(function(item){
//  	console.log(item)
      if(item && (item.goods_id == goodsId)){
      	  goodsItem.good_image=item.good_image
          goodsItem = item;
          if(goodsNum){
          	  if(goodsNum == 0){
	          	item.goods_num=1;
	          }else if(goodsNum == (-1)){
	          	item.goods_num--;
	          }else{
	          	item.goods_num = goodsNum;
	          }
          }else{
          	item.goods_num++;
          }
          
      }
    })

    if(goodsItem){
      userDoc.save(function (err2, doc2) {
      	if(err2) throw err2;
        res.write(JSON.stringify({
	          status: '0',
	          msg: '',
	          result: '商品数量修改成功',
	          data:doc2
	        })
        )
        res.end()
        console.log("我是goodsItem");
        console.log(goodsItem)
      })
    }else{
      Goods.findOne({ 'goods_id': goodsId }, function (err, goodsDoc) {
//      goodsDoc.checked = 1;
        console.log(goodsDoc); //=> 没有checked属性
        userDoc.cartList.push(goodsDoc);
        userDoc.save(function (err3, doc3) {
          if(err3) throw err3;
          res.write(JSON.stringify({
	           status: '0',
	           msg: '',
	           result: '加入购物车成功！',
	           data:doc3
	        })
          )
          res.end()
          console.log("我是userDoc.cartList");
          console.log(userDoc.cartList)
        })
      })
    }
  })

})

//删除购物车中的商品
router.post('/removeGoods',function(req,res,next){
  res.writeHead(200, {
	"Access-Control-Allow-Origin": "*"
  });	

  var userId = req.body.userId;
  var goodsId = req.body.goods_id;
  console.log(req.body)
  
  User.findOne({userId:userId},function(err,userDoc){
  	console.log("item操作前")
	console.log(userDoc);
    //查找购物车里中的商品
    userDoc.cartList.forEach(function(item){
    	
      if(item && (item.goods_id == goodsId)){
      	console.log(item)
      	userDoc.cartList.remove(item);
      	console.log(userDoc);
      	userDoc.save(function(err3, doc3) {
			if(err3) throw err3;
			res.write(JSON.stringify({
				status: '0',
				msg: '',
				result: '删除购物车商品成功！',
				data: doc3
			}))
			res.end()
		})
      	
      }else{
      	console.log("查无此物")
      }
    })
  })

})


//添加取货信息 姓名、电话、取货号
router.post('/addInfo',function(req,res,next){
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*"
  });
  
  let info = req.body;
  var newInfo = {
  	"infoName":info.infoName,
  	"infoTel":info.infoTel
  }
  User.findOne({userId:info.userId},function(err,userDoc){
  	
		userDoc.userInfo.push(newInfo);
        userDoc.save(function (err3, doc3) {
          if(err3) throw err3;
          res.write(JSON.stringify({
	           status: '0',
	           msg: '添加用户信息成功！',
	           data:doc3.userInfo
	        })
          )
          res.end();
        })
  })
  
})

//查看用户信息
router.get('/getInfo',function(req,res,next){
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*"
  });
  var userId = req.query.userId
  User.findOne({userId:userId},function(err,userDoc){
    if(err) throw err;
    res.write(JSON.stringify({
		    status: '0',
		    msg: '查看用户信息成功！',
		    data:userDoc.userInfo
		})
    )
    res.end();
  })
  
})
//路由端口监听
module.exports = router;