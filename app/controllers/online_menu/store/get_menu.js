require('../../../utils/error_code');
require('../../../utils/constants');
const mongoose = require('mongoose');
const Product = require('mongoose').model('product');
const Item = require('mongoose').model('item');
const Store = require('mongoose').model('store');
const Country = require('mongoose').model('country');
const City = require('mongoose').model('city');
const Delivery = require('mongoose').model('delivery');
const Promo_code = require('mongoose').model('promo_code');
const Advertise = require('mongoose').model('advertise');

module.exports = async (req, res) => {
    const { store_id } = req.body;

    if (!store_id) {
        return res.status(404).json({ message: 'Undefined store!' });
    }

    const server_time = new Date();
    const condition = {"$match": {'store_id': {$eq: mongoose.Types.ObjectId(store_id)}}};
    const condition1 = {"$match": {'is_visible_in_store': {$eq: true}}};

    try {
        const store = await Store.findOne({ _id: store_id});

        if (!store) {
            return res.status(404).json({ message: 'Undefined store!' });
        }

        const country_data = await Country.findOne({_id: store.country_id});
        const city_data = await City.findOne({_id: store.city_id});
        const delivery_data = await Delivery.findOne({_id: store.store_delivery_id});

        const currency = country_data.currency_sign;
        const maximum_phone_number_length = country_data.maximum_phone_number_length;
        const minimum_phone_number_length = country_data.minimum_phone_number_length;
        const timezone = city_data.timezone;
        const sort = {"$sort": {}};
        sort["$sort"]['_id.sequence_number'] = parseInt(1);

        const products = await Product.aggregate([condition, condition1,
            {
                $lookup:
                    {
                        from: "items",
                        localField: "_id",
                        foreignField: "product_id",
                        as: "items"
                    }
            },
            {$unwind: "$items"},
            { $sort: { 'items.sequence_number': 1 }},
            {$match: {$and: [
                        {"items.is_visible_in_store": true},
                        {"items.is_item_in_stock": true},
                        {"items.is_on_delivery": true}
                    ]}},
            {
                $group: {
                    _id: {
                        _id: '$_id', unique_id: "$unique_id", name: '$name',
                        details: '$details', image_url: '$image_url',
                        is_visible_in_store: '$is_visible_in_store',
                        created_at: '$created_at',
                        sequence_number: '$sequence_number',
                        updated_at: '$updated_at'
                    },
                    items: {$push: "$items"}
                }
            }, sort
        ]);

        if (products.length === 0) {
            return res.status(500).json({
                success: false,
                error_code: ITEM_ERROR_CODE.ITEM_NOT_FOUND,
                store: store
            });
        }

        let ads = [];
        const promo_codes = await Promo_code.find({
            created_id: store._id,
            is_approved: true,
            is_active: true
        });

        const advertise = await Advertise.find({
            $or: [{city_id: store.city_id}, {city_id: mongoose.Types.ObjectId(ID_FOR_ALL.ALL_ID)}],
            ads_for: ADS_TYPE.FOR_INSIDE_STORE,
            is_ads_visible: true
        });

        if (country_data && country_data.is_ads_visible && city_data && city_data.is_ads_visible) {
            ads = advertise;
        }

        res.status(200).json({
            success: true,
            message: ITEM_MESSAGE_CODE.ITEM_LIST_SUCCESSFULLY,
            currency: currency,
            maximum_phone_number_length: maximum_phone_number_length,
            minimum_phone_number_length: minimum_phone_number_length,
            city_name: city_data.city_name,
            server_time: server_time,
            timezone: timezone,
            delivery_name: delivery_data.delivery_name,
            ads: ads,
            store: store,
            promo_codes: promo_codes,
            products: products
        });
    } catch (e) {
        res.status(500).json({ message: 'Something was wrong!', e, emessage: e.message });
    }
}
