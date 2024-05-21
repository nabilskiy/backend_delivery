require('../utils/error_code');
const mongoose = require('mongoose');
const Request = require('mongoose').model('request');

module.exports = async (req, res) => {
    const {request_id} = req.body;

    if(!request_id) {
        return res.status(400).json({
            success: false,
            message: 'undefined property',
        });
    }

    try {
        const request = await Request.findById(request_id);

        if (!request) {
            return res.status(500).json({
                success: false,
                message: 'Obj not found!'
            });
        }

        await request.remove();

        res.status(200).json({
           success: true
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error_code: ERROR_CODE.SOMETHING_WENT_WRONG
        });
    }
}