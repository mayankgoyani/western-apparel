var express = require('express');
const utility = require('../core/utility');
var router = express.Router();
const admin = require("../services/admin.service");

router.get('/addProduct', utility.jwtAuth, (req, res, next) => {
    res.render('admin/addProduct');
});

router.post('/addProduct', utility.jwtAuth, admin.addProduct);

router.get('/:id/editProduct', utility.jwtAuth, admin.getEditProduct);
router.post('/:id/editProduct', utility.jwtAuth, admin.postEditProduct);


module.exports = router;
