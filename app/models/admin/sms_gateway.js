var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var sms_gateway = new schema({
    unique_id: Number,
    name: {type: String, default: ""} ,
    description: {type: String, default: ""} ,
    sms_auth_id: {type: String, default: ""} ,
    sms_auth_token: {type: String, default: ""} ,
    sms_number: {type: String, default: ""} ,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

}, {
    usePushEach: true,
    strict: true,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})


sms_gateway.plugin(AutoIncrement, { inc_field: 'unique_id',id: 's_g_counter' });
module.exports = mongoose.model('sms_gateway', sms_gateway);