const methods = require('../configs/methods');
const { buildCheckFunction } = require('express-validator');
const checkAll = buildCheckFunction(['params', 'body', 'query']);

module.exports = {
  companyValidator: (method) => {
    switch (method) {
      case methods.CREATE:
        return [
          checkAll('name', `name is require`).exists().isLength({min: 1}),
          checkAll('country_code', `country_code is require`).exists().isLength({min: 1}),
          checkAll('address', `address is require`).exists().isLength({min: 1}),
          checkAll('placeholder_url', `placeholder_url is require`).exists().isLength({min: 1})
        ];

      case methods.UPDATE:
        return [
          checkAll('id', `id is require`).exists().isInt().isLength({min: 1}),
          checkAll('name', `name is require`).exists().isLength({min: 1}),
          checkAll('country_code', `country_code is require`).exists().isLength({min: 1}),
          checkAll('address', `address is require`).exists().isLength({min: 1}),
          checkAll('placeholder_url', `placeholder_url is require`).exists().isLength({min: 1})
        ];

      case methods.DELETE:
        return [
          checkAll('id', `Id is require`).exists().isInt().isLength({min: 1}),
        ];

      default:
        console.log(`Wrong method validator ${method}`);
        return [
          checkAll('WrongMethod', `Wrong method validator ${method}`).exists()
        ];
    }
  },
  userValidator: (method) =>{
    switch (method) {
      case methods.CREATE:
        return [
          checkAll('user_name', `user_name is require`).exists().isLength({min: 1}),
          checkAll('email', `email is require`).exists().isEmail().isLength({min: 1}),
          checkAll('password', `password is require`).exists().isLength({min: 1}),
        ];

      case methods.UPDATE:
        return [
          checkAll('id', `id is require`).exists().isInt().isLength({min: 1}),
          checkAll('user_name', `user_name is require`).exists().isLength({min: 1}),
          checkAll('email', `email is require`).exists().isEmail().isLength({min: 1}),
        ];

      case methods.DELETE:
        return [
          checkAll('id', `id is require`).exists().isInt().isLength({min: 1}),
        ];

      default:
        console.log(`Wrong method validator ${method}`);
        return [
          checkAll('WrongMethod', `Wrong method validator ${method}`).exists()
        ];
    }
  }
};
