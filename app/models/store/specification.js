var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var specification = new schema({
    unique_id: Number,
    super_specification_id: {type: schema.Types.ObjectId, default: null},
    store_id: {type: schema.Types.ObjectId},
    name: {type: String, default: ""},
    price: {type: Number, default: 0},
    is_default_selected: {type: Boolean, default: false},
    is_user_selected: {type: Boolean, default: false},
    specification_group_id: {type: schema.Types.ObjectId},
    unique_id_for_store_data: {type: Number, default: 0},
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

specification.index({product_id: 1, specification_group_id: 1}, {background: true});
specification.index({specification_group_id: 1}, {background: true});


specification.plugin(AutoIncrement, { inc_field: 'unique_id' ,id: 'specification_counter' });

module.exports = mongoose.model('specification', specification);