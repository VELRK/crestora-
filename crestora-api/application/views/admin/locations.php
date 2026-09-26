<div class="page-head">
  <h2><i class="fas fa-map-marker-alt"></i> Locations</h2>
  <a class="btn btn-new" href="<?php echo site_url('admin/location_create'); ?>"><i class="fas fa-plus"></i> Add New Location</a>
</div>
<?php if ( ! empty($msg)): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<?php if (empty($ready)): ?><p class="ok">The locations section is not in the database yet.</p><?php endif; ?>
<div class="card">
<div class="table-wrap">
<table>
<tr><th>Image</th><th>Name</th><th>Key</th><th>Corridor</th><th>Actions</th></tr>
<?php if (empty($rows)): ?>
<tr><td colspan="5">No locations found</td></tr>
<?php else: ?>
<?php foreach ($rows as $r): ?>
<tr>
  <td><?php if ( ! empty($r['image'])): ?><img class="thumb" src="<?php echo html_escape($r['image']); ?>" alt="" /><?php endif; ?></td>
  <td><?php echo html_escape(isset($r['name']) ? $r['name'] : ''); ?></td>
  <td><?php echo html_escape(isset($r['cityKey']) ? $r['cityKey'] : ''); ?></td>
  <td><?php echo html_escape(isset($r['state']) ? $r['state'] : ''); ?></td>
  <td>
    <div class="row-actions">
      <a class="btn btn-ico btn-ico-edit" href="<?php echo site_url('admin/location/'.$r['id']); ?>" title="Edit"><i class="fas fa-edit"></i></a>
      <form method="post" action="<?php echo site_url('admin/location_delete/'.$r['id']); ?>" onsubmit="return confirm('Are you sure?');">
        <button type="submit" class="btn-ico btn-ico-delete" title="Delete"><i class="fas fa-trash"></i></button>
      </form>
    </div>
  </td>
</tr>
<?php endforeach; ?>
<?php endif; ?>
</table>
</div>
</div>
