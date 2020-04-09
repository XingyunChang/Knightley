var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  //res.render('index', { title: 'Express' });
  res.json("UserAuthentication using express modules");
});

router.get('/companies', (req, res, next) => {
  //res.render('index', { title: 'Express' });
  res.json("pull data from dummy server to display companies");
});


module.exports = router;
