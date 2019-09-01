const express = require('express');
const auth = require('../helpers/authToken');
const usersApi = require('../app/users/route');
const companiesApi = require('../app/companies/route');
const authApi = require('../app/auth/route');
const apiRoutes = express.Router();
const apiAuthRoutes = express.Router();

module.exports = {
  getRoutes: (app) => {
    companiesApi(apiRoutes);
    usersApi(apiAuthRoutes);
    authApi(apiRoutes);

    app.use('/', apiRoutes);
    app.use('/', auth.verifyToken, [apiAuthRoutes]);
  }
};
