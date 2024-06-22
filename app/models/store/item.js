var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var item = new schema({
    unique_id: Number,
    store_id: {type: schema.Types.ObjectId},
    product_id: {type: schema.Types.ObjectId},
    super_item_id: {type: schema.Types.ObjectId, default: null},
    details: {type: String, default: ""},
    name: {type: String, default: ""},
    price: {type: Number, default: 0},
    offer_message_or_percentage: {type: String, default: ""},
    item_price_without_offer: {type: Number, default: 0},
    total_quantity: {type: Number, default: 0},
    in_cart_quantity: {type: Boolean, default: false},
    total_added_quantity: {type: Number, default: 0},
    total_used_quantity: {type: Number, default: 0},
    sequence_number: {type: Number, default: 0},
    note_for_item:{type: String, default: ""},
    unique_id_for_store_data: {type: Number, default: 0},
    is_item_in_stock: {type: Boolean, default: true},
    is_most_popular: {type: Boolean, default: false},
    is_visible_in_store: {type: Boolean, default: true},
    is_on_delivery: {type: Boolean, default: true},

    tax: {type: Number, default: 0},
    specifications_unique_id_count: {type: Number, default: 0},
    specifications: {type: Array, default: []},
    item_type: { type: Number, default: 1 }, //from constants - ITEM_TYPES
    image_url: {type: Array, default: []},

    item_schedule: {type: Array, default: []},

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

item.index({store_id: 1, product_id: 1, name: 1}, {background: true});
item.index({store_id: 1, product_id: 1, _id: 1}, {background: true});
item.index({sequence_number: 1}, {background: true});
item.index({name: 1}, {background: true});
item.index({user_id: 1, is_user_show_invoice: 1, order_status: 1}, {background: true});

item.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'item_counter' });
module.exports = mongoose.model('item', item);
