<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Crestora Admin Login</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700&display=swap" rel="stylesheet" />
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;grid-template-columns:1.1fr .9fr;font-family:Inter,Segoe UI,sans-serif;background:#0e7a3d;color:#123024}
.panel{padding:64px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff;background:linear-gradient(160deg,#0b6b34,#14924a)}
.mark{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:#fff;color:#0e7a3d;font-family:Montserrat,sans-serif;font-weight:700;margin-bottom:28px}
.panel h1{font-family:Montserrat,sans-serif;font-size:42px;line-height:1.1;margin:0 0 12px;max-width:460px}
.panel p{margin:0;max-width:420px;color:rgba(255,255,255,.88);font-size:16px}
.gate{display:flex;align-items:center;justify-content:center;background:#fff;padding:32px}
form{width:min(400px,100%);background:#fff;border:1px solid #d7e6dc;border-radius:20px;padding:28px;box-shadow:0 20px 50px rgba(14,122,61,.08)}
form h2{font-family:Montserrat,sans-serif;margin:0 0 6px;font-size:24px}
.hint{margin:0 0 18px;color:#5c6f64;font-size:14px}
label{display:block;font-size:13px;font-weight:600;margin:12px 0 0}
input{width:100%;margin-top:6px;padding:12px;border:1px solid #d3e4d8;border-radius:12px;background:#fff;font:inherit}
input:focus{outline:2px solid rgba(14,122,61,.28);border-color:#0e7a3d}
button{width:100%;margin-top:18px;background:#0e7a3d;color:#fff;border:0;border-radius:12px;padding:12px;font:inherit;font-weight:600;cursor:pointer}
.err{background:#fff5f5;color:#9b2c2c;border:1px solid #f0d0d0;border-radius:12px;padding:10px 12px;font-size:14px}
@media(max-width:860px){body{grid-template-columns:1fr}.panel{padding:36px 24px 28px}.panel h1{font-size:32px}}
</style>
</head>
<body>
<section class="panel">
  <div class="mark">C</div>
  <h1>Manage the site from one studio.</h1>
  <p>Update projects, blogs, homepage sections, and incoming site visits.</p>
</section>
<section class="gate">
  <form method="post">
    <h2>Sign in</h2>
    <p class="hint">Crestora Properties admin</p>
    <?php if ($error): ?><p class="err"><?php echo html_escape($error); ?></p><?php endif; ?>
    <label>Username</label>
    <input name="username" required autocomplete="username" />
    <label>Password</label>
    <input type="password" name="password" required autocomplete="current-password" />
    <button type="submit">Continue</button>
  </form>
</section>
</body>
</html>
