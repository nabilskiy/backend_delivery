require('../../utils/error_code');
require('../../utils/constants');
const User = require('mongoose').model('user');
const Setting = require('mongoose').model('setting');
const PushMarketingMessage = require('mongoose').model('push_marketing_messages');
const Cart = require('mongoose').model('cart');
const utils = require('../../utils/utils');

module.exports = async (req, res) => {
    try {
        const { push_marketing_schedule_timeout } = await Setting.findOne({});
        const dateDifference = new Date(Date.now() - (push_marketing_schedule_timeout * 60000));

        const aggregateCondition = [
            { $match: { cart_id: { $ne: null} } }, //where cart_id !== null
            { $lookup: { from: 'carts', localField: 'cart_id', foreignField: "_id", as: 'user_cart' } },
            //where total_price !== 0 / not empty cart
            // and created_at less then (Date.now - admin push_marketing_schedule_timeout)
            { $match: {
                device_type: { $ne: "" },
                'user_cart.total_cart_price': { $ne: 0 },
                'user_cart.created_at': { $lte: dateDifference },
                'user_cart.push_marketing_message_sent': { $ne: true }
            }}
        ];

        const usersWithNotEmptyCart = await User.aggregate(aggregateCondition);
        const messages = await PushMarketingMessage.find();

        if (!messages || !messages.length) {
            return res.status(404).json({
                success: false,
                error_message: 'No messages to send!'
            })

        }

        for (let i = 0; i < usersWithNotEmptyCart.length; i++) {
            // get random message from pushMarketingMessages model
            const min = 0;
            const max = messages.length;
            const randomIndex = Math.floor(Math.random() * (max - min)) + min;

            utils.sendPushNotification(
                ADMIN_DATA_ID.USER,
                usersWithNotEmptyCart[i].device_type,
                usersWithNotEmptyCart[i].device_token,
                messages[randomIndex].message,
                PUSH_NOTIFICATION_SOUND_FILE.PUSH_NOTIFICATION_SOUND_FILE_IN_IOS
            );

            const cart = await Cart.findById(usersWithNotEmptyCart[i].cart_id);

            if (cart) {
                cart.push_marketing_message_sent = true;
                await cart.save();
            }
        }

        res.status(200).json({
            success: true,
            users: usersWithNotEmptyCart
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error_code: ERROR_CODE.SOMETHING_WENT_WRONG
        });
    }
};
