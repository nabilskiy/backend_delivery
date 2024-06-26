var mongoose = require('mongoose');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var promo_code = new schema({
    unique_id: Number,
    created_by: Number,
    created_id: {type: schema.Types.ObjectId, default: null},
    country_id: {type: schema.Types.ObjectId},
    city_id: {type: schema.Types.ObjectId},


    is_promo_have_date: {type: Boolean, default: false},
    promo_recursion_type: {type: Number, default: 0},
    promo_start_date: {
        type: Date
    },
    promo_expire_date: {
        type: Date
    },
    promo_start_time: {type: String, default: ""},
    promo_end_time: {type: String, default: ""},
    months: {type: Array, default: []},
    weeks: {type: Array, default: []},
    days: {type: Array, default: []},


    is_active: {type: Boolean, default: true},
    is_approved: {type: Boolean, default: false},


    promo_details: {type: String, default: ""},
    promo_code_name: {type: String, default: ""},
    promo_code_value: {type: Number, default: 0},
    promo_code_type: {type: Number, default: 0},
    promo_for: Number,
    promo_apply_on: [{type: schema.Types.ObjectId,default: []}],


    admin_loyalty_type: Number,
    admin_loyalty: {type: Number, default: 0},


    is_promo_have_minimum_amount_limit: {type: Boolean, default: false},
    promo_code_apply_on_minimum_amount: {type: Number, default: 0},
    is_promo_have_item_count_limit: {type: Boolean, default: false},
    promo_code_apply_on_minimum_item_count: {type: Number, default: 0},
    is_promo_have_max_discount_limit: {type: Boolean, default: false},
    promo_code_max_discount_amount: {type: Number, default: 0},


    is_promo_required_uses: {type: Boolean, default: false},
    promo_code_uses: {type: Number, default: 0},
    used_promo_code: {type: Number, default: 0},


    is_promo_apply_on_completed_order: {type: Boolean, default: false},
    promo_apply_after_completed_order: {type: Number, default: 0},

    promo_unlimited_use: { type: Boolean, default: false },

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

promo_code.index({country_id: 1, city_id: 1, promo_code_name: 1, created_id: 1}, {background: true});
promo_code.index({is_promo_expiry_date: 1}, {background: true});
promo_code.index({created_id: 1}, {background: true});

promo_code.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'promo_code_counter' });
module.exports = mongoose.model('promo_code', promo_code);
