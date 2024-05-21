require('../utils/constants');
var Order = require('mongoose').model('order');
var City = require('mongoose').model('city');
var Not_acceptted_order = require('mongoose').model('not_accepted_order');


module.exports = async () => {
    const newOrders = await Order.find({ order_status: ORDER_STATE.WAITING_FOR_ACCEPT_STORE });

    if (newOrders.length > 0) {
        for(let order of newOrders) {
            const city = await City.findById(order.city_id);

            if (city.if_not_accepted_call_back_in === 0) {
                continue;
            }

            const callBackTime = minutesToMilliseconds(city.if_not_accepted_call_back_in);
            const orderCreatedAt = Date.parse(order.created_at);

            if ((Date.now() - orderCreatedAt) > callBackTime) {
                const notAcceptedOrder = await Not_acceptted_order.findOne({store_id: order.store_id, call_success: false});

                if (!notAcceptedOrder) {
                    const newNotAcceptedOrder = new Not_acceptted_order({
                        store_id: order.store_id,
                    });

                    await newNotAcceptedOrder.save();
                } else {
                    console.log('/Order already in array/')
                }
            }
        }
    }
};

const minutesToMilliseconds = (min) => min * 60000;

