const express = require('express');
const companiesApi = require('../app/companies/route');
const usersApi = require('../app/users/route');
const apiRoutes = express.Router();

module.exports = {
  getRoutes: (app) => {
    companiesApi(apiRoutes);
    usersApi(apiRoutes);

    app.use('/', apiRoutes);
  }
};
