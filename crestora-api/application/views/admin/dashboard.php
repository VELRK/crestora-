<h2>Dashboard</h2>
<p class="lead">Content, projects, and leads for the public site.</p>
<div class="stats">
  <a class="stat" href="<?php echo site_url('admin/projects'); ?>"><span>Projects</span><strong><?php echo (int) $projects; ?></strong></a>
  <a class="stat" href="<?php echo site_url('admin/blogs'); ?>"><span>Blogs</span><strong><?php echo (int) $blogs; ?></strong></a>
  <a class="stat" href="<?php echo site_url('admin/contacts'); ?>"><span>Contact forms</span><strong><?php echo (int) $enquiries; ?></strong></a>
  <a class="stat" href="<?php echo site_url('admin/visits'); ?>"><span>Site visits</span><strong><?php echo (int) $visits; ?></strong></a>
</div>
<div class="card">
<h3>Page sections</h3>
<div class="table-wrap">
<table>
<tr><th>Page</th><th>Home API</th><th>Module</th><th>Visible</th><th></th></tr>
<?php foreach ($sections as $s): ?>
<tr>
  <td><?php echo html_escape($s['page']); ?></td>
  <td><?php echo html_escape($s['page'] === 'home' ? 'home.'.$s['section_key'] : $s['section_key']); ?></td>
  <td><?php echo html_escape($s['title']); ?></td>
  <td><?php echo $s['is_visible'] ? 'Yes' : 'No'; ?></td>
  <td><a href="<?php echo site_url('admin/section/'.$s['id']); ?>">Edit</a></td>
</tr>
<?php endforeach; ?>
</table>
</div>
</div>
