var https = require('https');
var Not_acceptted_order = require('mongoose').model('not_accepted_order');
var Store = require('mongoose').model('store');

module.exports = async () => {
    const notAcceptedOrders = await Not_acceptted_order.find({ call_success: false });
    // console.log(notAcceptedOrders)

    for(let order of notAcceptedOrders) {
        const store = await Store.findById(order.store_id);
        const phone = `0${store.phone}`;
        await requestToBinotel(phone, order._id);
    }

}

async function requestToBinotel(phone, orderId) {
   

    const postData = JSON.stringify({
        "voiceFileID": "225838",
        "externalNumber": phone,
        "key":"b322b2-1e2c744",
        "secret":""
    });

    const options = {
        'method': 'POST',
        'hostname': 'api.binotel.com',
        'path': '/api/4.0/calls/call-with-announcement.json',
        'headers': {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    const req = https.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", async function (chunk) {
            const body = Buffer.concat(chunks);
            const resData = JSON.parse(body.toString());

            if(resData.status === "success") {
                console.log('rewrite order');
                const order = await Not_acceptted_order.findById(orderId);
                order.call_success = true;
                order.call_id = resData.generalCallID;
                await order.save();
            }
          
        });

        res.on("error", function (error) {
            console.error('Error: ', error);
        });
    });

    req.write(postData);

    req.end();
}

