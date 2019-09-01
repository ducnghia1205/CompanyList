const controller = require('./controller');
const {companyValidator} = require('../../helpers/validation');
const methods = require('../../configs/methods');

module.exports = (route) => {
  route.get('/companies/:id', controller.getCompany);
  route.get('/companies', controller.getListCompanies);
  route.post('/companies', companyValidator(methods.CREATE), controller.createCompany);
  route.put('/companies/:id', companyValidator(methods.UPDATE), controller.updateCompany);
  route.delete('/companies/:id', companyValidator(methods.DELETE), controller.deleteCompany);
};
