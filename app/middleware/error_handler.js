'use strict';

module.exports = () => {
  return function* errorHandler(next) {
    try {
      yield next;
    } catch (err) {
      if (this.status !== 401) this.status = 400;
      this.body = err.message;
    }
  };
};
