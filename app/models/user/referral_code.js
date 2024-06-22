var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var referral_code = new schema({
    unique_id: Number,
    user_type: Number,
    user_id: {type: schema.Types.ObjectId},
    user_unique_id: Number,
    user_referral_code: {type: String, default: ""},
    referred_id: {type: schema.Types.ObjectId},
    referred_unique_id: Number,
    country_id: {type: schema.Types.ObjectId},
    currency_sign: {type: String, default: ""},
    current_rate: {type: Number, default: 1},
    referral_bonus_to_user_friend: {type: Number, default: 0},
    referral_bonus_to_user: {type: Number, default: 0},
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

referral_code.index({user_id: 1}, {background: true});

referral_code.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'r_c_counter' });
module.exports = mongoose.model('referral_code', referral_code);