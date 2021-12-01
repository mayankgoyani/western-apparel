const service = {};
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const utility = require('../core/utility')
const randToken = require('rand-token');


service.signup = async (req, res, next) => {
    let errors = [];

    try {
        if (req.body.password != req.body.confirmPassword) {
            errors.push({ msg: 'Password is not mached' });
            res.render('register', { 'errors': errors });

        }
        const userExists = await User.findOne({ email: req.body.email.toLowerCase() });
        if (!userExists) {

            const rand = await randToken.uid(10);
            let hashedPassword = await utility.createPassword(rand, req.body.password);
            const user = new User({
                email: req.body.email.toLowerCase(),
                password: hashedPassword,
                rand: rand,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthdate: req.body.birthdate,
                mobilenumber: req.body.mobilenumber,
                isActive: true
            });
            let response = await user.save();
            // res.send({ 'data': response });
            res.redirect('/user/login');
        } else {
            errors.push({ msg: 'User already exists' });
            res.render('register', { 'errors': errors });
        }
    }
    catch (error) {
        res.send({ 'error': error });
    }

}

service.login = async (req, res, next) => {
    let errors = [];
    // console.log(req.user);
    try {
        if (req.body.email == '') {
            errors.push({ msg: 'Enter email address' });
            res.render('login', { 'errors': errors });
        }
        const userExists = await User.findOne({ email: req.body.email.toLowerCase() });
        // console.log(userExists);
        if (userExists) {
            const enteredPassword = utility.createPassword(userExists.rand, req.body.password);
            // console.log(enteredPassword);
            // console.log(userExists.password);
            if (enteredPassword == userExists.password) {
                userExists.isActive = true;
                let response = await userExists.save();
                const token = await utility.createJwtToken({
                    id: response._id,
                    email: response.email,
                    userType: response.userType
                });
                response = {
                    ...JSON.parse(JSON.stringify(response)),
                    token: token
                }
                req.session.token = token;
                req.session.isLoggedIn = true;
                req.session.userType = response.userType;
                req.session.userName = response.firstname;
                // return res.json(response);
                await res.redirect('/index');
                // res.send(response);
            } else {
                errors.push({ msg: 'Enter Correct Password' });
                res.render('login', { 'errors': errors });

            }
        } else {
            errors.push({ msg: 'User is not Exists' });
            res.render('login', { 'errors': errors });
        }
    }
    catch (error) {
        res.send({ 'error': error });
    }

}

service.logout = async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}



module.exports = service;