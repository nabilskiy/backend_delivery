var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var document = new schema({
    unique_id: Number,
    document_name: {type: String, default: ""},
    country_id: {type: schema.Types.ObjectId},
    document_for: {type: Number, default: 8},
    is_unique_code: {type: Boolean, default: false},
    is_expired_date: {type: Boolean, default: false},
    is_mandatory: {type: Boolean, default: false},
    is_show: {type: Boolean, default: false},
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

document.index({country_id: 1, document_for: 1}, {background: true});
document.index({is_show: 1}, {background: true});
document.index({is_mandatory: 1}, {background: true});

document.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'document_counter' });
module.exports = mongoose.model('document', document);


