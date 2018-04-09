var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//使用module.exports导出
module.exports = mongoose.model('goods',new Schema({
	"cat_id": Number,
	"cat_name": String,
	"goods_id": Number,
	"goods_name": String,
	"goods_desc": String,
	"goods_price": String,
	"good_image": String,
	"goods_num": Number,
}));
