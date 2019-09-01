const moment = require('moment');

module.exports = {
  formatDatetimePostgres: (format) => {
    try {
      return moment().format(format).slice(0, -2)
    } catch (e) {
      console.log(e);
    }
  }
};
