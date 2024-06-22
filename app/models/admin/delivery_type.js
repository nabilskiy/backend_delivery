var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var delivery_type = new schema({
    name: {type: String, default: ""},
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


 
delivery_type.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'd_t_counter' });
module.exports = mongoose.model('delivery_type', delivery_type);