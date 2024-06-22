var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var zonevalue = new schema({
    city_id: { type: schema.Types.ObjectId },
    unique_id: Number,
    from_zone_id: { type: schema.Types.ObjectId },
    to_zone_id: { type: schema.Types.ObjectId },
    price: {type: Number, default: 0},
    delivery_type: {type: Number, default: 1},
    vehicle_id: {type: schema.Types.ObjectId},
    delivery_type_id: {type: schema.Types.ObjectId},
    type_id: {type: schema.Types.ObjectId, default: null},
    admin_type: {type: Number, default: ADMIN_DATA_ID.ADMIN},
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

zonevalue.index({from_zone_id: 1, to_zone_id: 1}, {background: true});
zonevalue.index({city_id: 1, vehicle_id: 1, delivery_type_id: 1, type_id: 1}, {background: true});

zonevalue.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'zonevalue_counter' });
module.exports = mongoose.model('zonevalue', zonevalue);