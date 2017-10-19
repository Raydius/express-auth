var express = require('express');
var router = express.Router();
var authcheck = require('../authcheck.js');

/* GET home page. */
router.get('/', authcheck.ensureLogin, function(req, res, next) {
  res.render('index', { title: 'Express', user: JSON.stringify(req.user) });
});


module.exports = router;
