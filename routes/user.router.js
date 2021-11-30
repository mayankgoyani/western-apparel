var express = require('express');
var router = express.Router();
const user = require("../services/user.service");
const validation = require('../core/validation');



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// login
router.get('/login', (req, res, next) => {
  res.render('login', { 'errors': '' });

});
router.post('/login', user.login);


//signup
router.get('/signup', (req, res, next) => {
  res.render('register', { 'errors': '' });
});

router.post('/signup', validation.register, validation.check, user.signup);



module.exports = router;
