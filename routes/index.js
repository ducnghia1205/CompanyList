const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/test', async function (req, res) {
  const data = await PSQL.query('SELECT * FROM users');

  return res.send(data.rows);
});

module.exports = router;
