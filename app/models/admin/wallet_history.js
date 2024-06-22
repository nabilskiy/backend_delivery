var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var wallet = new schema({
    unique_id: Number,
    user_type: Number,
    user_unique_id: Number,
    user_id: {type: schema.Types.ObjectId},
    country_id: {type: schema.Types.ObjectId},
    from_amount: {type: Number, default: 0},
    from_currency_code: {type: String, default: ""},
    to_currency_code: {type: String, default: ""},
    current_rate: {type: Number, default: 1},
    wallet_information: {type: Object, default: {}},

    wallet_status: {type: Number, default: 0},
    wallet_comment_id: {type: Number, default: 1},
    wallet_description: {type: String, default: ""},

    wallet_amount: {type: Number, default: 0},
    added_wallet: {type: Number, default: 0},
    total_wallet_amount: {type: Number, default: 0},
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

wallet.index({wallet_comment_id: 1, user_type: 1, created_at: 1}, {background: true});

wallet.plugin(AutoIncrement, { inc_field: 'unique_id' ,id: 'wallet_counter'});
module.exports = mongoose.model('wallet', wallet);