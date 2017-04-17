'use strict';
const jwt = require('jsonwebtoken');
module.exports = {
  get user() {
    const token = this.get('authorization');
    const info = jwt.decode(token.split('Bearer ')[1]);
    return info || {};
  },
};
