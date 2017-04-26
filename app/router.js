'use strict';

module.exports = app => {
  const auth = app.middlewares.auth();
  // 页面路由
  app.get('/', 'web.home.index');
  app.get('/login', 'web.user.login');
  app.get('/register', 'web.user.register');

  // 接口路由
  app.post('/api/user/register', 'api.user.register');
  app.post('/api/user/login', 'api.user.login');
  app.get('/api/user', auth.isLogin, 'api.user.getUser');

  // 微信相关接口
  app.get('/api/wechat/login/:code', 'api.wechat.login');
  app.get('/api/wechat/getAccessToken', 'api.wechat.getAccessToken');

  // 百度相关接口
  app.get('/api/baidu/getAccessToken', 'api.baidu.getAccessToken');

  app.resources('demand', '/api/demand', auth.isLogin, 'api.demand');
};
