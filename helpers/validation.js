const db = require('../db/db');
const CONSTANTS = require('../configs/constants');

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

            if (!company || !company.length){
              errors.push('The company does not exist.');
            }
            break;

          case CONSTANTS.TYPE_DELETE:
            if (!id) {
              errors.push('missing required field!');
            }
            company = await db('companies').select('*').where('id', id);

            if (!company || !company.length){
              errors.push('The company does not exist.');
            }
            break;
        }
      return { errors: errors, company: company };
    }catch (e) {
      console.log('error', e);
      return e
    }
  }
};
