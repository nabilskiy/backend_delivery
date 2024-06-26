exports = ERROR_CODE = {
    
    INVALID_SERVER_TOKEN: 999,
    DETAIL_NOT_FOUND: 1000,
    TOKEN_EXPIRED: 2000,
    SET_PASSWORD_FAILED: 2001,
    INSUFFICIENT_BALANCE: 2002,
    SOMETHING_WENT_WRONG: 2003,
    REQUIRED_PARAMS_NOT_FOUND: 3000
};

exports = USER_ERROR_CODE = {
    REGISTRATION_FAILED: 501,
    EMAIL_ALREADY_REGISTRED: 502,
    PHONE_NUMBER_ALREADY_REGISTRED: 503,
    USER_ALREADY_REGISTER_WITH_SOCIAL: 505,
    USER_NOT_REGISTER_WITH_SOCIAL: 506,
    LOGIN_FAILED: 511,
    NOT_A_REGISTERED: 512,
    INVALID_PASSWORD: 513,
    UPDATE_FAILED: 521,
    DEVICE_TOKEN_UPDATE_FAILED: 522,
    LOGOUT_FAILED: 523,
    INVALID_REFERRAL_CODE: 531,
    ALREADY_APPLY_REFERRAL_CODE: 532,
    REFERRAL_PROCESS_FAILED: 533,
    USER_DATA_NOT_FOUND: 534,
    GET_ORDER_CART_INVOICE_FAILED: 535,
    WALLET_AMOUNT_ADD_FAILED: 536,
    CHANGE_WALLET_STATUS_FAILED: 537,
    CHECK_PAYMENT_FAILED: 538,
    ORDER_HISTORY_NOT_FOUND: 539,
    ORDER_DETAIL_NOT_FOUND: 540,
    INVALID_REFERRAL: 541,
    OTP_VERIFICATION_FAILED: 542,
    EMAIL_AND_PHONE_ALREADY_REGISTERED: 543,
    PROMO_APPLY_FAILED: 544,
    INVALID_PROMO_CODE: 545,
    INVALID_OR_EXPIRED_PROMO_CODE: 546,
    INVALID_REFERRAL_FOR_YOUR_COUNTRY: 547,
    INVOICE_NOT_FOUND: 548,
    YOUR_ORDER_PAYMENT_PENDING: 549,
    REFERRAL_CODE_OUT_OF_USES_LIMIT_IN_YOUR_COUNTRY: 550,
    PROMO_CODE_ALREADY_USED: 551,
    PROMO_CODE_NOT_FOR_CITY: 552,
    YOUR_DELIVERY_CHARGE_FREE_YOU_CAN_NOT_APPLY_PROMO: 553,

    ADD_FAVOURITE_STORE_FAILED: 554,
    DELETE_FAVOURITE_STORE_FAILED: 555,
    FAVOURITE_STORE_LIST_NOT_FOUND: 556,

    YOUR_ORDER_PRICE_LESS_THEN_STORE_MIN_ORDER_PRICE: 557,
    YOUR_WALLET_AMOUNT_NEGATIVE: 569,

    STORE_REVIEW_LIST_NOT_FOUND: 807,
    STORE_REVIEW_DATA_NOT_FOUND: 808,
    STORE_REVIEW_LIKE_FAILED: 809,

    DELIVERY_SERVICE_NOT_AVAILABLE_IN_YOUR_CITY: 558,
    PROMO_USED_OUT_OF_LIMIT: 559,
    PROMO_AMOUNT_LESS_THEN_MINIMUM_AMOUNT_LIMIT: 560,
    STORE_LIST_NOT_FOUND: 561


};

exports = STORE_ERROR_CODE = {
    REGISTRATION_FAILED: 601,
    EMAIL_ALREADY_REGISTRED: 602,
    PHONE_NUMBER_ALREADY_REGISTRED: 603,
    STORE_ALREADY_REGISTER_WITH_SOCIAL: 605,
    STORE_NOT_REGISTER_WITH_SOCIAL: 606,
    LOGIN_FAILED: 611,
    NOT_A_REGISTERED: 612,
    INVALID_PASSWORD: 613,
    UPDATE_FAILED: 621,
    DEVICE_TOKEN_UPDATE_FAILED: 622,
    LOGOUT_FAILED: 623,
    INVALID_REFERRAL_CODE: 631,
    ALREADY_APPLY_REFERRAL_CODE: 632,
    REFERRAL_PROCESS_FAILED: 633,
    STORE_DATA_NOT_FOUND: 634,
    STORE_BUSINESS_OFF: 635,
    ORDER_HISTORY_NOT_FOUND: 636,
    ORDER_DETAIL_NOT_FOUND: 637,
    OTP_VERIFICATION_FAILED: 638,
    EMAIL_AND_PHONE_ALREADY_REGISTERED: 639,
    PAY_BY_CASH_ON_DELIVERY_FAILED: 640,
    DAILY_EARNING_NOT_FOUND: 641,
    WEEKLY_EARNING_NOT_FOUND: 642,
    MISMATCH_STORE_ID: 643,

    PAY_PAYMENT_FAILED: 644,
    CREATE_ORDER_FAILED: 645,
    GET_INVOICE_FAILED: 646,

    STORE_ORDER_UPDATE_FAILED: 647

};


exports = PROVIDER_ERROR_CODE = {
    REGISTRATION_FAILED: 401,
    EMAIL_ALREADY_REGISTRED: 402,
    PHONE_NUMBER_ALREADY_REGISTRED: 403,
    PROVIDER_ALREADY_REGISTER_WITH_SOCIAL: 405,
    PROVIDER_NOT_REGISTER_WITH_SOCIAL: 406,
    LOGIN_FAILED: 411,
    NOT_A_REGISTERED: 412,
    INVALID_PASSWORD: 413,
    UPDATE_FAILED: 421,
    DEVICE_TOKEN_UPDATE_FAILED: 422,
    LOGOUT_FAILED: 423,
    PROVIDER_DATA_NOT_FOUND: 424,
    STATUS_CHANGE_FAILED: 425,
    NO_PROVIDER_FOUND: 426,
    PROVIDER_NOT_FOUND_SELECTED_SERVICE: 426,
    LOCATION_UPDATE_FAILED: 427,
    ORDER_DETAIL_NOT_FOUND: 428,
    ORDER_HISTORY_NOT_FOUND: 429,
    OTP_VERIFICATION_FAILED: 430,
    EMAIL_AND_PHONE_ALREADY_REGISTERED: 431,
    DAILY_EARNING_NOT_FOUND: 432,
    WEEKLY_EARNING_NOT_FOUND: 433,

    PROVIDER_VEHICLE_ADD_FAILED: 434,
    PROVIDER_VEHICLE_UPDATE_FAILED: 435,
    PROVIDER_VEHICLE_LIST_NOT_FOUND: 436,
    DOCUMENT_UPLOAD_FIRST: 437,
    ADD_VEHICLE_FIRST: 438,
    VEHICLE_TYPE_NOT_ASSIGNED_OR_NOT_APPROVED: 439

};


exports = ORDER_ERROR_CODE = {
    ORDER_FAILED: 651,
    ORDER_NOT_FOUND: 652,
    SET_ORDER_STATUS_FAILED: 653,
    REQUEST_FAILED: 654,
    CHANGE_ORDER_STATUS_FAILED: 655,
    ORDER_CANCEL_FAILED: 656,
    ORDER_CANCEL_OR_REJECT_BY_PROVIDER_FAILED: 657,
    ORDER_CANCEL_OR_REJECT_BY_STORE_FAILED: 658,
    ORDER_COMPLETE_FAILED: 659,
    ORDER_UNIQUE_CODE_INVALID: 660,
    ORDER_NOT_READY: 661,
    ORDER_ALREADY_CANCELLED: 662
};

exports = CART_ERROR_CODE = {
    CART_ADD_FAILED: 961,
    CART_NOT_FOUND: 962,
    CART_UPDATE_FAILED: 963,
    CART_DELETE_FAILED: 964,
    CHANGE_DELIVERY_ADDRESS_FAILED: 965,
    YOUR_DELIVERY_ADDRESS_OUT_OF_AREA: 966,
    YOUR_DELIVERY_ADDRESS_OUT_OF_STORE_AREA: 967
};


exports = PAYMENT_GATEWAY_ERROR_CODE = {
    PAYMENT_GATWAY_DATA_NOT_FOUND: 701,
    PAYMENT_GATWAY_DATA_ADD_FAILED: 702,
    UPDATE_FAILED: 703,
};


exports = COUNTRY_ERROR_CODE = {
    COUNTRY_DETAILS_NOT_FOUND: 801,
    COUNTRY_ADD_FAILED: 802,
    COUNTRY_ALREADY_EXIST: 803,
    BUSINESS_NOT_IN_YOUR_COUNTRY: 804,
    UPDATE_FAILED: 805,
};

exports = CITY_ERROR_CODE = {
    CITY_DETAILS_NOT_FOUND: 811,
    CITY_ADD_FAILED: 812,
    BUSINESS_NOT_IN_YOUR_CITY: 813,
    UPDATE_FAILED: 814,
};

exports = WALLET_REQUEST_ERROR_CODE = {
    WALLET_REQUEST_DETAILS_NOT_FOUND: 815,
    WALLET_REQUEST_CREATE_FAILED: 816,
    WALLET_REQUEST_CANCELLED_FAILED: 817,
    WALLET_REQUEST_ACCEPTED_FAILED: 818,
    WALLET_REQUEST_TRANSFERED_FAILED: 819,
    WALLET_REQUEST_COMPLETED_FAILED: 820,
    WALLET_HISTORY_NOT_FOUND: 833,

};


exports = SETTING_ERROR_CODE = {
    APP_KEY_NOT_FOUND: 821,
    SETTING_DETAILS_NOT_FOUND: 831,
    SETTING_DETAIL_UPDATE_FAILED: 832
};


exports = DELIVERY_ERROR_CODE = {
    DELIVERY_DATA_NOT_FOUND: 841,
    DELIVERY_ADD_FAILED: 842,
    DELIVERY_DATA_NOT_FOUND_IN_YOUR_CITY: 843,
    UPDATE_FAILED: 844,
};

exports = VEHICLE_ERROR_CODE = {
    VEHICLE_DATA_NOT_FOUND: 851,
    VEHICLE_DATA_ADD_FAILED: 852,
    UPDATE_FAILED: 853

};


exports = SERVICE_ERROR_CODE = {
    SERVICE_DATA_ADD_FAILED: 861,
    SERVICE_DATA_NOT_FOUND: 862,
    UPDATE_FAILED: 863
};

exports = PRODUCT_ERROR_CODE = {
    PRODUCT_DATA_ADD_FAILED: 871,
    PRODUCT_DATA_NOT_FOUND: 872,
    UPDATE_FAILED: 873,
    ITEM_LIST_NOT_FOUND: 874,
    PRODUCT_ALREADY_EXIST: 875
};

exports = SPECIFICATION_ERROR_CODE = {
    SPECIFICATION_DATA_ADD_FAILED: 881,
    SPECIFICATION_DATA_NOT_FOUND: 882,

};

exports = SPECIFICATION_GROUP_ERROR_CODE = {
    ADD_FAILED: 1041,
    LIST_NOT_FOUND: 1042
};

exports = ITEM_ERROR_CODE = {
    ITEM_DATA_ADD_FAILED: 891,
    ITEM_NOT_FOUND: 892,
    ITEM_IMAGE_UPLOAD_FAILED: 893,
    ITEM_IMAGE_UPDATE_FAILED: 894,
    UPDATE_FAILED: 895,
    ITEM_STATUS_CHANGE_FAILED: 896,
    ITEM_ALREADY_EXIST: 897
};

exports = DOCUMENT_ERROR_CODE = {
    DOCUMENT_DATA_ADD_FAILED: 1001,
    DOCUMENT_NOT_FOUND: 1002,
    DOCUMENT_LIST_NOT_FOUND: 1003,
    DOCUMENT_UPLAOD_FAILED: 1004,
    UPDATE_FAILED: 1005,
};
exports = PROMO_CODE_ERROR_CODE = {
    PROMO_CODE_DATA_ADD_FAILED: 1011,
    PROMO_CODE_DATA_NOT_FOUND: 1012,
    UPDATE_FAILED: 1013,
    PROMO_LIST_NOT_FOUND: 1010
};
exports = CARD_ERROR_CODE = {
    CARD_DATA_ADD_FAILED: 1014,
    INVALID_PAYMENT_TOKEN: 1015,
    CARD_DATA_NOT_FOUND: 1016,
    CARD_DELETE_FAILED: 1017,
    CARD_SELECTION_FAILED: 1018,
    CARD_DESELECT_FAILED: 1019

};

exports = BANK_DETAIL_ERROR_CODE = {
    BANK_DETAIL_ADD_FAILED: 2021,
    BANK_DETAIL_NOT_FOUND: 2022,
    BANK_DETAIL_UPDATE_FAILED: 2023,
    BANK_DETAIL_DELETE_FAILED: 2024,
    BANK_DETAIL_SELECT_FAILED: 2023,

};


exports = ADS_ERROR_CODE = {
    ADS_ADD_FAILED: 1006,
    ADS_NOT_FOUND: 1007
};

exports = SMS_ERROR_CODE = {

    SMS_DETAIL_NOT_FOUND: 2061,
    SMS_UPDATE_FAILED: 2062

};

exports = EMAIL_ERROR_CODE = {

    EMAIL_DETAIL_NOT_FOUND: 2081,
    EMAIL_UPDATE_FAILED: 2082

};


exports = ADMIN_ERROR_CODE = {
    ADD_FAILED: 991,
    UPDATE_FAILED: 992,
    DATA_NOT_FOUND: 993,
    DETAIL_NOT_FOUND: 994,
    DELETE_FAILED: 995,
    EMAIL_ALREADY_REGISTERED: 996

};

