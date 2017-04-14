'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    * login() {
      yield this.ctx.render('user/login.tpl');
    }
    * register() {
      yield this.ctx.render('user/register.tpl');
    }
  }
  return UserController;
};
