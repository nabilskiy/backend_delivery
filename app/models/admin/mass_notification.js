var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var mass_notification = new schema({
    unique_id: Number,
    message: {type: String, default: ''},
    user_type: Number,
    device_type: {type: String},
    country: {type: schema.Types.ObjectId},
    delivery:{type: schema.Types.ObjectId},
    city:{type: schema.Types.ObjectId},
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


mass_notification.plugin(AutoIncrement, { inc_field: 'unique_id' ,id: 'm_n_counter'});
module.exports = mongoose.model('mass_notification', mass_notification);
