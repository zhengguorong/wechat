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
  app.post('/api/user', auth.isLogin, 'api.user.getUser');
};
