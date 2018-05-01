var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//使用module.exports导出
module.exports = mongoose.model('User',new Schema({
  "name": String,
  "password": String,
  "phone":Number,
  "userId":Number,
  "cartList":[{
		"cat_id": Number,
    "cat_name": String,
    "goods_id":String,
    "goods_name": String,
    "goods_desc":String,
    "goods_price": String,
    "good_image": String,
    "goods_num": Number
  }],
"orderList":[{
	"orderId":Number,
	"infoName":String,
	"infoTel":Number,
	"orderTotal":Number,
	"orderMount":String,
	"check":String,
	"cartList":[{
			"cat_id": Number,
      "cat_name": String,
		  "goods_id":String,
	    "goods_name": String,
	    "goods_desc":String,
	    "goods_price": String,
	    "good_image": String,
	    "goods_num": Number
	}]
}],

"userInfo":[{
	"infoName":String,
	"infoTel":Number
}]

}));
