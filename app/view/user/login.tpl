<html>
  <head>
    <title>登录</title>
  </head>
  <body>
    <div>
        <p>用户登录</p>
        <div>用户名：<input type="text" name="userId" id="userId"></div>
        <div>密码：<input type="password" name="password" id="password"></div>
        <div onClick="login()">登录</div>
    </div>
  </body>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script>
    var login = function () {
      var userId = $('#userId').val()
      var password = $('#password').val()
      $.post('/api/user/login', {
        userId: userId,
        password: password
      }, function (data) {
        console.log(data)
      })
    }
  </script>
</html>