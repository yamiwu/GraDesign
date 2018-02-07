var express = require("express");
var router = express.Router();
var app = express();
var Blog = require('../models/blog');//用户数据模型


//发布博文
router.post('/',function(req,res){
    var {title,body,author,tags,hidden,category} = req.body;
    console.log(title,body,author,tags,hidden,category);
    if(title.length<3){
        res.json({
            success:false,
            message:'标题长度不小于3'
        })
    }
    //分割成数组
    var tagsArray = tags.split(',');
    var tagsObjArray =[];
    //遍历并套成对象的格式
    tagsArray.forEach(function(v){
        tagsObjArray.push({title:v});
    })
    console.log(tagsObjArray);

    //实例化
    var blog = new Blog({
        title:title,
        body:body,
        author:author,
        tags:tagsObjArray,
        hidden:hidden,
        category:category
    })
    //存储博文
    blog.save(function(err,result){
        if(err){
			res.json({
				success: false,
				message: "发布博文失败"
			})
		}
		
		res.json({
				success: true,
                message: "发布博文成功~",
                data:result
		})
    })

})
//查看博客内容 
router.get('/',function(req,res){
    var {category} = req.query;
    var whereObj = {};
    //通过get传递category分类数据的时候触发
    if(category){
        var re = new RegExp('^'+ category +'$' );//面向对象的正则可以拼接
        whereObj ={ category:re}
    }
        Blog.find(whereObj,function(err,result){
            if(err){
                res.json({
                    success: false,
                    message: "查看博文失败"
		    })
		}
		
		res.json({
				success: true,
                data:result
		})
    })
});
//删除博客内容
router.delete('/',function(req,res){
    //通过title删除博客
    var {title} = req.body;
    // console.log(req.body);
    // console.log(req.query);
    // var whereTitle={};
    // if(title){
    //     var reg=new RegExp('^'+title+'$');
    //     whereTitle = {title:reg};
        
    // }
    Blog.remove({title:title},function(err,result){
        if(err){
            res.json({
                success: false,
                message: "删除博文失败"
            })
        }
        res.json({
            success: true,
            message: "删除博文成功"
        })
    })
})

//路由端口监听
module.exports = router;