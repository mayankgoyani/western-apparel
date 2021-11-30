var express = require('express');
var router = express.Router();
const product = require("../services/product.service");
const utility = require('../core/utility');


router.get('/getProducts', product.getProducts);

router.get('/getProducts/:id', product.getProduct);

module.exports = router;
