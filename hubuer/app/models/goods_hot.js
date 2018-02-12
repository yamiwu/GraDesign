var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//使用module.exports导出
module.exports = mongoose.model('goods_hot',new Schema({
	"goods_id": String,
	"id": String,
	"cat_id": String,
	"cat_name": String,
	"brand_id": "0",
	"goods_name": String,
	"goods_desc": String,
	"goods_thumb": String,
	"goods_number": "0",
	"star_number": "0",
	"sort_order": "50",
	"price": "1898.00",
	"is_new": "0",
	"is_best": "0",
	"is_hot": "1",
	"site_id": "0"
	"productId": String,
	"productName": String,
	"salePrice": Number,
	"productImage": String,
	"productNum": String,
}));
