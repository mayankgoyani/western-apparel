var express = require('express');
var router = express.Router();
const cart = require("../services/cart.service");
const utility = require('../core/utility');


router.get('/getCart', utility.jwtAuth, cart.getCart);

router.post('/:id/addtoCart', utility.jwtAuth, cart.addtoCart);

router.post('/:id/updateCart', utility.jwtAuth, cart.updateCart);

router.delete('/:id/deleteCart', utility.jwtAuth, cart.deleteCart);

module.exports = router;
