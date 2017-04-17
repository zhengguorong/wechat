'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1492054139103_7031';
  config.jwtSecret = 'zhengguorong';
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1/egg',
    options: {},
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.middleware = [ 'errorHandler' ]; // 使用koa的中间件
  config.auth = {
    test: 'tst',
  };
  config.errorHandler = {
    match: '/api',
  };
  return config;
};
