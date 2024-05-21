require('../utils/constants');
const schedule = require('node-schedule');

const Setting = require('mongoose').model('setting');
const Request = require('mongoose').model('request');
const Order = require('mongoose').model('order');
const City = require('mongoose').model('city');

//import controllers
const check_if_order_not_accepted = require('../admin_controllers/check_if_order_not_accepted');
const call_to_store = require('../admin_controllers/call_to_store');
const push_marketing_controller = require('../admin_controllers/push_marketing');
const requestMethods = require('../controllers/store/request');

//running a task every minute
schedule.scheduleJob('* * * * *', function(){
    // =====================================================
    // adding order to NotAccepted Table if store not accept
    // order in time
    // =====================================================
    check_if_order_not_accepted();
});

setTimeout(() => {
    schedule.scheduleJob('* * * * *', function(){
        // =====================================================
        // if store don't accept order call to store admin
        // =====================================================
        call_to_store();
    });
}, 15000);

schedule.scheduleJob('* * * * *', async () => {
    // =====================================================
    // create provider request every minute for ready orders
    // =====================================================

    // ORDER_STATUS.ORDER_READY == 7 - order ready // not found (indusu yebanu)
    // ORDER_STATUS. *?* == 5 - order in process
    const aggregateCondition = [
        {$match: {order_status: {$in: [5, 7]}}},
        {$lookup: {from: "requests", localField: "request_id", foreignField: "_id", as: "requestData"}}
    ];

//  shell aggregate
// db.orders.aggregate([{$match: {order_status: 7}},{$lookup: {from: "requests", localField: "request_id", foreignField: "_id", as: "requestData"}}]).pretty();
    const notAcceptedRequests = await Order.aggregate(aggregateCondition);
    console.log(' request worker ========================================>');

    for (let order of notAcceptedRequests) {
    // don't reed constants -> just HARDCODE!)
    // ORDER_STATE.WAITING_FOR_DELIVERY_MAN = 9 || NO_DELIVERY_MAN_FOUND = 109 ||
    // DELIVERY_MAN_REJECTED: 111 || DELIVERY_MAN_CANCELLED: 112
        if (order.requestData.length &&
            (
                order.requestData[0].delivery_status === 109 ||
                order.requestData[0].delivery_status === 9 ||
                order.requestData[0].delivery_status === 111 ||
                order.requestData[0].delivery_status === 112
            )
        ) {
            if(order.order_status === 5) {
                const city = await City.findById(order.city_id);
                console.log('Estimate for request -> with status == 5')

                const send_order_estimate_time_diff = (Date.parse(order.estimated_time_for_ready_order) - Date.now()) / 60000;

                if(send_order_estimate_time_diff > city.pre_order_set_request_time){
                    continue;
                }
            }

            console.log('Start looking for provider (worker) =>')
            const requestObj = await Request.findById(order.requestData[0]._id)
            requestMethods.findNearestProvider(requestObj, false);
        }
    }
});

schedule.scheduleJob('* * * * *', async function() {
    // =====================================================
    // Push marketing cron
    // =====================================================
    const setting = await Setting.findOne({});

    if (setting.push_marketing_enable && setting.push_marketing_schedule_timeout !== 0) {
        await push_marketing_controller.send_message({}, {});
    }
});

schedule.scheduleJob('* * * * *', async function() {
    // =====================================================
    // Collaboration with taxi cron (change status from delivery_man_coming to DELIVERY_MAN_STARTED_DELIVERY
    // =====================================================
    const difference = 12 * 60000;  // working diff (12min)
    // const difference = 2 * 60000;  //test diff (2 min)

    const dateNow = Date.now();
    const requestsDeliveryManComing = await Request.find({ delivery_status: ORDER_STATE.DELIVERY_MAN_COMING });

    const res = {
        json: (obj) => console.log(obj),
    }

    for(let request of requestsDeliveryManComing) {
        const {date: statusDate} = request.date_time.filter(datetime => datetime.status === ORDER_STATE.DELIVERY_MAN_COMING)[0];
        const date = Date.parse(statusDate);

        if (dateNow - date > difference) {
            const body = {
                request_id: request._id,
                new_delivery_status: ORDER_STATE.DELIVERY_MAN_STARTED_DELIVERY
            };

            await requestMethods.started_for_delivery_manual({ body }, res);
        }
    }
});


schedule.scheduleJob('* * * * *', async function() {
    // =====================================================
    // Collaboration with taxi cron (close orders)
    // =====================================================
    const difference = 15 * 60000;  // working diff (15min)
    // const difference = 5 * 60000;  //test diff

    const dateNow = Date.now();
    const requestsInDelivery = await Request.find({ delivery_status: ORDER_STATE.DELIVERY_MAN_STARTED_DELIVERY });

    const res = {
        json: (obj) => console.log(obj),
    }

    for (let request of requestsInDelivery) {
        const {date: statusDate} = request.date_time.filter(datetime => datetime.status === ORDER_STATE.DELIVERY_MAN_STARTED_DELIVERY)[0];
        const date = Date.parse(statusDate);

        if (dateNow - date > difference) {
            // provider_id = "602cdfa1ba9eea4c5b55f913";    //for dev server
            // provider_id = "60286c05428293230be8c7e6";    //for production server
            const body = {
                type: 1,
                request_id: `${request._id}`,
                provider_id: request.provider_id ? `${request.provider_id}` : "60286c05428293230be8c7e6",
                city_id: `${request.city_id}`,
                order_id: `${request.orders[0].order_id}`
            };

            await requestMethods.complete_request({ body }, res);
        }
    }
});
