'use strict';
const jwt = require('jsonwebtoken');

module.exports = app => {
  class WechatController extends app.Controller {
    * login() {
      const code = this.ctx.params.code;
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${app.config.appId}&secret=${app.config.appSecret}&js_code=${code}&grant_type=authorization_code`;
      const result = yield this.ctx.curl(url, { dataType: 'json' });
      const openId = result.data.openId;
      if (openId) {
        const hasRegister = yield this.ctx.service.user.hasRegister(openId);
        if (!hasRegister) {
          yield this.ctx.service.user.register({ userId: openId, password: 'wechat' });
        }
        // 生成token
        const token = jwt.sign({ userId: openId }, app.config.jwtSecret, { expiresIn: '7d' });
        this.ctx.body = token;
        this.ctx.set('authorization', 'Bearer ' + token);
      } else {
        this.ctx.body = '获取openId失败';
      }
      this.ctx.status = result.status;

    }
  }
  return WechatController;
};
