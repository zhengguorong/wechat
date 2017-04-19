'use strict';
const jwt = require('jsonwebtoken');
// 是否已经登录
const isLogin = function* (next) {
  const token = this.request.header.authorization;
  if (!token) {
    this.response.status = 401;
    this.response.body = 'token不能为空';
    return;
  }
  // 验证token是否过期
  try {
    const info = jwt.verify(token.split('Bearer ')[1], this.app.config.jwtSecret);
    const exp = info.exp; // 过期时间
    const now = parseInt(new Date().getTime() / 1000);
    // 有效期小于一小时的重新办法token
    const isOver = exp - now < 60 * 60;
    if (isOver) {
      const token = jwt.sign({ userId: info.userId }, app.config.jwtSecret, { expiresIn: '7d' });
      this.set('authorization', 'Bearer ' + token);
    }
  } catch (err) {
    this.response.status = 401;
    // token过期
    if (err.name === 'TokenExpiredError') {
      this.response.body = 'token过期';
    } else if (err.name === 'JsonWebTokenError') {
      this.response.body = 'token无效';
    }
    return;
  }
  yield next;
};

module.exports = () => {
  return {
    isLogin,
  };
};
