var express = require("express");
var router = express.Router();
//导入cats模型  相当于构造函数 下面可以利用它来实例化
var Cats = require('../models/cats');  //分类数据模型

router.get('/',function(req,res){
	res.writeHead(200, {
	    "Access-Control-Allow-Origin": "*"
    });
    Cats.find({},function(err,result){
        if(err){
        	res.write('我是错误请求');
        	res.end();
        }else{
        	res.write(JSON.stringify({
	        		success:true,
	        		msg:"获取商品分类成功！",
	        		data:result
        		})
        	)
			res.end();
        }
    })

})

//修改商品分类信息
//router.post('/fix',function(req,res){
//  Cats.find({"cat_id":req.body.cat_id},function(err,result){
//  	console.log(result)
//      if(err){
//          return res.json({
//              success:false,
//              message:"商品分类信息更新失败！"+err
//          })
//      }else{
//      	res.json({
//      		success:true,
//      		msg:"商品分类信息更新成功！",
//      		data:result
//      	})
//      }
//  })
//
//})
//通过路由端口导出
module.exports = router;