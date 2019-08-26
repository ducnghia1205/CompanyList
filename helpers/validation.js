const methods = require('../configs/methods');
const { buildCheckFunction } = require('express-validator');
const checkAll = buildCheckFunction(['params', 'body', 'query']);

module.exports = {
  companyValidator: (method) => {
    switch (method) {
      case methods.CREATE:
        return [
          checkAll('name', `Name is require`).exists().isLength({min: 1}),
          checkAll('country_code', `Country_code is require`).exists().isLength({min: 1}),
          checkAll('address', `address is require`).exists().isLength({min: 1}),
          checkAll('placeholder_url', `Placeholder_url is require`).exists().isLength({min: 1})
        ];

      case methods.UPDATE:
        return [
          checkAll('id', `Id is require`).exists().isInt().isLength({min: 1}),
          checkAll('name', `Name is require`).exists().isLength({min: 1}),
          checkAll('country_code', `Country_code is require`).exists().isLength({min: 1}),
          checkAll('address', `address is require`).exists().isLength({min: 1}),
          checkAll('placeholder_url', `Placeholder_url is require`).exists().isLength({min: 1})
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
  }
};
