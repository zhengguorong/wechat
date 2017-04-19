'use strict';

module.exports = app => {
  class WechatController extends app.Controller {
    * getOpenId() {
      const code = this.ctx.params.code;
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${app.config.appId}&secret=${app.config.appSecret}&js_code=${code}&grant_type=authorization_code`;
      const result = yield this.ctx.curl(url, { dataType: 'json' });
      this.ctx.status = result.status;
      this.ctx.body = result.body;
    }
  }
  return WechatController;
};
