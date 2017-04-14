<html>
  <head>
    <title>注册</title>
  </head>
  <body>
    <div>
        <p>用户注册</p>
        <div>用户名：<input type="text" name="userId" id="userId"></div>
        <div>密码：<input type="password" name="password" id="password"></div>
        <div onClick="register()">注册</div>
    </div>
  </body>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script>
    var register = function () {
      var userId = $('#userId').val()
      var password = $('#password').val()
      $.post('/api/user/register', {
        userId: userId,
        password: password
      }, function (data) {
        console.log(data)
      })
    }
  </script>
</html>