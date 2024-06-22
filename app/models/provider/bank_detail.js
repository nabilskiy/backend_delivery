var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var bank_detail = new schema({
    unique_id: Number,
    bank_holder_type: Number,
    account_holder_type: {type: String, default: ""},
    bank_holder_id: {type: schema.Types.ObjectId},
    bank_account_holder_name: {type: String, default: ""},
    routing_number: {type: String, default: ""},
    account_number: {type: String, default: ""},
    account_id: {type: String, default: ""},
    bank_id: {type: String, default: ""},
    is_selected:{type: Boolean, default: false},    
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
});

bank_detail.index({bank_holder_id: 1, bank_holder_type: 1}, {background: true});

bank_detail.plugin(AutoIncrement, { inc_field: 'unique_id' ,id: 'b_d_counter'});
module.exports = mongoose.model('bank_detail', bank_detail);