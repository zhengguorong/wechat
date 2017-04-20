'use strict';
const jwt = require('jsonwebtoken');

module.exports = app => {
  class WechatController extends app.Controller {
    * login() {
      const code = this.ctx.params.code;
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${app.config.appId}&secret=${app.config.appSecret}&js_code=${code}&grant_type=authorization_code`;
      const result = yield this.ctx.curl(url, { dataType: 'json' });
      const openId = result.data.openid;
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
    * getAccessToken() {
      const nowDateTime = new Date().getTime();
      const accessToken = this.ctx.session.accessToken;
      // 如果未过期，直接获取session中access_token
      if (accessToken && accessToken.expiresTime > nowDateTime) {
        this.ctx.body = accessToken.access_token;
      } else {
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${app.config.appId}&secret=${app.config.appSecret}`;
        const result = yield this.ctx.curl(url, { dataType: 'json' });
      // 将accessToken存在session中
        if (result.access_token) {
        // 计算失效时间
          const expiresTime = nowDateTime + result.expires_in * 1000;
          result.expiresTime = expiresTime;
          this.ctx.session.accessToken = result;
          this.ctx.body = result.access_token;
        } else {
          this.ctx.status = 400;
          this.ctx.body = result;
        }
      }

    }
  }
  return WechatController;
};
