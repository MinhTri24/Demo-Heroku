var express = require('express');
var router = express.Router();
var authen = require('../models/authenticate');
var displayTable = require('../models/tableDisplay');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', async function(req, res, next) {
  var uname = req.body.username
  var passwd = req.body.password
  var auth = await authen(uname, passwd)
  if (auth==true){
    var tableString = await displayTable(req.body.username);
    res.render('user.ejs',
               {message: "hello\n",
               table: tableString})
  }else{
    res.render('login.ejs', {message: "Incorrect username or password"})
  }
});

module.exports = router;