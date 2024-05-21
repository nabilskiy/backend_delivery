var requests = require('../../controllers/store/request'); // include request controller ////


module.exports = function (app) {
    app.route('/api/store/create_request').post(requests.create_request);
    app.route('/api/provider/change_request_status').post(requests.change_request_status);

    app.route('/api/provider/complete_request').post(requests.complete_request);
    app.route('/api/provider/show_request_invoice').post(requests.show_request_invoice);
    app.route('/api/provider/provider_cancel_or_reject_request').post(requests.provider_cancel_or_reject_request);

    app.route('/api/provider/get_invoice').post(requests.provider_get_invoice);
    app.route('/api/store/get_vehicle_list').post(requests.get_vehicle_list);
    app.route('/api/store/get_vehicles_list').post(requests.get_vehicles_list);

    //For delivery update (collaboration with taxi service)
    // copy of coming_for_pickup method for manual change status without all params
    app.route('/api/store/set_coming_for_pickup_status').post(requests.coming_for_pickup_manual);

    // copy of started_for_delivery method for manual change status without all params
    app.route('/api/store/set_started_for_delivery_status').post(requests.started_for_delivery_manual);

};





