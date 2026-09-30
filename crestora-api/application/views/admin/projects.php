<div class="page-head">
  <h2><i class="fas fa-home"></i> Projects</h2>
  <a class="btn btn-new" href="<?php echo site_url('admin/project_create'); ?>"><i class="fas fa-plus"></i> Add New Project</a>
</div>
<?php if ( ! empty($msg)): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<div class="card">
<div class="table-wrap">
<table>
<tr><th>Image</th><th>Title</th><th>Category</th><th>Status</th><th>Active</th><th>Actions</th></tr>
<?php if (empty($rows)): ?>
<tr><td colspan="6">No projects found</td></tr>
<?php else: ?>
<?php foreach ($rows as $r):
  $item = json_decode($r['payload'], TRUE);
  $image = '';
  if (is_array($item)) {
    if ( ! empty($item['image'])) {
      $image = $item['image'];
    } elseif ( ! empty($item['gallery'][0])) {
      $image = $item['gallery'][0];
    }
  }
  $image = fieldform_asset_url($image);
?>
<tr>
  <td><?php if ($image !== ''): ?><img class="thumb" src="<?php echo html_escape($image); ?>" alt="" /><?php endif; ?></td>
  <td><?php echo html_escape($r['title']); ?></td>
  <td><?php
    $cats = crestora_decode_categories_json(isset($r['categories_json']) ? $r['categories_json'] : '');
    if ( ! $cats && ! empty($r['category'])) {
      $cats = array($r['category']);
    }
    $labels = crestora_category_labels();
    $parts = array();
    foreach ($cats as $cat_key) {
      $parts[] = isset($labels[$cat_key]) ? $labels[$cat_key] : $cat_key;
    }
    echo html_escape($parts ? implode(', ', $parts) : '—');
  ?></td>
  <td><?php echo html_escape($r['status']); ?></td>
  <td><?php echo $r['is_active'] ? 'Yes' : 'No'; ?></td>
  <td>
    <div class="row-actions">
      <a class="btn btn-ico btn-ico-edit" href="<?php echo site_url('admin/project/'.$r['code']); ?>" title="Edit"><i class="fas fa-edit"></i></a>
      <form method="post" action="<?php echo site_url('admin/project_delete/'.$r['code']); ?>" onsubmit="return confirm('Are you sure?');">
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
