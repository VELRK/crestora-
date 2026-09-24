<h2>Dashboard</h2>
<div class="card">Projects: <?php echo (int) $projects; ?> · Blogs: <?php echo (int) $blogs; ?> · Enquiries: <?php echo (int) $enquiries; ?> · Site visits: <?php echo (int) $visits; ?></div>
<div class="card">
<h3>Page sections</h3>
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
