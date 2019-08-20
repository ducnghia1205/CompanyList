const express = require('express');
const router = express.Router();
const db = require('../db/db');
const moment = require('moment');

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

router.put('/:id',async function (req, res) {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const country_code = req.body.country_code;
    const address = req.body.address;
    const placeholder_url = req.body.placeholder_url;

    if (!id || !name || !country_code || !address || !placeholder_url) {
      return res.json('missing required field!');
    }
    const company = await db('companies').select('*').where('id', id);

    if (!company || !company.length){
      return res.json('The company does not exist.')
    }
    req.body.updated_at = moment().format('YYYY-MM-DD HH:mm:ss.ssssssZZ').slice(0, -2);
    await db('companies').update(req.body).where('id', id);

    return res.json('success');
  } catch (e) {
    console.log(e.message);
  }
});

router.delete('/:id',async function (req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.json('missing required field!');
    }
    const company = await db('companies').select('*').where('id', id);

    if (!company || !company.length){
      return res.json('The company does not exist.')
    }
    await db('companies').update({'deleted_at': moment().format('YYYY-MM-DD HH:mm:ss.ssssssZZ').slice(0, -2)}).where('id', id);

    return res.json('success');
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
