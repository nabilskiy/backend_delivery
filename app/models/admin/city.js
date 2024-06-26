var mongoose = require('mongoose');
var schema = mongoose.Schema;
 const AutoIncrement = require('mongoose-sequence')(mongoose);
var city = new schema({
    unique_id: Number,
    country_id: {type: schema.Types.ObjectId},
    city_code: {type: String, default: ""},
    city_name: {type: String, default: ""},
    city_nick_name: {type: String, default: ""},
    is_cash_payment_mode: {type: Boolean, default: false},
    is_other_payment_mode: {type: Boolean, default: false},
    is_promo_apply: {type: Boolean, default: false},
    admin_profit_mode_on_delivery: {type: Number, default: 1},
    admin_profit_value_on_delivery: {type: Number, default: 0},

    city_locations: {type: Array, index1: '3d', default: []},
    is_use_radius: {type: Boolean, default: true},
    zone_business: {type: Boolean, default: false},

    is_ads_visible: {type: Boolean, default: true},
    is_business: {type: Boolean, default: false},
    payment_gateway: [{type: schema.Types.ObjectId}],
    city_radius: {type: Number, default: 0},
    deliveries_in_city: [{type: schema.Types.ObjectId}],
    timezone: {type: String, default: ""},
    city_lat_long: [{
            type: Number,
            index: '2d'
        }],

    is_check_provider_wallet_amount_for_received_cash_request: {type: Boolean, default: false},
    provider_min_wallet_amount_for_received_cash_request: {type: Number, default: 0},

    is_provider_earning_add_in_wallet_on_cash_payment: {type: Boolean, default: true},
    is_store_earning_add_in_wallet_on_cash_payment: {type: Boolean, default: true},
    is_provider_earning_add_in_wallet_on_other_payment: {type: Boolean, default: false},
    is_store_earning_add_in_wallet_on_other_payment: {type: Boolean, default: false},

    //call back if not accept order param (min)
    if_not_accepted_call_back_in: {type: Number, default: 0},
    // set request for pre-order (min)
    pre_order_set_request_time: {type: Number, default: 15},

    daily_cron_date: {
        type: Date,
        default: null
    },
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

city.index({country_id: 1, city_name: 1, city_code: 1}, {background: true});
city.index({country_id: 1, is_business: 1}, {background: true});

city.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'city_counter' });
module.exports = mongoose.model('city', city);
