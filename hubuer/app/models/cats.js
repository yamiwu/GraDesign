var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//使用module.exports导出
module.exports = mongoose.model('Cats',new Schema({
    cat_i:String,
    cat_name: String,
    cat_desc: String,
    icon: String,
    sort_order: String,
    parent_id: String,
    is_show: String,
    site_id:String
}));
