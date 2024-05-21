require('../../utils/error_code');
const PushMarketingMessage = require('mongoose').model('push_marketing_messages');

module.exports = async (req, res) => {
    const { message_id } = req.body;

    try {
        const message = await PushMarketingMessage.findById(message_id);
        await message.remove();

        res.status(200).json({
            success: true,
            message
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error_code: ERROR_CODE.SOMETHING_WENT_WRONG
        });
    }
};
