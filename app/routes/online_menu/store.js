const online_menu_store = require('../../controllers/online_menu/store');

module.exports = function (app) {
    app.route('/api/online_menu/store/get_menu').post(online_menu_store.get_menu);
};
