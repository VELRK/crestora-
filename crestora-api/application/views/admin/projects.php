<h2>Projects</h2>
<?php if ( ! empty($msg)): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<p><a class="btn" href="<?php echo site_url('admin/project_create'); ?>">Add project</a></p>
<div class="card">
<table>
<tr><th>Title</th><th>Slug</th><th>Category</th><th>Status</th><th>Active</th><th></th></tr>
<?php foreach ($rows as $r): ?>
<tr>
  <td><?php echo html_escape($r['title']); ?></td>
  <td><?php echo html_escape($r['slug']); ?></td>
  <td><?php echo html_escape($r['category']); ?></td>
  <td><?php echo html_escape($r['status']); ?></td>
  <td><?php echo $r['is_active'] ? 'Yes' : 'No'; ?></td>
  <td>
    <div class="row-actions">
      <a href="<?php echo site_url('admin/project/'.$r['code']); ?>">Edit</a>
      <form method="post" action="<?php echo site_url('admin/project_delete/'.$r['code']); ?>" onsubmit="return confirm('Delete this project?');">
        <button type="submit" class="btn-delete">Delete</button>
      </form>
    </div>
  </td>
</tr>
<?php endforeach; ?>
</table>
</div>
