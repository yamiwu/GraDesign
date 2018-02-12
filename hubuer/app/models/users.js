var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//使用module.exports导出
module.exports = mongoose.model('User',new Schema({
  "name": String,
  "password": String,
  "phone":Number,
  "userId":String,
  "orderList":[{
  	"orderId":String,
  	"orderName":String,
  	"orderTotal":Number,
  	"tel":Number,
  	"cartList":[{
	    "productId":String,
	    "productName": String,
	    "salePrice": Number,
	    "productImage": String,
	    "productNum": Number,
	    "checked":String
	  }]
  }],
  "cartList":[{
    "productId":String,
    "productName": String,
    "salePrice": Number,
    "productImage": String,
    "productNum": Number,
    "checked":String
  }],
  "userInfo":[{
  	"infoName":String,
  	"infoTel":Number
  }]
}));
