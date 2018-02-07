var express = require("express");
var router = express.Router();
//导入category模型  相当于构造函数 下面可以利用它来实例化
var Category = require('../models/category');  //分类数据模型

//添加分类
router.post('/',function(req,res){
    console.log("post请求");
    var title=req.body.title;
    var category=new Category({
        title:title
    });
    category.save(function(err){
		if(err){
			res.json({
				success: false,
				message: "添加分类失败"
			})
		}
		
		res.json({
				success: true,
				message: "添加分类成功~"
		})
		
	})
})

//查找分类
router.get('/',function(req,res){
    console.log("get请求");
    Category.find({},function(err,result){
        if(err){
			res.json({
				success: false,
				message: "查找分类失败"
			})
		}
		
		res.json({
				success: true,
                message: "查找分类成功~",
                data:result
		})
    })
})
//更新分类
router.put('/',function(req,res){
    console.log("put请求");
    var {title,newTitle}=req.body;
    console.log(title,newTitle);
    Category.findOneAndUpdate({title:title},{newTitle:newTitle},function(err,result){
        if(err){
			res.json({
				success: false,
				message: "更新分类失败"
			})
		}
		
		res.json({
				success: true,
				message: "更新分类成功~"
		})
    })
})
//删除分类
router.delete('/',function(req,res){
    console.log("delete请求");
    接收用户传递要删除的内容title
    var {title}=req.body;
    Category.remove({title:title},function(err,result){
        if(err){
			res.json({
				success: false,
				message: "删除分类失败"
			})
		}
		
		res.json({
				success: true,
				message: "删除分类成功~"
		})
    })
    
})
//路由端口监听
module.exports = router;