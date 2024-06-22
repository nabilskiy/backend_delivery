const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const pushMarketingMessagesSchema = new schema({
    unique_id: { type: Number },
    message: { type: String, default: "" },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

pushMarketingMessagesSchema.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'p_m_m_counter' });
module.exports = mongoose.model('push_marketing_messages', pushMarketingMessagesSchema);
