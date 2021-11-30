var express = require('express');
var router = express.Router();
// let token;

/* GET home page. */
router.get('/', async function (req, res, next) {
  // token = await req.query.token;
  res.redirect('/index');
});

router.get('/index', async function (req, res, next) {
  console.log(req.session.userType);
  await res.render('index');
});


module.exports = router;
