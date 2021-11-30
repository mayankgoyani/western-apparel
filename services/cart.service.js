const service = {};
const Product = require('../models/product.model');
const User = require('../models/user.model');
const utility = require('../core/utility');



service.getCart = (req, res, next) => {
    console.log(req.user.id);
}

module.exports = service;
