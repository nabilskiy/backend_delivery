require('../utils/error_code');
const mongoose = require('mongoose');
const Store = require('mongoose').model('store');

module.exports = async (req, res) => {
    const { store_id } = req.body;

    if (!store_id) {
        return res.status(400).json({
            success: false,
            error_code: ERROR_CODE.REQUIRED_PARAMS_NOT_FOUND
        });
    }

    try {
        const store = await Store.findById(store_id);

        if (!store) {
            return res.status(400).json({
                success: false,
                error_message: "undefined store"
            });
        }

        await store.remove();

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
