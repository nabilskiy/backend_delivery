var mongoose = require('mongoose');

var schema = mongoose.Schema;

var not_accepted_order = new schema({
    store_id: { type: schema.Types.ObjectId },
    call_id: { type: String, default: "" },
    call_success: { type: Boolean, default: false }
});

module.exports = mongoose.model('not_accepted_order', not_accepted_order);
