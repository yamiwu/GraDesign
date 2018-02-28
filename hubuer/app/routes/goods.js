var express = require("express");
var router = express.Router();
//导入cats模型  相当于构造函数 下面可以利用它来实例化
var Goods = require('../models/goods');  //分类数据模型

//获取所有商品
router.get('/',function(req,res){
    Goods.find({},function(err,result){
        if(err){
            return res.json({
                success:false,
                msg:"获取所有商品失败！"
            })
        }else{
        	var length = result.length ;
        	res.json({
        		success:true,
        		msg:"获取所有商品成功！",
        		data:result,
        		allNumber:length
        		
        	})
        }
    })

})

//存入商品
router.post('/',function(req,res){

	var param=req.body;
//	console.log(param);
	Goods.findOne({"goods_id":param.goods_id},function(err,doc){
		if(err){
	      res.json({"status":"1",msg:err.message})
	    }else{
	      if(doc){
	        res.json({"status":'1',msg:'该商品数据库中已存在，无需再添加'})
	      }else{
	      	var good= new Goods({
	      		"cat_id": param.cat_id,
				"cat_name":  param.cat_name,
				"goods_id":  param.goods_id,
				"goods_name":  param.goods_name,
				"goods_desc":  param.goods_desc,
				"goods_price":  param.goods_price,
				"good_image":  param.good_image,
				"goods_num":  param.goods_num
	      	})
	      	good.save(function(err) {
				if(err) {
					res.json({
						success: false,
						message: "商品入库失败" + err
					})
				}else{
					res.json({
						success: true,
						"status": '0',
						msg: '商品入库成功！',
						doc: doc,
						good: good
					})
				}
				
			})
	      	
	      }
	    }
	})
	
	
})

//获取分类商品
router.get('/cat_goods',function(req,res){
    Goods.find({"cat_id":req.query.cat_id},function(err,result){
        if(err){
            return res.json({
                success:false,
                msg:"获取一类商品失败！"
            })
        }else{
        	let number = result.length ;
        	res.json({
        		success:true,
        		msg:"获取一类商品成功！",
        		data:result,
        		number:number
        	})
        }
    })

})

//通过路由端口导出
module.exports = router;