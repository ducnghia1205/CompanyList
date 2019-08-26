const express = require('express');
const companiesApi = require('../app/companies/route');
const apiRoutes = express.Router();

module.exports = {
  getRoutes: (app) => {
    companiesApi(apiRoutes);

    app.use('/', apiRoutes);
  }
};
