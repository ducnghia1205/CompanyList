const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', async function (req, res) {
  const perPage = req.query.per_page || 20;
  const page = req.query.page || 1;
  const result = await PSQL.query(
    `
     SELECT * FROM companies 
     LIMIT ${perPage} OFFSET ${(page - 1) * perPage}
     `
  );

  if (!result) {
    return res.send('No have data!')
  }

  return res.send(result.rows);
});

router.post('/',async function (req, res) {
  try {
    const name = req.body.name;
    const country_code = req.body.country_code;
    const address = req.body.address;
    const placeholder_url = req.body.placeholder_url;
    
    if (!name || !country_code || !address || !placeholder_url) {
      return res.json('missing required field!');
    }
    await db('companies').insert(req.body);

    return res.json('success');
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
