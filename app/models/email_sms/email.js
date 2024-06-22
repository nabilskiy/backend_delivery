var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var email_detail = new schema({
    unique_id: Number,
    template_unique_id:Number,
    email_unique_title: String,
    email_title: String,
    email_content: String,
    email_admin_info: String,
    is_send: {type: Boolean, default: false}
});

email_detail.index({unique_id: 1}, {background: true});

email_detail.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'email_counter' });
module.exports = mongoose.model('email_detail', email_detail);
