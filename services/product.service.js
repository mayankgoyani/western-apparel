const service = {};
const Product = require('../models/product.model');
const User = require('../models/user.model');
const utility = require('../core/utility');



service.getProducts = async (req, res, next) => {
    // utility.jwtAuth(req,res,next);
    // console.log(req.user.id);
    let count = await Product.count({});
    let per_page = 12, total_pages = Math.ceil(count / per_page), page = req.query.page || 1;
    Product.find({}).skip((page - 1) * per_page).limit(12).exec((err, product) => {
        if (err) throw err;
        // console.log(total_pages);
        // return
        // res.render('products', { products: product, total_pages: total_pages, page: page, per_page: per_page, count: count, userType: req.session.userType });
    });
}

service.getProduct = async (req, res, next) => {
    Product.findOne(
        { _id: req.params.id },
        (err, product) => {
            if (err) throw err;
            // console.log(product);
            res.render('singleProdcut', { product: product });
        });
};

module.exports = service;
