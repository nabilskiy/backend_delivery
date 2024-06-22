var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var sms_detail = new schema({
    unique_id: Number,
    sms_unique_title: String,
    sms_content: String,
    is_send: { type: Boolean, default: false }

});
sms_detail.plugin(AutoIncrement, { inc_field: 'unique_id', id: 'sms_counter' });
module.exports = mongoose.model('sms_detail', sms_detail);