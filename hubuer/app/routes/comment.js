//评论
var express = require("express");
var router = express.Router();
//导入category模型  相当于构造函数 下面可以利用它来实例化
var Blog = require('../models/blog');  //分类数据模型

router.post('/',function(req,res){
    //解析赋值
    var {id,body} = req.body;
    console.log(id,body);
    Blog.findById(id,function(err,blog){
        if(err){
            return res.json({
                success:false,
                message:"发布评论失败！"
            })
        }
        //往博客的评论中添加了一条数据是对象格式的数据
        blog.comments.push({body});
        //存储到数据库
        blog.save(function(err){
            if(err){
                return res.json({
                    success:false,
                    message:"发布评论失败！"
                })
            }
            res.json({
                success:true,
                message:"发布评论成功！",
                data:blog
            })
        })

    })

})

//通过路由端口导出
module.exports = router;