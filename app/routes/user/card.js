var card = require('../../controllers/user/card'); // include card controller ////


module.exports = function (app) {
    app.route('/api/user/add_card').post(card.add_card);
    app.route('/api/user/get_card_list').post(card.get_card_list);
    app.route('/api/user/delete_card').post(card.delete_card);
    app.route('/api/user/select_card').post(card.select_card);


    app.route('/api/user/addcard').post(card.addcard);



    app.route('/api/user/get_stripe_add_card_intent').post(card.get_stripe_add_card_intent);
    
};





