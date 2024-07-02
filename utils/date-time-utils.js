const moment = require('moment');

class DateTimeUtils {

  /**
   * Get current date of the various timestamp format.
   * @param timestampFormat e.g.,
   * 1. 'YYYY-MM-DD'
   * 2. 'MMM DD YYYY'
   */
  static currentDate(timestampFormat) {
    let ct = moment().format(timestampFormat);
    return ct;
  }

  static addDaysToCurrentDate(days, timestampFormat) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    return moment(date).format(timestampFormat);
  }
}

module.exports = { DateTimeUtils };
