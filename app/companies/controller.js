const db = require('../../db/db');
const moment = require('moment');
const { validationResult} = require('express-validator');

module.exports = {
  getListCompanies: async (req, res) => {
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

      return res.json(result.rows);
    } catch (e) {
      console.log(e.message)
    }
  },
  createCompany: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      await db('companies').insert(req.body);

      return res.json('success');
    } catch (e) {
      console.log(e.message);
    }
  },
  updateCompany: async (req, res) => {
    try {
      const id = req.params.id;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      const company = await db('companies').select('*').where('id', id);
      if (!company || !company.length) {
        return res.json(`company does't exist`);
      }
      req.body.updated_at = moment().format('YYYY-MM-DD HH:mm:ss.ssssssZZ').slice(0, -2);
      await db('companies').update(req.body).where('id', id);

      return res.json('success');
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteCompany: async (req, res) => {
    try {
      const id = req.params.id;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      const company = await db('companies').select('*').where('id', id);
      if (!company || !company.length) {
        return res.json(`company does't exist`);
      }
      await db('companies').update({'deleted_at': moment().format('YYYY-MM-DD HH:mm:ss.ssssssZZ').slice(0, -2)}).where('id', id);

      return res.json('success');
    } catch (e) {
      console.log(e.message);
    }
  }
}
