var express = require('express');
var router = express.Router();
const user = require("../services/user.service");


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// login
router.get('/login', (req, res, next) => {
  res.render('login');
});
router.post('/login', user.login);


//signup
router.get('/signup', (req, res, next) => {
  res.render('register');;
});
router.post('/signup', user.signup);



module.exports = router;
