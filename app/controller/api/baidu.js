'use strict';

module.exports = app => {
  class BaiduAIController extends app.Controller {
    * getAccessToken() {
      const nowDateTime = new Date().getTime();
      const baiduToken = this.ctx.session.baiduToken;
      if (baiduToken && baiduToken.expiresTime > nowDateTime) {
        this.ctx.body = baiduToken.access_token;
      } else {
        const url = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${app.config.baidu.face.appId}&client_secret=${app.config.baidu.face.appSecret}`;
        const response = yield this.ctx.curl(url, { dataType: 'json' });
        const result = response.data;
        // 将accessToken存在session中
        if (result.access_token) {
        // 计算失效时间
          const expiresTime = nowDateTime + result.expires_in * 1000;
          result.expiresTime = expiresTime;
          this.ctx.session.baiduToken = result;
          this.ctx.body = result.access_token;
        } else {
          this.ctx.status = 400;
          this.ctx.body = result;
        }
      }

    }
  }
  return BaiduAIController;
};

