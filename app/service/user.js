'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = app => {
  class UserService extends app.Service {
    // 用户登录
    * login(user) {
      // 密码做md5处理
      user.password = crypto.createHash('md5').update(user.password).digest('hex');
      // 验证用户名和密码
      if (yield this.checkUser(user.userId, user.password)) {
      // 创建json token,设置7天过期
        const token = jwt.sign({ userId: user.userId }, app.config.jwtSecret, { expiresIn: '7d' });
      // 保存到用户数据库
        user.token = token;
        user = yield this.findOneAndUpdate({ userId: user.userId }, user);
        return user;
      }
      return {
        isSuccess: false,
        msg: '用户名或密码错误',
      };
    }
    // 注册用户
    * register(user) {
      if (yield this.hasRegister(user.userId)) {
        return {
          isSuccess: false,
          msg: '用户已存在',
        };
      }
      user.password = crypto.createHash('md5').update(user.password).digest('hex');
      const newUser = yield app.model.user.create(user);
      this.login(newUser);
      return {
        isSuccess: true,
        user: newUser,
      };
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
    // 验证是否登录
    * isLogin(token) {
      try {
        const user = jwt.verify(token, app.config.jwtSecret);
        return { isSuccess: true, user };
      } catch (err) {
        // token过期
        if (err.name === 'TokenExpiredError') {
          return { isSuccess: false, msg: 'token过期' };
        }
      }
    }
  }
  return UserService;
};
