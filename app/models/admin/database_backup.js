var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var database_backup = new schema({
    unique_id: Number,
    start_date: { type: Date },
    end_date: { type: Date },
    is_deleted_from_db: { type: Boolean, default: false },
    file_name: {type: String, default: ''},
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

database_backup.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'd_b_counter' });
module.exports = mongoose.model('database_backup', database_backup);