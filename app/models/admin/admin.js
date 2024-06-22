var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var admin = new schema({
    unique_id: Number,
    username: {type: String, default: ""},
    password: {type: String, default: ""},
    server_token:{type: String, default: ""},
    email: {type: String, default: ""},
    urls: [{type: String, default: ""}],
    admin_type:Number,
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

admin.index({email: 1, admin_type: 1}, {background: true});
admin.index({username: 1, password: 1}, {background: true});
admin.index({email: 1, password: 1}, {background: true});

admin.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'admin_counter' });

module.exports = mongoose.model('admin', admin);