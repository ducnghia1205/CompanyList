const express = require('express');
const router = express.Router();
const db = require('../db/db');
const moment = require('moment');
const CONSTANTS = require('../configs/constants');
const {check, validationResult} = require('express-validator');

router.get('/', async function (req, res) {
  try {
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
  } catch (e) {
    console.log(e.message)
  }
});

router.post('/', [
  check('name', `Name is require`).exists(),
  check('country_code', `Country_code is require`).exists().isLength({min: 3}),
  check('address', `address is require`).exists(),
  check('placeholder_url', `Placeholder_url is require`).exists()
], async function (req, res) {
  try {
    // const validationResult = await validationCompanies(undefined, req.body, CONSTANTS.TYPE_CREATE);

    // if (validationResult.errors && validationResult.errors.length) {
    //   return res.json(validationResult.errors);
    // }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    await db('companies').insert(req.body);

    return res.json('success');
  } catch (e) {
    console.log(e.message);
  }
});

router.put('/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const validationResult = await validationCompanies(id, req.body, CONSTANTS.TYPE_UPDATE);

    if (validationResult.errors && validationResult.errors.length) {
      return res.json(validationResult.errors);
    }

    req.body.updated_at = moment().format('YYYY-MM-DD HH:mm:ss.ssssssZZ').slice(0, -2);
    await db('companies').update(req.body).where('id', id);

    return res.json('success');
  } catch (e) {
    console.log(e.message);
  }
});

router.delete('/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const validationResult = await validationCompanies(id, {}, CONSTANTS.TYPE_DELETE);

    if (validationResult.errors && validationResult.errors.length) {
      return res.json(validationResult.errors);
    }
    await db('companies').update({'deleted_at': moment().format('YYYY-MM-DD HH:mm:ss.ssssssZZ').slice(0, -2)}).where('id', id);

    return res.json('success');
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
