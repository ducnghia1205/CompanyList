const moment = require('moment');

module.exports = {
  formatDatetimePostgres: () => {
    try {
      return moment().format("YYYY-MM-DD HH:mm:ss.ssssssZZ").slice(0, -2)
    } catch (e) {
      return e
    }
  }
};
