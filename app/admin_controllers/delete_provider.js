require('../utils/error_code');
const mongoose = require('mongoose');
const Provider = require('mongoose').model('provider');

module.exports = async (req, res) => {
    const { provider_id } = req.body;

    if (!provider_id) {
        return res.status(400).json({
            success: false,
            error_code: ERROR_CODE.REQUIRED_PARAMS_NOT_FOUND
        });
    }

    try {
        const provider = await Provider.findById(provider_id);

        if (!provider) {
            return res.status(400).json({
               success: false,
               error_message: "undefined provider"
            });
        }

        await provider.remove();

        res.status(200).json({
            success: true,
            message: "Successfully deleted!"
        });
    } catch (e) {
        res.status(500).json({
           success: false,
           error_code: ERROR_CODE.SOMETHING_WENT_WRONG
        });
    }
}
