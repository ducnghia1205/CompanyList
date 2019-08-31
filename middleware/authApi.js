const tokenHelper = require('../helpers/authToken');
const db = require('../db/db');

module.exports = async (req, res, next) => {
  try {
    if (req.method !== 'OPTIONS') {
      const token = req.headers['authorization'];
      const verify = await tokenHelper.verifyToken(token);
      const user = await db('users').select('*').where('id', verify.id ).returning('*');
      req.user = user[0];
    }
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(403).json({ message: e.message ? e.message : 'Error' });
    }
    return res.status(401).json({ message: e.message ? e.message : 'Error' });
  }
};
