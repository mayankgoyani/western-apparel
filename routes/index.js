var express = require('express');
var router = express.Router();
let token;

/* GET home page. */
router.get('/', async function (req, res, next) {
  token = await req.query.token;
  res.redirect('/index');
});

router.get('/index', async function (req, res, next) {
  let response;
  // res.send(response)
  await res.render('index', { token: token });
});


module.exports = router;
