var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var provider_vehicle = new schema({
    unique_id: Number,
    country_id:{type: schema.Types.ObjectId},
    // vehicle_id: {type: schema.Types.ObjectId},
    service_id: {type: schema.Types.ObjectId},
    admin_service_id: {type: schema.Types.ObjectId},
    admin_vehicle_id: {type: schema.Types.ObjectId},
    provider_id: {type: schema.Types.ObjectId},
    provider_unique_id: Number,
    vehicle_year: Number,
    vehicle_model: {type: String, default: ""},
    vehicle_name: {type: String, default: ""},
    vehicle_plate_no: {type: String, default: ""},
    vehicle_color: {type: String, default: ""},
    is_approved: {type: Boolean, default: false},
    is_document_uploaded: {type: Boolean, default: false},
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

provider_vehicle.index({country_id: 1}, {background: true});
provider_vehicle.index({_id: 1, provider_id: 1}, {background: true});

provider_vehicle.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'provider_vehicle_counter' });
module.exports = mongoose.model('provider_vehicle', provider_vehicle);