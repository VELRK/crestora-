<?php
$CI =& get_instance();
$uri = trim($CI->uri->uri_string(), '/');
$sections = array();
if ($CI->session->userdata('admin_id')) {
	$sections = $CI->db->order_by('page', 'ASC')->order_by('sort_order', 'ASC')->get('sections')->result_array();
}
$home = array();
$pages = array();
foreach ($sections as $section) {
	if ($section['page'] === 'home' && in_array($section['section_key'], array('categories', 'locations'), TRUE)) {
		continue;
	}
	if ($section['page'] === 'home') {
		$home[] = $section;
	} else {
		$pages[] = $section;
	}
}
function nav_on($uri, $path) {
	return ($uri === trim($path, '/') || strpos($uri, trim($path, '/').'/') === 0) ? ' class="on"' : '';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title><?php echo html_escape($title); ?> | Crestora Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700&display=swap" rel="stylesheet" />
<style>
:root{--ink:#122033;--muted:#667085;--line:#e7e4dc;--paper:#f6f4ef;--card:#fff;--navy:#101b2d;--navy-2:#18263b;--gold:#c6a15a;--gold-2:#dfb743;--danger:#9b2c2c;--ok:#e8f6ea;--ok-ink:#1d6b32}
*{box-sizing:border-box}
body{margin:0;font-family:Inter,Segoe UI,sans-serif;background:var(--paper);color:var(--ink);line-height:1.45}
a{color:#8a6a12;text-decoration:none}
.shell{display:flex;min-height:100vh}
.sidebar{width:268px;flex:0 0 268px;background:linear-gradient(180deg,#0e1726 0%,#152238 100%);color:#fff;position:sticky;top:0;height:100vh;overflow:auto;display:flex;flex-direction:column;padding:22px 14px 18px}
.brand{display:flex;gap:12px;align-items:center;padding:4px 8px 18px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:14px}
.brand-mark{width:36px;height:36px;border-radius:10px;background:linear-gradient(145deg,var(--gold-2),#8d6b22);color:#1a1408;font-family:Montserrat,sans-serif;font-weight:700;display:grid;place-items:center}
.brand strong{display:block;font-family:Montserrat,sans-serif;font-size:15px;letter-spacing:.2px}
.brand span{display:block;color:#b7c0cc;font-size:12px;font-weight:500}
.nav{display:flex;flex-direction:column;gap:2px}
.sidebar .group{margin:16px 8px 6px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#9aa6b5;font-weight:600}
.sidebar a{display:block;color:#e7e1d4;padding:9px 12px;font-size:14px;font-weight:500;border-radius:10px}
.sidebar a.on,.sidebar a:hover{background:rgba(255,255,255,.08);color:#fff}
.sidebar a.on{box-shadow:inset 3px 0 0 var(--gold-2)}
.sidebar a.sub{margin-left:8px;font-size:13px;color:#c9c1ae;font-weight:400}
.sidebar .foot{margin-top:auto;padding-top:16px;border-top:1px solid rgba(255,255,255,.08)}
.who{padding:8px 12px 10px;color:#b7c0cc;font-size:12px}
.sidebar a.logout{color:#f0d48a}
.workspace{flex:1;min-width:0;padding:28px 32px 48px}
.topbar{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:18px}
main{max-width:1100px}
main h2{font-family:Montserrat,sans-serif;font-size:28px;margin:0 0 6px;letter-spacing:-.3px}
main h3{font-family:Montserrat,sans-serif;font-size:16px;margin:0 0 12px}
.lead{margin:0 0 18px;color:var(--muted);font-size:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px 18px 8px;margin-bottom:16px;box-shadow:0 10px 30px rgba(16,27,45,.04)}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}
.stat{background:#fff;border:1px solid var(--line);border-radius:16px;padding:16px 18px;box-shadow:0 10px 30px rgba(16,27,45,.04);display:block;color:inherit}
.stat span{display:block;color:var(--muted);font-size:13px;font-weight:600}
.stat strong{display:block;margin-top:8px;font-family:Montserrat,sans-serif;font-size:30px;letter-spacing:-.4px}
.stat:hover{border-color:#d7c28a}
.table-wrap{overflow:auto}
table{width:100%;border-collapse:collapse}
th,td{text-align:left;padding:12px 10px;border-bottom:1px solid #f0ece4;font-size:14px;vertical-align:middle}
th{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:600}
tr:last-child td{border-bottom:0}
input,textarea,select{width:100%;padding:10px 12px;border:1px solid #ddd6c8;border-radius:10px;background:#fcfbf8;font:inherit;color:inherit;margin-top:6px}
input:focus,textarea:focus,select:focus{outline:2px solid rgba(198,161,90,.45);border-color:var(--gold);background:#fff}
input[type=checkbox]{width:auto;margin:0 8px 0 0;accent-color:#8a6a12}
label{display:block;font-size:13px;font-weight:600;margin:14px 0}
fieldset.group{border:1px solid var(--line);border-radius:14px;margin:16px 0;padding:8px 14px 12px;background:#fcfbf8}
fieldset.item{border:1px dashed #e4dccb;border-radius:12px;margin:12px 0;padding:8px 12px;background:#fff}
legend{font-size:13px;font-weight:700;color:#8a6a12;padding:0 6px}
button,.btn{display:inline-flex;align-items:center;justify-content:center;background:var(--navy);color:#fff;border:0;padding:10px 16px;border-radius:10px;cursor:pointer;font:inherit;font-weight:600;font-size:14px}
.page-head{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:16px}
.page-head h2{margin:0}
.btn-add,.btn-plus{background:#fff;color:#1c1508;border:1px dashed #d7c28a;gap:8px;padding:6px 14px 6px 6px}
.btn-plus:hover,.btn-add:hover{background:#fffaf0;border-style:solid}
.plus{width:30px;height:30px;border-radius:50%;background:linear-gradient(180deg,#e2c36a,#b8923e);display:grid;place-items:center;font-size:22px;line-height:1;font-weight:700}
.add-row{margin:4px 0 8px}
.item-row{display:flex;gap:10px;align-items:flex-end}
.item-row > label{flex:1;margin:8px 0}
fieldset.item{position:relative;padding-right:52px}
fieldset.item > .btn-remove{position:absolute;top:12px;right:12px}
.btn-delete{background:#fff;color:var(--danger);border:1px solid #f0d0d0;padding:7px 12px}
.btn-delete:hover{background:#fff5f5}
.btn-remove{width:32px;height:32px;min-width:32px;padding:0;border-radius:50%;background:#fff;color:var(--danger);border:1px solid #f0d0d0;font-size:20px;line-height:1}
.btn-remove:hover{background:#fff5f5}
.delete-flag{color:var(--danger);font-weight:600}
.row-actions{display:flex;gap:10px;align-items:center}
.row-actions form{margin:0}
.row-actions a{font-weight:600}
.ok{background:var(--ok);color:var(--ok-ink);padding:12px 14px;border-radius:12px;border:1px solid #cfe8d4}
.img-preview{display:block;width:180px;height:112px;object-fit:cover;border-radius:12px;border:1px solid var(--line);margin:8px 0;background:#f7f4ee}
.thumb{width:72px;height:48px;object-fit:cover;border-radius:8px;border:1px solid var(--line);background:#f7f4ee}
.file-input{padding:8px;background:#fff}
.file-note{display:block;font-weight:500;color:var(--muted);font-size:12px;margin-top:6px}
@media(max-width:980px){.stats{grid-template-columns:1fr 1fr}}
@media(max-width:800px){.shell{display:block}.sidebar{width:auto;height:auto;position:relative}.workspace{padding:18px}}
</style>
</head>
<body>
<div class="shell">
<aside class="sidebar">
  <div class="brand">
    <div class="brand-mark">C</div>
    <div>
      <strong>Crestora</strong>
      <span>Admin studio</span>
    </div>
  </div>
  <nav class="nav">
    <a href="<?php echo site_url('admin'); ?>"<?php echo ($uri === 'admin') ? ' class="on"' : ''; ?>>Dashboard</a>
    <div class="group">Home</div>
    <?php foreach ($home as $section): ?>
      <a class="sub<?php echo ($uri === 'admin/section/'.$section['id']) ? ' on' : ''; ?>" href="<?php echo site_url('admin/section/'.$section['id']); ?>"><?php echo html_escape($section['title']); ?></a>
    <?php endforeach; ?>
    <div class="group">Content</div>
    <a href="<?php echo site_url('admin/projects'); ?>"<?php echo nav_on($uri, 'admin/projects'); ?>>Projects</a>
    <a href="<?php echo site_url('admin/blogs'); ?>"<?php echo nav_on($uri, 'admin/blogs'); ?>>Blogs</a>
    <a href="<?php echo site_url('admin/categories'); ?>"<?php echo ($uri === 'admin/categories' || strpos($uri, 'admin/category') === 0) ? ' class="on"' : ''; ?>>Categories</a>
    <a href="<?php echo site_url('admin/locations'); ?>"<?php echo ($uri === 'admin/locations' || strpos($uri, 'admin/location') === 0) ? ' class="on"' : ''; ?>>Locations</a>
    <?php foreach ($pages as $section): ?>
      <a class="sub<?php echo ($uri === 'admin/section/'.$section['id']) ? ' on' : ''; ?>" href="<?php echo site_url('admin/section/'.$section['id']); ?>"><?php echo html_escape($section['title']); ?></a>
    <?php endforeach; ?>
    <div class="group">Site</div>
    <a href="<?php echo site_url('admin/settings'); ?>"<?php echo nav_on($uri, 'admin/settings'); ?>>Settings</a>
    <a href="<?php echo site_url('admin/contacts'); ?>"<?php echo nav_on($uri, 'admin/contacts'); ?>>Contact forms</a>
    <a href="<?php echo site_url('admin/visits'); ?>"<?php echo nav_on($uri, 'admin/visits'); ?>>Site visits</a>
  </nav>
  <div class="foot">
    <div class="who"><?php echo html_escape($CI->session->userdata('admin_name') ?: 'Signed in'); ?></div>
    <a class="logout" href="<?php echo site_url('admin/logout'); ?>">Log out</a>
  </div>
</aside>
<div class="workspace">
<main>
<?php echo $body; ?>
</main>
</div>
</div>
</body>
</html>
