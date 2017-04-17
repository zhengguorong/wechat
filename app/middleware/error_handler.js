'use strict';

module.exports = () => {
  return function* errorHandler(next) {
    try {
      yield next;
    } catch (err) {
      // this.app.emit('error', err, this);
      this.body = {
        isSuccess: false,
        message: err.message,
      };
    }
  };
};
