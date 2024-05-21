require('../utils/error_code');
const mongoose = require('mongoose');
const User = require('mongoose').model('user');
const Order = require('mongoose').model('order');

module.exports = async (req, res) => {
    try {
        const users = await User.find();

        const usersInfo = [];

        for(let user of users) {
            const dayInSystem = Math.ceil((new Date() - new Date(user.created_at)) / (24 * 3600000));

            const info = {
                'phone': user.country_phone_code + '' + user.phone,
                'device_type': user.device_type,
                'day_in_system': dayInSystem,
                'last_order_created_at': ''
            };

            const orders = await Order.find({ user_id: user._id }).sort({ created_at: -1 });

            if(orders.length) {
                const lastOrderDate = new Date(orders.shift().created_at);

                let day = lastOrderDate.getDate();
                day = day < 10 ? `0${day}` : day;

                let month = lastOrderDate.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;

                info['last_order_created_at'] = `${day}-${month}-${lastOrderDate.getFullYear()}`;
            }

            usersInfo.push(info);
        }

        res.status(200).json({
            success: true,
            users: usersInfo
        });
    } catch (e) {
        res.status(500).json({
           success: false,
           error_code: ERROR_CODE.SOMETHING_WENT_WRONG
        });
    }
};
