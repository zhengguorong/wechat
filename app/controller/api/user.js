'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    * find() {
      const user = yield app.model.user.find({});
      this.ctx.body = user;
    }
    * register() {
      const userId = this.ctx.request.body.userId;
      const password = this.ctx.request.body.password;
      if (!userId || !password) {
        this.ctx.body = { isSuccess: false, msg: '用户名或者密码不能为空' };
        return;
      }
      const result = yield this.ctx.service.user.register({ userId, password });
      this.ctx.body = result;
    }
    * login() {
      const userId = this.ctx.request.body.userId;
      const password = this.ctx.request.body.password;
      if (!userId || !password) {
        this.ctx.body = { isSuccess: false, msg: '用户名或者密码不能为空' };
        return;
      }
      const result = yield this.ctx.service.user.login({ userId, password });
      result.password = '';
      this.ctx.body = result;
    }
    * isLogin() {
      const token = this.ctx.request.body.token;
      const result = yield this.ctx.service.user.isLogin(token);
      this.ctx.body = result;
    }
  }
  return UserController;
};

