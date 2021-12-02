const service = {};
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const utility = require('../core/utility');





service.getProducts = async (req, res, next) => {

    let search = req.query.Search, type = req.query.type;
    let searchCookie = 'undefined', typeCookie = 'undefined';
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = req.get('Cookie').split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    // console.log('search', search, type);
    // console.log(readCookie('type'));
    // console.log(readCookie('search'));
    if (req.query.clear == "true") {
        res.cookie('type', undefined, { path: '/product' });
        res.cookie('search', undefined, { path: '/product' });
        return res.redirect('/product/getProducts');
    }


    if (req.get('Cookie')) {
        typeCookie = readCookie('type');
        searchCookie = readCookie('search');
    }

    if ((search && type) &&
        (search != "" && type != "All")) {
        res.cookie('type', type, { path: '/product' });
        res.cookie('search', search, { path: '/product' });
        return res.redirect('/product/getProducts');

    }
    else if (search != "" && type == "All") {
        // res.clearCookie('type', { path: '/product' });
        res.cookie('type', undefined, { path: '/product' });
        res.cookie('search', search, { path: '/product' });
        return res.redirect('/product/getProducts');

    }
    else if (search == "" && type != "All") {
        // res.clearCookie('search', { path: '/product' });
        res.cookie('search', undefined, { path: '/product' });
        res.cookie('type', type, { path: '/product' });
        return res.redirect('/product/getProducts');
        // res.redirect('/product/getProducts');
    }
    // else if (search == "" && type == "All") {
    //     // res.clearCookie('search', { path: '/product' });
    //     res.cookie('search', undefined, { path: '/product' });
    //     res.cookie('type', undefined, { path: '/product' });
    //     return res.redirect('/product/getProducts');
    //     // res.redirect('/product/getProducts');
    // }


    // console.log('typeCookie', typeCookie,'searchCookie', searchCookie);

    if (typeCookie == "undefined" && searchCookie == "undefined") {
        let page = req.query.page || 1
        let count = await Product.count({});
        let per_page = 12, total_pages = Math.ceil(count / per_page);
        Product.find({ deleted: false }).skip((page - 1) * per_page).limit(12).exec((err, product) => {
            if (err) throw err;
            // console.log(total_pages);
            // return
            let response = {
                products: product,
                total_pages: total_pages,
                page: page, per_page: per_page,
                count: count,
                userType: req.session.userType
            }
            res.render('products', response);
        });
    }
    else if (typeCookie != "undefined" && searchCookie == "undefined") {
        let page = req.query.page || 1
        let count = await Product.count({ type: typeCookie });
        let per_page = 12, total_pages = Math.ceil(count / per_page);
        Product.find({ type: typeCookie, deleted: false }).skip((page - 1) * per_page).limit(12).exec((err, product) => {
            if (err) throw err;
            // console.log(total_pages);
            // return
            let response = {
                products: product,
                total_pages: total_pages,
                page: page, per_page: per_page,
                count: count,
                userType: req.session.userType
            }
            res.render('products', response);
        });

    }
    else if (typeCookie == "undefined" && searchCookie != "undefined") {
        let page = req.query.page || 1
        let regex = new RegExp(searchCookie, "i");
        // console.log(regex);
        let count = await Product.count({ name: regex });
        let per_page = 12, total_pages = Math.ceil(count / per_page);
        Product.find({ name: regex, deleted: false }).skip((page - 1) * per_page).limit(12).exec((err, product) => {
            if (err) throw err;
            // console.log(total_pages);
            // return
            let response = {
                products: product,
                total_pages: total_pages,
                page: page, per_page: per_page,
                count: count,
                userType: req.session.userType
            }
            res.render('products', response);
        });
    }
    else if (typeCookie != "undefined" && searchCookie != "undefined") {
        let page = req.query.page || 1
        let regex = new RegExp(searchCookie, "i");
        // console.log(regex);
        let count = await Product.count({ name: regex, type: typeCookie });
        let per_page = 12, total_pages = Math.ceil(count / per_page);
        Product.find({ name: regex, type: typeCookie, deleted: false }).skip((page - 1) * per_page).limit(12).exec((err, product) => {
            if (err) throw err;
            // console.log(total_pages);
            // return
            let response = {
                products: product,
                total_pages: total_pages,
                page: page, per_page: per_page,
                count: count,
                userType: req.session.userType
            }
            res.render('products', response);
        });
    }




}

service.getProduct = async (req, res, next) => {
    Product.findOne(
        { _id: req.params.id },
        (err, product) => {
            if (err) throw err;
            // console.log(product);
            res.render('singleProdcut', { product: product, userType: req.session.userType });
        });
};

module.exports = service;
