const db = require('../../db/db');
const moment = require('moment');
const {validationResult} = require('express-validator');
const dateTimeUtils = require('../../helpers/dateTimeUtils');

module.exports = {
  getListCompanies: async (req, res) => {
    try {
      const perPage = req.query.per_page || 20;
      const page = req.query.page || 1;
      const result = await PSQL.query(
        `SELECT * FROM companies LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      );

      return res.success(result.rows);
    } catch (e) {
      return res.error(`failed to load companies due to ${e.message}`);
    }
  },
  createCompany: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }
      const company = await db('companies').insert(req.body).returning('*');
      if (!company || !company.length) {
        return res.error(`failed to create company`);
      }

      return res.success(company[0]);
    } catch (e) {
      return res.error(`failed to create company due to ${e.message}`);
    }
  },
  updateCompany: async (req, res) => {
    try {
      const id = req.params.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }

      let company = await db('companies').select('*').where('id', id).returning('*');
      if (!company || !company.length) {
        return res.error(`failed to update company.`);
      }

      req.body.updated_at = dateTimeUtils.formatDatetimePostgres();
      company = await db('companies').update(req.body).where('id', id).returning('*');

      return res.success(company[0]);
    } catch (e) {
      return res.error(`failed to update company due to ${e.message}`);
    }
  },
  deleteCompany: async (req, res) => {
    try {
      const id = req.params.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }

      let company = await db('companies').select('*').where('id', id);
      if (!company || !company.length) {
        return res.error(`failed to delete company.`);
      }

      company = await db('companies').update({'deleted_at': dateTimeUtils.formatDatetimePostgres()})
        .where('id', id).returning('*');

      return res.success(company[0]);
    } catch (e) {
      return res.error(`failed to delete company due to ${e.message}`);
    }
  }
};
