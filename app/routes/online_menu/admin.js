const online_menu_admin = require('../../controllers/online_menu/admin');

module.exports = function (app) {
    app.route('/api/online_menu/admin/get_phone_reader_data').post(online_menu_admin.get_phone_reader_data);
};