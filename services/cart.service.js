const service = {};
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const utility = require('../core/utility');



service.getCart = (req, res, next) => {
    // console.log(req.user.id);
    let finalTotal = 0;
    Cart.find({ userId: req.user.id }).populate('product', 'name images price').exec(function (err, result) {
        // console.log(result);
        // res.json(result);
        result.forEach((results)=>{
            // console.log(results.quantity * results.product.price);
            finalTotal += results.quantity * results.product.price;
        })
        res.render('cart', { products: result, finalTotal : finalTotal });
    });
}

service.addtoCart = async (req, res, next) => {
    // console.log(req.user.id);
    const cart = await new Cart({
        userId: req.user.id,
        color: req.body.color,
        size: req.body.size,
        quantity: req.body.quantity,
        product: req.params.id,
    });
    const response = await cart.save();
    res.redirect('/cart/getCart');

    // res.json(response);
}

service.updateCart = async (req, res, next) => {
    // console.log(req.body.quantity);
    // console.log(req.params.id);
    await Cart.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            quantity: parseInt(req.body.quantity)
        }
    });
    res.redirect('/cart/getCart');

}

service.deleteCart = async (req, res, next) => {
    Cart.remove({ _id: req.params.id }, (err) => {
        if (err) throw err;
    })
    res.redirect('/cart/getCart');
}

module.exports = service;
