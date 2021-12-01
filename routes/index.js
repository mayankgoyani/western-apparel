var express = require('express');
var router = express.Router();
// let token;

/* GET home page. */
router.get('/', async function (req, res, next) {
  // token = await req.query.token;
  res.redirect('/index');
});

router.get('/index', async function (req, res, next) {
  // console.log(req.session.userType);
  res.cookie('type', undefined, { path: '/product' });
  res.cookie('search', undefined, { path: '/product' });

  // res.clearCookie('search', { path: '/product' });
  // res.clearCookie('type', { path: '/product' });
  await res.render('index');
});


module.exports = router;
