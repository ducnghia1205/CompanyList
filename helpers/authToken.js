require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECERT || '310f828e913f241d16571e34685db539';
const jwtExpires = process.env.JWT_EXPIRES || '14d';
const jwtAlgorithm = process.env.JWT_ALGORITHM || 'RS256';

module.exports = {
  verifyToken: async (token) => {
    try {
      return await jwt.verify(token, jwtSecret);
    } catch (e) {
      console.log('err: ', e);
      return e;
    }
  },
  signToken: async (data) => {
    try {
      return await jwt.sign(data, jwtSecret, { expiresIn: jwtExpires }, { algorithm: jwtAlgorithm });
    } catch (e) {
      console.log('err: ', e);
      return e;
    }
  }
};
