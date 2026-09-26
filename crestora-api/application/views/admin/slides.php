<div class="page-head">
  <h2>Slider</h2>
  <a class="btn btn-plus" href="<?php echo site_url('admin/slide_create'); ?>"><span class="plus" aria-hidden="true">+</span><span>Add slide</span></a>
</div>
<p class="lead">Home page slides. Each slide has its own background image.</p>
<?php if ( ! empty($msg)): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<?php if (empty($ready)): ?><p class="ok">The slider section is not in the database yet.</p><?php endif; ?>
<div class="card">
<div class="table-wrap">
<table>
<tr><th>Image</th><th>Title</th><th>Project</th><th>Location</th><th></th></tr>
<?php foreach ($rows as $r): ?>
<tr>
  <td><?php if ( ! empty($r['bgImage'])): ?><img class="thumb" src="<?php echo html_escape($r['bgImage']); ?>" alt="" /><?php endif; ?></td>
  <td><?php echo html_escape(isset($r['title']) ? $r['title'] : ''); ?></td>
  <td><?php echo html_escape(isset($r['projectName']) ? $r['projectName'] : ''); ?></td>
  <td><?php echo html_escape(isset($r['location']) ? $r['location'] : ''); ?></td>
  <td>
    <div class="row-actions">
      <a href="<?php echo site_url('admin/slide/'.rawurlencode($r['id'])); ?>">Edit</a>
      <form method="post" action="<?php echo site_url('admin/slide_delete/'.rawurlencode($r['id'])); ?>" onsubmit="return confirm('Delete this slide?');">
        <button type="submit" class="btn-delete">Delete</button>
      </form>
    </div>
  </td>
</tr>
<?php endforeach; ?>
</table>
</div>
</div>
