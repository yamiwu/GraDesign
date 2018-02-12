var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//使用module.exports导出
module.exports = mongoose.model('goods_hot',new Schema({
	"goods_id": String,
	"id": String,
	"cat_id": String,
	"cat_name": String,
	"goods_name": String,
	"goods_desc": String,
	"goods_pict": String,
	"sort_order": "50",
	"price": Double,
	"site_id": "0"
	"productId": String,
	"productName": String,
	"salePrice": Number,
	"productImage": String,
	"productNum": Number,
}));
