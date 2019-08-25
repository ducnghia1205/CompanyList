const db = require('../db/db');
const CONSTANTS = require('../configs/constants');
const {check, validationResult} = require('express-validator');

module.exports = {
  validationCompanies: async (id, data, type) => {
    try {
      let errors = [];
      let company;
      switch (type) {

        case CONSTANTS.TYPE_CREATE:
          if (!data.name || !data.country_code || !data.address || !data.placeholder_url) {
            errors.push('missing required field!');
          }
          break;

        case CONSTANTS.TYPE_UPDATE:
          if (!id || !data.name || !data.country_code || !data.address || !data.placeholder_url) {
            errors.push('missing required field!');
          }
          company = await db('companies').select('*').where('id', id);

          if (!company || !company.length) {
            errors.push('The company does not exist.');
          }
          break;

        case CONSTANTS.TYPE_DELETE:
          if (!id) {
            errors.push('missing required field!');
          }
          company = await db('companies').select('*').where('id', id);

          if (!company || !company.length) {
            errors.push('The company does not exist.');
          }
          break;
      }
      return {errors: errors, company: company};
    } catch (e) {
      console.log('error', e);
      return e
    }
  },
  validationCompaniesv2: async (req, res, next) => {
    try {
      let type = req.method;
      console.log('type: ', type);
      console.log('check: ', check);
      switch (type) {

        case 'POST':
          check('name', `Name is require`).exists();
          check('country_code', `Country_code is require`).exists().isLength({min: 3});
          check('address', `address is require`).exists();
          check('placeholder_url', `Placeholder_url is require`).exists();
          break;

        case CONSTANTS.TYPE_UPDATE:
          if (!id || !data.name || !data.country_code || !data.address || !data.placeholder_url) {
            errors.push('missing required field!');
          }
          company = await db('companies').select('*').where('id', id);

          if (!company || !company.length) {
            errors.push('The company does not exist.');
          }
          break;

        case CONSTANTS.TYPE_DELETE:
          if (!id) {
            errors.push('missing required field!');
          }
          company = await db('companies').select('*').where('id', id);

          if (!company || !company.length) {
            errors.push('The company does not exist.');
          }
          break;
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      next();
    } catch (e) {
      console.log('error: ', e)
    }
  }
};
