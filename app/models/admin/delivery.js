var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var delivery = new schema({
    unique_id: Number,
    delivery_name: { type: String, default: "" },
    description: { type: String, default: "" },
    image_url: { type: String, default: "" },
    icon_url: { type: String, default: "" },
    map_pin_url: { type: String, default: "" },
    delivery_type_id: { type: schema.Types.ObjectId },
    delivery_type: { type: Number, default: 1 },
    is_business: { type: Boolean, default: false },
    sequence_number: { type: Number, default: 0 },
    famous_products_tags: [{ type: String, default: [] }],
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

delivery.index({ is_business: 1 }, { background: true });
delivery.index({ sequence_number: 1 }, { background: true });

delivery.plugin(AutoIncrement, { inc_field: 'unique_id', id: 'delivery_counter' });
module.exports = mongoose.model('delivery', delivery);