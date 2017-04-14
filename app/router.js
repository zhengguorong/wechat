'use strict';

module.exports = app => {
  // 页面路由
  app.get('/', 'web.home.index');
  app.get('/login', 'web.user.login');
  app.get('/register', 'web.user.register');

  // 接口路由
  app.get('/api/user', 'api.user.find');
  app.post('/api/user/register', 'api.user.register');
  app.post('/api/user/login', 'api.user.login');
  app.get('/api/user/isLogin', 'api.user.isLogin');
};
