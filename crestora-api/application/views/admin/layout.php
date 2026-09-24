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
<style>
body{margin:0;font-family:Segoe UI,Arial,sans-serif;background:#f4f1ea;color:#1c2430}
a{color:#8a6a12;text-decoration:none}
.shell{display:flex;min-height:100vh}
.sidebar{width:260px;flex:0 0 260px;background:#0e1a2b;color:#fff;padding:18px 0 28px;position:sticky;top:0;height:100vh;overflow:auto}
.sidebar strong{display:block;padding:0 18px 14px;font-size:16px;letter-spacing:.4px}
.sidebar .group{margin:8px 0 4px;padding:10px 18px 4px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#dfb743}
.sidebar a{display:block;color:#e8e2d4;padding:8px 18px;font-size:14px}
.sidebar a.on,.sidebar a:hover{background:#1a2c44;color:#fff}
.sidebar a.sub{padding-left:28px;font-size:13px;color:#c9c1ae}
main{flex:1;padding:24px;max-width:980px}
.card{background:#fff;border:1px solid #e6dfcf;border-radius:10px;padding:16px;margin-bottom:16px}
table{width:100%;border-collapse:collapse}
th,td{text-align:left;padding:8px;border-bottom:1px solid #eee;font-size:14px}
input,textarea,select{width:100%;padding:8px;border:1px solid #d9d1bf;border-radius:6px;box-sizing:border-box;margin-top:4px}
label{display:block;font-size:13px;font-weight:600;margin:10px 0}
fieldset.group{border:1px solid #e6dfcf;border-radius:8px;margin:14px 0;padding:8px 12px}
fieldset.item{border:1px dashed #e6dfcf;margin:10px 0;padding:8px 12px}
legend{font-size:13px;font-weight:700;color:#8a6a12;padding:0 6px}
button,.btn{background:#0e1a2b;color:#fff;border:0;padding:10px 16px;border-radius:6px;cursor:pointer}
.btn-add{background:#8a6a12}
.btn-delete{background:#8d2b2b}
.delete-flag{color:#8d2b2b;font-weight:600}
.row-actions{display:flex;gap:8px;align-items:center}
.row-actions form{margin:0}
.ok{background:#e8f6ea;padding:8px 12px;border-radius:6px}
.img-preview{display:block;width:160px;height:100px;object-fit:cover;border-radius:8px;border:1px solid #e6dfcf;margin:6px 0;background:#f7f4ee}
.file-input{padding:6px}
.file-note{display:block;font-weight:400;color:#6b6456;font-size:12px;margin-top:4px}
@media(max-width:800px){.shell{display:block}.sidebar{width:auto;height:auto;position:relative}}
</style>
</head>
<body>
<div class="shell">
<aside class="sidebar">
  <strong>Crestora Admin</strong>
  <a href="<?php echo site_url('admin'); ?>"<?php echo ($uri === 'admin') ? ' class="on"' : ''; ?>>Dashboard</a>
  <div class="group">Home</div>
  <?php foreach ($home as $section): ?>
    <a class="sub<?php echo ($uri === 'admin/section/'.$section['id']) ? ' on' : ''; ?>" href="<?php echo site_url('admin/section/'.$section['id']); ?>"><?php echo html_escape($section['title']); ?></a>
  <?php endforeach; ?>
  <div class="group">Content</div>
  <a href="<?php echo site_url('admin/projects'); ?>"<?php echo nav_on($uri, 'admin/projects'); ?>>Projects</a>
  <a href="<?php echo site_url('admin/blogs'); ?>"<?php echo nav_on($uri, 'admin/blogs'); ?>>Blogs</a>
  <?php foreach ($pages as $section): ?>
    <a class="sub<?php echo ($uri === 'admin/section/'.$section['id']) ? ' on' : ''; ?>" href="<?php echo site_url('admin/section/'.$section['id']); ?>"><?php echo html_escape($section['title']); ?></a>
  <?php endforeach; ?>
  <div class="group">Site</div>
  <a href="<?php echo site_url('admin/settings'); ?>"<?php echo nav_on($uri, 'admin/settings'); ?>>Settings</a>
  <a href="<?php echo site_url('admin/leads'); ?>"<?php echo nav_on($uri, 'admin/leads'); ?>>Leads</a>
  <a href="<?php echo site_url('admin/logout'); ?>">Logout</a>
</aside>
<main>
<?php echo $body; ?>
</main>
</div>
</body>
</html>
