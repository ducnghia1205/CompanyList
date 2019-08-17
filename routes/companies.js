const express = require('express');
const router = express.Router();

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

module.exports = router;
