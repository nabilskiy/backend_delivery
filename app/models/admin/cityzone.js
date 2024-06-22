var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var cityzone = new schema({
    city_id: { type: schema.Types.ObjectId },
    unique_id: Number,
    title:String,
    color: String,
    index: Number,
    kmlzone:{
        type: Array,
        index1: '3d'
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

cityzone.index({city_id: 1, title: 1}, {background: true});

cityzone.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'city_zone_counter' });
module.exports = mongoose.model('cityzone', cityzone);