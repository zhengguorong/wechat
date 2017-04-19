'use strict';
const jwt = require('jsonwebtoken');
describe('test/app/controller/api/user.test.js', () => {
  describe('用户注册', () => {
    it('密码为空', () => {
      return request(app.callback())
        .post('/api/user/register')
        .send({
          userId: 'test',
        })
        .expect(400)
        .expect('用户名或者密码不能为空');
    });

    it('用户名为空', () => {
      return request(app.callback())
        .post('/api/user/register')
        .send({
          password: 'test',
        })
        .expect(400)
        .expect('用户名或者密码不能为空');
    });
    it('注册成功', () => {
      return request(app.callback())
        .post('/api/user/register')
        .send({
          userId: 'test',
          password: 'test',
        })
        .expect(200);
    });
    it('使用相同userId注册', () => {
      return request(app.callback())
        .post('/api/user/register')
        .send({
          userId: 'test',
          password: 'test',
        })
        .expect(400)
        .expect('用户已存在');
    });

  });
  describe('用户登录', () => {
    it('密码为空', () => {
      return request(app.callback())
        .post('/api/user/login')
        .send({
          userId: 'test',
        })
        .expect(400)
        .expect('用户名或者密码不能为空');
    });

    it('用户名为空', () => {
      return request(app.callback())
        .post('/api/user/login')
        .send({
          password: 'test',
        })
        .expect(400)
        .expect('用户名或者密码不能为空');
    });

    it('登录成功', () => {
      return request(app.callback())
        .post('/api/user/login')
        .send({
          userId: 'test',
          password: 'test',
        })
        .expect(200);
    });
    it('使用未注册的用户名登录', () => {
      return request(app.callback())
        .post('/api/user/login')
        .send({
          userId: '123456',
          password: 'test',
        })
        .expect(400)
        .expect('用户名或密码错误');
    });
    it('使用错误的密码登录', () => {
      return request(app.callback())
        .post('/api/user/login')
        .send({
          userId: 'test',
          password: '123456',
        })
        .expect(400)
        .expect('用户名或密码错误');
    });
    describe('获取用户信息', () => {
      it('不带token获取用户信息', () => {
        return request(app.callback())
        .get('/api/user')
        .expect(401)
        .expect('token不能为空');
      });
      it('使用错误token获取用户信息', () => {
        return request(app.callback())
        .get('/api/user')
        .set('authorization', '123')
        .expect(401)
        .expect('token无效');
      });
      it('使用正确token获取用户信息', () => {
        return request(app.callback())
        .get('/api/user')
        .set('authorization', 'Bearer ' + jwt.sign({ userId: 'test' }, app.config.jwtSecret, { expiresIn: '7d' }))
        .expect(200)
        .expect(function(res) {
          if (!res.body.userId) {
            throw new Error('user is empty');
          }
        });
      });
      it('使用过期token获取用户信息', () => {
        return request(app.callback())
        .get('/api/user')
        .set('authorization', 'Bearer ' + jwt.sign({ userId: 'test' }, app.config.jwtSecret, { expiresIn: '0' }))
        .expect(401);
      });
      it('使用即将过期token获取用户信息', () => {
        return request(app.callback())
        .get('/api/user')
        .set('authorization', 'Bearer ' + jwt.sign({ userId: 'test' }, app.config.jwtSecret, { expiresIn: 100 }))
        .expect(200)
        .expect(function(res) {
          if (!res.header.authorization) {
            throw new Error('token生成异常');
          }
        });
      });
    });
  });
  after(function* () {
    const ctx = app.mockContext();
    yield ctx.service.user.delete('test');
  });
});
