'use strict';

describe('UserService', () => {
  let ctx;
  before(() => {
    ctx = app.mockContext();
  });
  describe('register', () => {
    const userInfo = { userId: 'test', password: 'test' };
    it('注册用户', function* () {
      const user = yield ctx.service.user.register(userInfo);
      assert(typeof user === 'object');
    });
    it('使用已存在用户名注册', function* () {
      try {
        yield ctx.service.user.register(userInfo);
      } catch (err) {
        assert(err.message === '用户已存在');
      }
    });
  });
  describe('hasRegister', () => {
    it('使用已注册账号验证', function* () {
      const result = yield ctx.service.user.hasRegister('test');
      assert.ok(result);
    });
    it('使用未注册账号验证', function* () {
      const result = yield ctx.service.user.hasRegister('test2');
      assert.ok(!result);
    });
  });
  describe('checkUser', () => {
    it('使用正确的密码验证', function* () {
      const result = yield ctx.service.user.checkUser('test', '098f6bcd4621d373cade4e832627b4f6');
      assert.ok(result);
    });
    it('使用错误的密码验证', function* () {
      const result = yield ctx.service.user.checkUser('test', '2333');
      assert.ok(!result);
    });
  });
  describe('login', () => {
    const userInfo = { userId: 'test', password: 'test' };
    it('正常登录', function* () {
      const token = yield ctx.service.user.login(userInfo);
      assert(token !== null);
    });
    it('使用错误的密码登录', function* () {
      const user = { userId: 'test', password: '123456' };
      try {
        yield ctx.service.user.login(user);
      } catch (err) {
        assert(err.message === '用户名或密码错误');
      }
    });
  });
  describe('getUserById', () => {
    it('获取用户信息', function* () {
      const user = yield ctx.service.user.getUserById('test');
      assert(user !== null);
    });
    it('获取不存在用户信息', function* () {
      try {
        yield ctx.service.user.getUserById('test1');
      } catch (err) {
        assert(err.message === '用户不存在');
      }
    });
  });
  after(function* () {
    yield ctx.service.user.delete('test');
  });
});
