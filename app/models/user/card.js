var mongoose = require('mongoose');
var schema = mongoose.Schema;
// var autoIncrement = require('mongoose-auto-increment');
var card = new schema({
    unique_id: Number,
    payment_method: {type: String, default: ""},
    card_type: {type: String, default: ""},
    card_expiry_date: {type: String, default: ""},
    card_holder_name: {type: String, default: ""},
    user_id: {type: schema.Types.ObjectId},
    user_type: Number,
    customer_id: {type: String, default: ""},
    payment_id: {type: schema.Types.ObjectId},
    is_default: {type: Boolean, default: false},
    last_four: {type: String, default: ""},
    token: {type: String, default: ""},
    is_liqpay: {type: Boolean, default: false},

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

card.index({user_id: 1, user_type: 1}, {background: true});
card.index({user_id: 1, payment_id: 1, is_default: 1}, {background: true});

// card.plugin(autoIncrement.plugin, {model: 'card', field: 'unique_id', startAt: 1, incrementBy: 1});
module.exports = mongoose.model('card', card);