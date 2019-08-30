const db = require('../../db/db');
const { validationResult } = require('express-validator');
const constants  = require('../../configs/constants');
const dateTimeUtils  = require('../../helpers/dateTimeUtils');
const { generatePassword } = require('../../migrations/20190828172839_createUsers');

module.exports = {
  getListUsers: async (req, res) => {
    try {
      const perPage = req.query.per_page || 20;
      const page = req.query.page || 1;
      const result = await PSQL.query(
        `SELECT * FROM users LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      );

      if (!result || !result.rows.length) {
        return res.error('No data available!')
      }

      return res.success(result.rows);
    } catch (e) {
      console.log(e.message)
    }
  },
  createUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }
      req.body.password = generatePassword(req.body.password);
      const user = await db('users').insert(req.body).returning('*');
      if (!user || !user.length){
        return res.error('Create user fail.')
      }
      return res.success(user[0]);
    } catch (e) {
      console.log(e.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }
      if (req.body && req.body.password) {
        req.body.password = generatePassword(req.body.password);
      }
      let user = await db('users').select('*').where('id', id).returning('*');
      if (!user || !user.length) {
        return res.error(`user does't exist`);
      }
      req.body.updated_at = dateTimeUtils.formatDatetimePostgres(constants.DATE_TIME_POSTGRES);
      user = await db('users').update(req.body).where('id', id).returning('*');
      return res.success(user[0]);
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }
      let user = await db('users').select('*').where('id', id);
      if (!user || !user.length) {
        return res.error(`user does't exist`);
      }
      user = await db('users').update({
        'deleted_at': dateTimeUtils.formatDatetimePostgres(constants.DATE_TIME_POSTGRES)})
        .where('id', id).returning('*');
      return res.success(user[0]);
    } catch (e) {
      console.log(e.message);
    }
  }
};
