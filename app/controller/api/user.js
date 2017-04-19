'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    * register() {
      const userId = this.ctx.request.body.userId;
      const password = this.ctx.request.body.password;
      if (!userId || !password) {
        this.ctx.status = 400;
        this.ctx.body = '用户名或者密码不能为空';
        return;
      }
      yield this.ctx.service.user.register({ userId, password });
      this.ctx.status = 200;
    }
    * login() {
      const userId = this.ctx.request.body.userId;
      const password = this.ctx.request.body.password;
      if (!userId || !password) {
        this.ctx.status = 400;
        this.ctx.body = '用户名或者密码不能为空';
        return;
      }
      yield this.ctx.service.user.login({ userId, password });
      this.ctx.status = 200;
    }
    * getUser() {
      const userId = this.ctx.request.user.userId;
      const user = yield this.ctx.service.user.getUserById(userId);
      this.ctx.body = user;
    }
  }
  return UserController;
};

