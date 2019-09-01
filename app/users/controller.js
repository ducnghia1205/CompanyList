const db = require('../../db/db');
const {validationResult} = require('express-validator');
const dateTimeUtils = require('../../helpers/dateTimeUtils');
const {generatePassword} = require('../../migrations/20190828172839_createUsers');

module.exports = {
  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await db('users').where({id: id}).first();

      if (!result) {
        return res.error(`user with id ${id} doesn't exit`)
      }

      return res.success(result);
    } catch (e) {
      return res.error(`failed to get user ${req.params.id} due to ${e.message}`)
    }
  },
  getListUsers: async (req, res) => {
    try {
      const perPage = req.query.per_page || 20;
      const page = req.query.page || 1;
      const result = await db('users')
        .select('*')
        .limit(perPage).offset((page - 1) * perPage);

      return res.success(result.rows);
    } catch (e) {
      return res.error(`failed to load users due to ${e.message}`);
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

      if (!user || !user.length) {
        return res.error('failed to create user')
      }

      return res.success(user[0]);
    } catch (e) {
      return res.error(`failed to create user due to ${e.message}`)
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }

      if (req.body.password) {
        req.body.password = generatePassword(req.body.password);
      }

      let user = await db('users').select('*').where('id', id).first();

      if (!user) {
        return res.error(`failed to update user`);
      }

      req.body.updated_at = dateTimeUtils.formatDatetimePostgres();
      user = await db('users').update(req.body).where('id', id).returning('*');

      if (!user || !user.length) {
        return res.error('failed to update user')
      }

      return res.success(user[0]);
    } catch (e) {
      return res.error(`failed to update user due to ${e.message}`);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }

      let user = await db('users').select('*').where('id', id).first();

      if (!user) {
        return res.error(`failed to delete user.`);
      }

      user = await db('users').update({
        'deleted_at': dateTimeUtils.formatDatetimePostgres()
      }).where('id', id).returning('*');

      if (!user || !user.length) {
        return res.error('failed to delete user')
      }

      return res.success(user[0]);
    } catch (e) {
      return res.error(`failed to delete user due to ${e.message}`);
    }
  }
};
