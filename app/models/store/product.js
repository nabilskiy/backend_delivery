var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
require('../../utils/constants');

var product = new schema({
    unique_id: Number,
    name: { type: String, default: "" },
    is_visible_in_store: { type: Boolean, default: false },
    store_id: { type: schema.Types.ObjectId },
    super_product_id: { type: schema.Types.ObjectId, default: null },
    unique_id_for_store_data: { type: Number, default: 0 },
    sequence_number: { type: Number, default: 0 },

    product_schedule: { type: Array, default: [] },

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

product.index({ franchise_product_id: 1 }, { background: true });
product.index({ store_id: 1 }, { background: true });

product.plugin(AutoIncrement, { inc_field: 'unique_id', id: 'product_counter' });
module.exports = mongoose.model('product', product);
