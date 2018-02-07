var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//使用module.exports导出
module.exports = mongoose.model('Blog',new Schema({
    title:String,
    body:String,
    author:String,
    tags:[{title: String}], 
    hidden:Boolean,
    category:String,
    comments: [{body: String, data: Date}],
    date: {type: Date , default: Date.now},
    mete: {
        votes: Number,  
        favs: Number  
    }
}));
