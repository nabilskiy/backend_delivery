const mongoose = require('mongoose');
const schema = mongoose.Schema;
const autoIncrement = require('mongoose-id-autoincrement');

const pushMarketingMessagesSchema = new schema({
    unique_id: { type: Number },
    message: { type: String, default: "" },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

pushMarketingMessagesSchema.plugin(autoIncrement.plugin, {model: 'push_marketing_messages', field: 'unique_id', startAt: 1, incrementBy: 1});
module.exports = mongoose.model('push_marketing_messages', pushMarketingMessagesSchema);
