var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var payment_gateway = new schema({
    unique_id: Number,
    name: {type: String, default: ""},
    description: {type: String, default: ""},
    payment_key_id: {type: String, default: ""},
    payment_key: {type: String, default: ""},
    payment_key1: {type: String, default: ""},
    payment_key2: {type: String, default: ""},
    payment_key3: {type: String, default: ""},
    admin_public_key: {type: String, default: ""},
    result_base_url: {type: String, default: ""},

    is_using_card_details: {type: Boolean, default: false},
    is_payment_by_web_url: {type: Boolean, default: false},
    is_payment_by_login: {type: Boolean, default: false},
    is_payment_visible: {type: Boolean, default: false},
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

payment_gateway.index({name: 1}, {background: true});

payment_gateway.plugin(AutoIncrement, { inc_field: 'unique_id' ,id: 'p_g_counter'});
module.exports = mongoose.model('payment_gateway', payment_gateway);