require('../utils/error_code');
const mongoose = require('mongoose');
const Order = require('mongoose').model('order');

module.exports = async (req,res) => {
    const {order_id} = req.body;

    if(!order_id){
        return res.status(400).json({
            success: false,
            message: 'Undefined order id',
        });
    }

    try {
        const order = await Order.findById(order_id);

        if(!order){
            return res.status(500).json({
               success: false,
               message: 'Order not found!'
            });
        }

        await order.remove();

        res.status(200).json({
           success: true,
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            error_code: ERROR_CODE.SOMETHING_WENT_WRONG,
        })
    }
}