var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',async function(req, res, next) {
  // console.log(pool)
  const data = await PSQL.query('SELECT * FROM users');
  return res.send(data.rows);

});

module.exports = router;
