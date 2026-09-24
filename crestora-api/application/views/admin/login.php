<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Crestora Admin Login</title>
<style>
body{font-family:Segoe UI,Arial,sans-serif;background:#0e1a2b;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0}
form{background:#fff;padding:28px;border-radius:12px;width:320px}
h1{font-size:20px;margin:0 0 16px}
input{width:100%;padding:10px;margin:6px 0 12px;box-sizing:border-box}
button{width:100%;background:#dfb743;border:0;padding:10px;font-weight:700;cursor:pointer}
.err{color:#a32020;font-size:14px}
</style>
</head>
<body>
<form method="post">
  <h1>Crestora Admin</h1>
  <?php if ($error): ?><p class="err"><?php echo html_escape($error); ?></p><?php endif; ?>
  <label>Username</label>
  <input name="username" required />
  <label>Password</label>
  <input type="password" name="password" required />
  <button type="submit">Sign in</button>
</form>
</body>
</html>
