<h2>Locations</h2>
<p class="lead">Home location cards. Each location can have its own image.</p>
<?php if ( ! empty($msg)): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<?php if (empty($ready)): ?><p class="ok">The locations section is not in the database yet.</p><?php endif; ?>
<p><a class="btn btn-add" href="<?php echo site_url('admin/location_create'); ?>">Add location</a></p>
<div class="card">
<div class="table-wrap">
<table>
<tr><th>Image</th><th>Name</th><th>Key</th><th>Corridor</th><th></th></tr>
<?php foreach ($rows as $r): ?>
<tr>
  <td><?php if ( ! empty($r['image'])): ?><img class="thumb" src="<?php echo html_escape($r['image']); ?>" alt="" /><?php endif; ?></td>
  <td><?php echo html_escape(isset($r['name']) ? $r['name'] : ''); ?></td>
  <td><?php echo html_escape(isset($r['cityKey']) ? $r['cityKey'] : ''); ?></td>
  <td><?php echo html_escape(isset($r['state']) ? $r['state'] : ''); ?></td>
  <td>
    <div class="row-actions">
      <a href="<?php echo site_url('admin/location/'.$r['id']); ?>">Edit</a>
      <form method="post" action="<?php echo site_url('admin/location_delete/'.$r['id']); ?>" onsubmit="return confirm('Delete this location?');">
        <button type="submit" class="btn-delete">Delete</button>
      </form>
    </div>
  </td>
</tr>
<?php endforeach; ?>
</table>
</div>
</div>
