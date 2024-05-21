require('../../../utils/error_code');
require('../../../utils/constants');
const mongoose = require('mongoose');
const Menu_phone_reader = require('mongoose').model('menu_phone_reader');

module.exports = async (req, res) => {
    try {
        const phones = await Menu_phone_reader.find({});

        res.status(200).json({
            success: true,
            phones
        });
    } catch (e) {
        res.status(500).json({
           success: false,
           error_code: ERROR_CODE.SOMETHING_WENT_WRONG
        });
    }
}