var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var payment_gateway_transaction = new Schema({
    
    unique_id: Number,
    user_type: Number,

    user_id: {type: Schema.Types.ObjectId},
    order_payment_id: {type: Schema.Types.ObjectId},

    request_type: {type: Number, default: 0},
    transaction_id: {type: String, default: ""},
    payment_id: {type: String, default: ""},

    data: {type: String, default: ""},
    signature: {type: String, default: ""},


    
    transaction_status: {type: Number , default: 0},
    is_transaction_completed: {type: Number , default: 0},


    amount: {type: Number , default: 0},

    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

}, {
    strict: true,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }

});


payment_gateway_transaction.plugin(AutoIncrement, { inc_field: 'unique_id',id: 'p_g_t_counter' });
module.exports = mongoose.model('payment_gateway_transaction', payment_gateway_transaction);

// unique_id: Number,
// user_type: User type User/Provider,

// user_id: Id or user,
// request_type: type of the request (100-wallet payment,101- order payment ),
// order_id: generated unique id,

// transaction_url: 3D secure URL,
// transaction_date: Date string from 3D secure response,
// transaction_status: transaction response recieved or not,
// transaction_id: Transaction id from 3D secure response,
