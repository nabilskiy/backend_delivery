var mongoose = require('mongoose');
var schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var provider_analytic_daily = new schema({
    unique_id: Number,
    provider_id: {type: schema.Types.ObjectId},
    date_tag: {type: String, default: ""},
    received: {type: Number, default: 0},
    accepted: {type: Number, default: 0},
    rejected: {type: Number, default: 0},
    not_answered: {type: Number, default: 0},
    cancelled: {type: Number, default: 0},
    completed: {type: Number, default: 0},
    acception_ratio: {type: Number, default: 0},
    rejection_ratio: {type: Number, default: 0},
    cancellation_ratio: {type: Number, default: 0},
    completed_ratio: {type: Number, default: 0},
    total_online_time: {type: Number, default: 0},
    total_active_job_time: {type: Number, default: 0},
    online_times: {type: Array, default: []},
    active_job_times: {type: Array, default: []},    
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

provider_analytic_daily.index({provider_id: 1, date_tag: 1}, {background: true});

provider_analytic_daily.plugin(AutoIncrement, { inc_field: 'unique_id' ,id: 'p_a_d_counter'});
module.exports = mongoose.model('provider_analytic_daily', provider_analytic_daily);