'use strict';

module.exports = app => {
  class WechatController extends app.Controller {
    * getOpenId() {
      const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=${app.config.appId}&secret=${app.config.appSecret}&js_code=JSCODE&grant_type=authorization_code';
      const result = yield this.ctx.curl(url);
      this.ctx.status = result.status;
      this.ctx.body = result.body;
    }
  }
  return WechatController;
};
