require('../../utils/message_code');
require('../../utils/error_code');
require('../../utils/constants');
var User = require('mongoose').model('user');
var Store = require('mongoose').model('store');
var Provider = require('mongoose').model('provider');
var Card = require('mongoose').model('card');
var Payment_gateway = require('mongoose').model('payment_gateway');
var utils = require('../../utils/utils');
var console = require('../../utils/console');


exports.get_stripe_add_card_intent = async function (request_data, response_data) {
    console.log("get_stripe_add_card_intent");
    Payment_gateway.findOne({unique_id : 1}).then((payment_gateway) => {
        var stripe_key = payment_gateway.payment_key;
        console.log(stripe_key);
        var stripe = require("stripe")(stripe_key);
        stripe.setupIntents.create({
            usage: 'on_session'
        }, function(error, paymentIntent){
            console.log("paymentIntent");
            console.log(paymentIntent)
            response_data.json({success: true, client_secret: paymentIntent.client_secret})
        });
    });
}

var crypto  = require('crypto');

var keyBase64 = "DWIzFkO22qfVMgx2fIsxOXnwz10pRuZfFJBvf4RS3eY=";
var ivBase64 = 'AcynMwikMkW4c7+mHtwtfw==';

function getAlgorithm(keyBase64) {
    var key = Buffer.from(keyBase64, 'base64');
    switch (key.length) {
        case 16:
            return 'aes-128-cbc';
        case 32:
            return 'aes-256-cbc';

    }
    throw new Error('Invalid key length: ' + key.length);
}

function encrypt(plainText, keyBase64, ivBase64) {
    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const cipher = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'base64')
    encrypted += cipher.final('base64');
    return encrypted;
};

function decrypt (messagebase64, keyBase64, ivBase64) {
    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const decipher = crypto.createDecipheriv(getAlgorithm(keyBase64), key, iv);
    let decrypted = decipher.update(messagebase64, 'base64');
    decrypted += decipher.final();
    return decrypted;
}

exports.add_card = function (request_data, response_data) {
    console.log("add_card")

    utils.check_request_params(request_data.body, [ {name: 'payment_method', type: 'string'} ], function (response) {
        if (response.success) {
            var request_data_body = request_data.body;
            var type = Number(request_data_body.type); // 7 = User , 8 = Provider , 2 = Store
            var Table;
            switch (type) {
                case ADMIN_DATA_ID.USER:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
                case ADMIN_DATA_ID.PROVIDER:
                    type = ADMIN_DATA_ID.PROVIDER;
                    Table = Provider;
                    break;
                case ADMIN_DATA_ID.STORE:
                    type = ADMIN_DATA_ID.STORE;
                    Table = Store;
                    break;
                default:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
            }

            Table.findOne({_id: request_data_body.user_id}).then((detail) => {
                if (detail) {
                    if (request_data_body.server_token !== null && detail.server_token !== request_data_body.server_token){
                        response_data.json({success: false, error_code: ERROR_CODE.INVALID_SERVER_TOKEN});
                    } else{
                        Payment_gateway.findOne({unique_id : 1}).then((payment_gateway) => {

                            var stripe_key = payment_gateway.payment_key;
                            var stripe = require("stripe")(stripe_key);

                            if(request_data_body.type == 2){
                                var name = detail.name
                            }else{
                                var name = detail.first_name + " " + detail.last_name;
                            } 

                            // if(!detail.customer_id){
                                stripe.customers.create({
                                    // description: email,
                                    // source: payment_token // obtained with Stripe.js
                                    payment_method: request_data_body.payment_method,
                                    invoice_settings: { default_payment_method: request_data_body.payment_method },
                                    email: detail.email,
                                    name: name,
                                    phone: detail.phone
                                }, function (error, customer) {
                                    if (!customer) {
                                        response_data.json({success: false, error_code: CARD_ERROR_CODE.INVALID_PAYMENT_TOKEN});
                                    } else {

                                        detail.customer_id = customer.id;
                                        detail.save();

                                        stripe.paymentMethods.retrieve(
                                            request_data_body.payment_method,
                                        (err, paymentMethod)=> {
                                            Card.find({user_id: request_data_body.user_id,user_type:type}).then((card_data) => {
                                            
                                                var card = new Card({
                                                    card_expiry_date: request_data_body.card_expiry_date,
                                                    card_holder_name: request_data_body.card_holder_name,
                                                    payment_id: payment_gateway._id,
                                                    user_type: type,
                                                    user_id: request_data_body.user_id,
                                                    last_four: request_data_body.last_four,
                                                    card_type: request_data_body.card_type,
                                                    payment_method: request_data_body.payment_method,
                                                    customer_id: detail.customer_id
                                                })
            
                                                if (card_data.length > 0) {
                                                    card.is_default = false;
                                                } else {
                                                    card.is_default = true;
                                                }
            
                                                card.save().then(() => {
                                                        response_data.json({
                                                            success: true,
                                                            message: CARD_MESSAGE_CODE.CARD_ADD_SUCCESSFULLY,
                                                            card: card
            
                                                        });
                                                }, (error) => {
                                                    console.log(error)
                                                    response_data.json({
                                                        success: false,
                                                        error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                                                    });
                                                });
                                            }, (error) => {
                                                console.log(error)
                                                response_data.json({
                                                    success: false,
                                                    error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                                                });
                                            });
                                        });

                                    }
                                })
                            // } else {
                                
                            //     console.log(request_data_body.payment_method)
                            //     console.log(detail.customer_id)
                                
                            //     stripe.paymentMethods.attach(request_data_body.payment_method,{
                            //         customer: detail.customer_id,
                            //     }, function (err, customer) {
                                    
                            //         console.log(customer)

                            //         detail.customer_id = customer.id;
                            //         detail.save();
                            //     });
                            // }

                            
                            
                        }, (error) => {
                            console.log(error)
                            response_data.json({
                                success: false,
                                error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                            });
                        });
                    }

                } else
                {
                    response_data.json({success: false, error_code: ERROR_CODE.DETAIL_NOT_FOUND});
                }
            }, (error) => {
                console.log(error)
                response_data.json({
                    success: false,
                    error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                });
            });
        } else {
            response_data.json(response);
        }
    });
};
var LiqPay = require('./liqpay');
var wallet_history = require('./wallet');

exports.addcard = function (request_data, response_data) {
    //liqpay
    console.log(" *** addcard liqpay "+JSON.stringify(request_data.body))
    utils.check_request_params(request_data.body, [  ], function (response) {
        if (response.success) {
            var request_data_body = request_data.body;
            var type = Number(request_data_body.type); // 7 = User , 8 = Provider , 2 = Store
            var Table;
            switch (type) {
                case ADMIN_DATA_ID.USER:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
                case ADMIN_DATA_ID.PROVIDER:
                    type = ADMIN_DATA_ID.PROVIDER;
                    Table = Provider;
                    break;
                case ADMIN_DATA_ID.STORE:
                    type = ADMIN_DATA_ID.STORE;
                    Table = Store;
                    break;
                default:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
            }

            Table.findOne({_id: request_data_body.user_id}).then((detail) => {
                if (detail) {
                    if (request_data_body.server_token !== null && detail.server_token !== request_data_body.server_token){
                        response_data.json({success: false, error_code: ERROR_CODE.INVALID_SERVER_TOKEN});
                    } else{

                        Payment_gateway.findOne({unique_id : 2}).then((payment_gateway) => {
                            Card.find({user_id: request_data_body.user_id,user_type:type}).then((card_data) => {

                                var public_key = payment_gateway.payment_key_id;
                                var private_key = payment_gateway.payment_key;
                            
                                var phone = detail.country_phone_code + detail.phone
    
                                var wallet_currency_code = "UAH"
                                var liqpay = new LiqPay(public_key, private_key);
    
                                var card_no = decrypt(request_data_body.card_no,keyBase64,ivBase64);
                                var cvv = decrypt(request_data_body.cvv,keyBase64,ivBase64);
                                liqpay.api("request", {
                                "action"         : "pay",
                                "version"        : "3",
                                "phone"          : phone,
                                "amount"         : "1",
                                "currency"       : "UAH",
                                "description"    : "add_card",
                                "order_id"       : Date.now(),
                                "card"           : card_no,
                                // "card"           : "4242424242424242",
                                "card_exp_month" : request_data_body.month,
                                "card_exp_year"  : request_data_body.year,
                                "card_cvv"       : cvv,
                                // "card_cvv"       : "111",
                                "recurringbytoken" : "1",
                                // "server_url":"http://35061f7f.ngrok.io/api/user/liqpay_callback"
                            
                                }, function( json ){
                                console.log(json);
                                if(json.result == "ok"){
                                    var total_wallet_amount = 0;
                                    var wallet = 1;
                                    total_wallet_amount = wallet_history.add_wallet_history(type, detail.unique_id, detail._id, detail.country_id, wallet_currency_code, wallet_currency_code,
                                        1, wallet, detail.wallet, WALLET_STATUS_ID.ADD_WALLET_AMOUNT, WALLET_COMMENT_ID.SET_BY_ADMIN, "By Admin");
                                    detail.wallet = total_wallet_amount;
                                    detail.save();
                                    var card = new Card({
                                        // card_expiry_date: request_data_body.card_expiry_date,
                                        // card_holder_name: request_data_body.card_holder_name,
                                        payment_id: payment_gateway._id,
                                        user_type: type,
                                        user_id: request_data_body.user_id,
                                        last_four:card_no.substr(card_no.length-4,card_no.length),
                                        card_type: json.sender_card_type,
                                        // payment_method: request_data_body.payment_method,
                                        token: json.card_token,
                                        is_liqpay: true
                                        // customer_id: detail.customer_id
                                    })
        
                                    if (card_data.length > 0) {
                                        card.is_default = false;
                                    } else {
                                        card.is_default = true;
                                    }
        
                                    card.save().then(() => {
                                            response_data.json({
                                                success: true,
                                                message: CARD_MESSAGE_CODE.CARD_ADD_SUCCESSFULLY,
                                                card: card
        
                                            });
                                    }, (error) => {
                                        console.log(error)
                                        response_data.json({
                                            success: false,
                                            error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                                        });
                                    });
        
                                }else{
                                    console.log("ERROR")
                                }
                                
    
                                });
    
                                
    
                                
                            }, (error) => {
                                console.log(error)
                                response_data.json({
                                    success: false,
                                    error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                                });
                            });
                        })
                    }
                } else
                {
                    response_data.json({success: false, error_code: ERROR_CODE.DETAIL_NOT_FOUND});
                }
            }, (error) => {
                console.log(error)
                response_data.json({
                    success: false,
                    error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                });
            });
        } else {
            response_data.json(response);
        }
    });
};


exports.add_card_1 = function (request_data, response_data) {

    utils.check_request_params(request_data.body, [{name: 'payment_id', type: 'string'}, {name: 'payment_token', type: 'string'},
        {name: 'last_four', type: 'string'}], function (response) {
        if (response.success) {
            var request_data_body = request_data.body;
            var type = Number(request_data_body.type); // 7 = User , 8 = Provider , 2 = Store
            var Table;
            switch (type) {
                case ADMIN_DATA_ID.USER:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
                case ADMIN_DATA_ID.PROVIDER:
                    type = ADMIN_DATA_ID.PROVIDER;
                    Table = Provider;
                    break;
                case ADMIN_DATA_ID.STORE:
                    type = ADMIN_DATA_ID.STORE;
                    Table = Store;
                    break;
                default:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
            }

            Table.findOne({_id: request_data_body.user_id}).then((detail) => {
                if (detail) {
                    if (request_data_body.server_token !== null && detail.server_token !== request_data_body.server_token)
                    {
                        response_data.json({success: false, error_code: ERROR_CODE.INVALID_SERVER_TOKEN});
                    } else
                    {
                        Payment_gateway.findOne({unique_id : 1}).then((payment_gateway) => {
                            if (payment_gateway)
                            {
                                var payment_gateway_name = (payment_gateway.name).toLowerCase();
                                // if (payment_gateway_name === 'stripe')
                                // {
                                    var email = detail.email;
                                    var stripe_key = payment_gateway.payment_key;
                                    var stripe = require("stripe")(stripe_key);
                                    var payment_token = request_data_body.payment_token;

                                    stripe.customers.create({
                                        description: email,
                                        source: payment_token // obtained with Stripe.js

                                    }, function (error, customer) {
                                        if (!customer) {
                                            response_data.json({success: false, error_code: CARD_ERROR_CODE.INVALID_PAYMENT_TOKEN});
                                        } else {

                                            Card.find({user_id: request_data_body.user_id,user_type:type}).then((card_data) => {
                                                var customer_id = customer.id;
                                                var card = new Card({
                                                    card_expiry_date: request_data_body.card_expiry_date,
                                                    card_holder_name: request_data_body.card_holder_name,
                                                    payment_id: request_data_body.payment_id,
                                                    user_type:type,
                                                    user_id: request_data_body.user_id,
                                                    last_four: request_data_body.last_four,
                                                    payment_token: request_data_body.payment_token,
                                                    card_type: request_data_body.card_type,
                                                    customer_id: customer_id
                                                })

                                                if (card_data.length > 0) {
                                                    card.is_default = false;
                                                } else {
                                                    card.is_default = true;
                                                }

                                                card.save().then(() => {
                                                        response_data.json({
                                                            success: true,
                                                            message: CARD_MESSAGE_CODE.CARD_ADD_SUCCESSFULLY,
                                                            card: card

                                                        });
                                                }, (error) => {
                                                    console.log(error)
                                                    response_data.json({
                                                        success: false,
                                                        error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                                                    });
                                                });
                                            }, (error) => {
                                                console.log(error)
                                                response_data.json({
                                                    success: false,
                                                    error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                                                });
                                            });
                                        }
                                    });
                                // }
                            }
                        }, (error) => {
                            console.log(error)
                            response_data.json({
                                success: false,
                                error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                            });
                        });
                    }

                } else
                {
                    response_data.json({success: false, error_code: ERROR_CODE.DETAIL_NOT_FOUND});
                }
            }, (error) => {
                console.log(error)
                response_data.json({
                    success: false,
                    error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                });
            });
        } else {
            response_data.json(response);
        }
    });
};

exports.get_card_list = function (request_data, response_data) {

    utils.check_request_params(request_data.body, [], function (response) {
        if (response.success) {
            var request_data_body = request_data.body;
            var type = Number(request_data_body.type); // 7 = User , 8 = Provider , 2 = Store
            var Table;
            switch (type) {
                case ADMIN_DATA_ID.USER:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
                case ADMIN_DATA_ID.PROVIDER:
                    type = ADMIN_DATA_ID.PROVIDER;
                    Table = Provider;
                    break;
                case ADMIN_DATA_ID.STORE:
                    type = ADMIN_DATA_ID.STORE;
                    Table = Store;
                    break;
                default:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
            }

            Table.findOne({_id: request_data_body.user_id}).then((detail) => {
                if (detail) {
                    if (request_data_body.server_token !== null && detail.server_token !== request_data_body.server_token)
                    {
                        response_data.json({success: false, error_code: ERROR_CODE.INVALID_SERVER_TOKEN});
                    } else
                    {

                        Card.find({user_id: request_data_body.user_id,user_type:type}).then((cards) => {
                            if (cards.length == 0) {
                                response_data.json({success: false, error_code: CARD_ERROR_CODE.CARD_DATA_NOT_FOUND});
                            } else {

                                response_data.json({success: true,
                                    message: CARD_MESSAGE_CODE.CARD_LIST_SUCCESSFULLY,
                                    cards: cards
                                });
                            }
                        }, (error) => {
                            console.log(error)
                            response_data.json({
                                success: false,
                                error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                            });
                        });

                    }

                } else
                {
                    response_data.json({success: false, error_code: ERROR_CODE.DETAIL_NOT_FOUND});
                }
            }, (error) => {
                console.log(error)
                response_data.json({
                    success: false,
                    error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                });
            });
        } else {
            response_data.json(response);
        }
    });

};

exports.delete_card = function (request_data, response_data) {

    utils.check_request_params(request_data.body, [{name: 'card_id', type: 'string'}], function (response) {
        if (response.success) {
            var request_data_body = request_data.body;
            var type = Number(request_data_body.type); // 7 = User , 8 = Provider , 2 = Store
            var Table;
            switch (type) {
                case ADMIN_DATA_ID.USER:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
                case ADMIN_DATA_ID.PROVIDER:
                    type = ADMIN_DATA_ID.PROVIDER;
                    Table = Provider;
                    break;
                case ADMIN_DATA_ID.STORE:
                    type = ADMIN_DATA_ID.STORE;
                    Table = Store;
                    break;
                default:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
            }

            Table.findOne({_id: request_data_body.user_id}).then((detail) => {
                if (detail) {
                    if (request_data_body.server_token !== null && detail.server_token !== request_data_body.server_token)
                    {
                        response_data.json({success: false, error_code: ERROR_CODE.INVALID_SERVER_TOKEN});
                    } else
                    {
                        Card.remove({_id: request_data_body.card_id, user_id: request_data_body.user_id,user_type:type}).then(() => {
                            response_data.json({success: true,
                                message: CARD_MESSAGE_CODE.CARD_DELETE_SUCCESSFULLY
                            });
                        }, (error) => {
                            console.log(error)
                            response_data.json({
                                success: false,
                                error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                            });
                        });

                    }

                }else
                {
                    response_data.json({success: false, error_code: ERROR_CODE.DETAIL_NOT_FOUND});
                }
            }, (error) => {
                console.log(error)
                response_data.json({
                    success: false,
                    error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                });
            });
        } else {
            response_data.json(response);
        }
    });
};

exports.select_card = function (request_data, response_data) {

    utils.check_request_params(request_data.body, [{name: 'card_id', type: 'string'}], function (response) {
        if (response.success) {

            var request_data_body = request_data.body;
            var type = Number(request_data_body.type); // 7 = User , 8 = Provider , 2 = Store
            var Table;
            switch (type) {
                case ADMIN_DATA_ID.USER:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
                case ADMIN_DATA_ID.PROVIDER:
                    type = ADMIN_DATA_ID.PROVIDER;
                    Table = Provider;
                    break;
                case ADMIN_DATA_ID.STORE:
                    type = ADMIN_DATA_ID.STORE;
                    Table = Store;
                    break;
                default:
                    type = ADMIN_DATA_ID.USER;
                    Table = User;
                    break;
            }

            Table.findOne({_id: request_data_body.user_id}).then((detail) => {
                if (detail) {
                    if (request_data_body.server_token !== null && detail.server_token !== request_data_body.server_token)
                    {
                        response_data.json({success: false, error_code: ERROR_CODE.INVALID_SERVER_TOKEN});
                    } else
                    {

                        Card.findOneAndUpdate({_id: {$nin: request_data_body.card_id}, user_id: request_data_body.user_id,user_type:type, is_default: true}, {is_default: false}).then((card) => {

                        });
                        Card.findOne({_id: request_data_body.card_id, user_id: request_data_body.user_id,user_type:type}).then((card) => {

                            if (card) {
                                card.is_default = true;
                                card.save().then(() => {
                                    response_data.json({
                                        success: true, message: CARD_MESSAGE_CODE.CARD_SELECTED_SUCCESSFULLY,
                                        card: card
                                    });
                                }, (error) => {
                                    console.log(error)
                                    response_data.json({
                                        success: false,
                                        error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                                    });
                                });

                            } else
                            {
                                response_data.json({success: false, error_code: CARD_ERROR_CODE.CARD_DATA_NOT_FOUND});
                            }
                        }, (error) => {
                            console.log(error)
                            response_data.json({
                                success: false,
                                error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                            });

                        });

                    }

                }else
                {
                    response_data.json({success: false, error_code: ERROR_CODE.DETAIL_NOT_FOUND});
                }
            }, (error) => {
                console.log(error)
                response_data.json({
                    success: false,
                    error_code: ERROR_CODE.SOMETHING_WENT_WRONG
                });
            });
        } else {
            response_data.json(response);
        }
    });

};

