require('../../utils/error_code');
const PushMarketingMessage = require('mongoose').model('push_marketing_messages');

module.exports = async (req, res) => {
    try {
        const messages = await PushMarketingMessage.find();

        res.status(200).json({
            success: true,
            messages
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error_code: ERROR_CODE.SOMETHING_WENT_WRONG
        });
    }
};
