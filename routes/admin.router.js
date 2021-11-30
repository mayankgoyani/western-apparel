var express = require('express');
const utility = require('../core/utility');
var router = express.Router();
const admin = require("../services/admin.service");

router.get('/addProduct',utility.jwtAuth, (req, res, next) => {
    res.render('admin/addProduct');
});

router.post('/addProduct', admin.addProduct);

module.exports = router;
