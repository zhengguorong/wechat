'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = app => {
  class UserService extends app.Service {
    // 用户登录
    * login(user) {
      user.password = crypto.createHash('md5').update(user.password).digest('hex');
      if (yield this.checkUser(user.userId, user.password)) {
        const token = jwt.sign({ userId: user.userId }, app.config.jwtSecret, { expiresIn: '7d' });
        this.ctx.set('authorization', 'Bearer ' + token);
        return token;
      }
      throw new Error('用户名或密码错误');
    }
    // 注册用户
    * register(user) {
      if (yield this.hasRegister(user.userId)) {
        throw new Error('用户已存在');
      }
      user.password = crypto.createHash('md5').update(user.password).digest('hex');
      return yield app.model.user.create(user);
    }
    * delete(userId) {
      yield app.model.user.remove({ userId });
    }
    // 该账号是否已经注册
    * hasRegister(userId) {
      const user = yield app.model.user.findOne({ userId });
      if (user && user.userId) {
        return true;
      }
      return false;
    }
    // 验证账号密码是否正确
    * checkUser(userId, password) {
      const user = yield app.model.user.findOne({ userId, password });
      if (user && user.userId) {
        return true;
      }
      return false;
    }
    * getUserById(userId) {
      const user = yield app.model.user.findOne({ userId }, '-_id -password -__v');
      if (user) return user;
      throw new Error('用户不存在');
    }
  }
  return UserService;
};
