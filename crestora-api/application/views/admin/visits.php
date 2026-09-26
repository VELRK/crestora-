<h2>Site visits</h2>
<p class="lead">Site visit requests.</p>
<?php if ( ! empty($msg)): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<div class="card">
<div class="table-wrap">
<table>
<tr><th>When</th><th>Name</th><th>Phone</th><th>Email</th><th>Project</th><th>Visit date</th><th>Message</th><th></th></tr>
<?php foreach ($rows as $r): ?>
<tr>
  <td><?php echo html_escape($r['created_at']); ?></td>
  <td><?php echo html_escape($r['name']); ?></td>
  <td><?php echo html_escape($r['phone']); ?></td>
  <td><?php echo html_escape(isset($r['email']) ? $r['email'] : ''); ?></td>
  <td><?php echo html_escape($r['project_name']); ?></td>
  <td><?php echo html_escape($r['visit_date']); ?></td>
  <td><?php echo html_escape(isset($r['message']) ? $r['message'] : ''); ?></td>
  <td>
    <form method="post" action="<?php echo site_url('admin/visit_delete/'.$r['id']); ?>" onsubmit="return confirm('Delete this site visit request?');">
      <button type="submit" class="btn-delete">Delete</button>
    </form>
  </td>
</tr>
<?php endforeach; ?>
</table>
</div>
</div>
