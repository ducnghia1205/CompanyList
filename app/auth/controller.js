const db = require('../../db/db');
const { validationResult } = require('express-validator');
const constants  = require('../../configs/constants');
const dateTimeUtils  = require('../../helpers/dateTimeUtils');
const facebookServices = require('../../helpers/facebookServices');
const tokenHelper = require('../../helpers/authToken');
const { comparePassword, generatePassword } = require('../../migrations/20190828172839_createUsers');

module.exports = {
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }
      // verify facebook accessToken
      const verify = await facebookServices.verifyClientToken(req.body.accessToken);
      const newUser = {
        user_id: req.body.userID,
        accessToken: verify.data.access_token,
        user_name: req.body.name,
        email: req.body.email,
      };
      //check exist user
      let user = await db('users').select('*').where('user_id', req.body.userID).returning('*');
      if (!user || !user.length) {
        user = await db('users').insert(newUser).returning('*');
      } else {
        user = await db('users').update({accessToken: verify.data.access_token}).where('user_id', req.body.userID).returning('*');
      }
      // generate token
      let token = await tokenHelper.signToken({ id: user[0].id });
      const result = {
        user: user[0],
        token: token
      };

      return res.success(result);
    } catch (e) {
      return res.error(e);
    }
  },
  loginWithEmailPassword: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.error({errors: errors.array()}, 422);
      }
      // verify facebook accessToken
      let user = await db('users').select('*').where('email', req.body.email).returning('*');
      if (!user || !user.length) {
        return res.error('email is incorrect.')
      }
      if (!comparePassword(req.body.password, user[0].password)) {
        return res.error('password is incorrect.')
      }
      // generate token
      let token = await tokenHelper.signToken({ id: user[0].id });
      const result = {
        user: user[0],
        token: token
      };

      return res.success(result);
    } catch (e) {
      return res.error(e);
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
    return res.error(e)
  }
},
};
