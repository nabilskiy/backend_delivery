var mongoose = require('mongoose');
var schema = mongoose.Schema;

var menu_phone_reader = new schema({
    phone: {type: String}
});

module.exports = mongoose.model('menu_phone_reader', menu_phone_reader);