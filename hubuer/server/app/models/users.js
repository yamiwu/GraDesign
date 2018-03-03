var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//使用module.exports导出
module.exports = mongoose.model('User',new Schema({
  "name": String,
  "password": String,
  "phone":Number,
  "userId":Number,
  "orderList":[{
  	"orderId":String,
  	"orderName":String,
  	"orderTotal":Number,
  	"tel":Number,
  	"cartList":[{
		  "goods_id":String,
	    "goods_name": String,
	    "goods_desc":String,
	    "goods_price": String,
	    "goods_image": String,
	    "goods_num": Number,
	    "checked":Number
	  }]
  }],
  "cartList":[{
    "goods_id":String,
    "goods_name": String,
    "goods_desc":String,
    "goods_price": String,
    "goods_image": String,
    "goods_num": Number,
    "checked":Number
  }],
  "userInfo":[{
  	"infoName":String,
  	"infoTel":Number
  }]
}));