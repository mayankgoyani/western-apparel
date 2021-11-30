const service = {};
const User = require('../models/user.model')
const utility = require('../core/utility')
const randToken = require('rand-token');


service.signup = async (req, res, next) => {
    try {
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
            res.send({ 'message': 'User already exists' });

        }
    }
    catch (error) {
        res.send({ 'error': error });
    }

}

service.login = async (req, res, next) => {
    // console.log(req.user);
    try {
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
                await res.redirect('/index');
                // res.send(response);
            } else {
                res.send({ 'message': 'Enter correct password' });
            }
        } else {
            res.send({ 'message': 'User Does not exist' });
        }
    }
    catch (error) {
        res.send({ 'error': error });
    }

}



module.exports = service;