var express = require('express');
var router = express.Router();
const Order = require("../services/order.service");
const utility = require('../core/utility');


router.get('/getOrders', utility.jwtAuth, Order.getOrders);

router.get('/chekOut', utility.jwtAuth, Order.checkOut);


module.exports = router;
