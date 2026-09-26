<h2>Contact forms</h2>
<p class="lead">Messages sent from the contact form.</p>
<?php if ( ! empty($msg)): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<div class="card">
<div class="table-wrap">
<table>
<tr><th>When</th><th>Name</th><th>Phone</th><th>Email</th><th>Project</th><th>Message</th><th></th></tr>
<?php foreach ($rows as $r): ?>
<tr>
  <td><?php echo html_escape($r['created_at']); ?></td>
  <td><?php echo html_escape($r['name']); ?></td>
  <td><?php echo html_escape($r['phone']); ?></td>
  <td><?php echo html_escape($r['email']); ?></td>
  <td><?php echo html_escape(isset($r['project_name']) ? $r['project_name'] : ''); ?></td>
  <td><?php echo html_escape($r['message']); ?></td>
  <td>
    <form method="post" action="<?php echo site_url('admin/contact_delete/'.$r['id']); ?>" onsubmit="return confirm('Delete this enquiry?');">
      <button type="submit" class="btn-delete">Delete</button>
    </form>
  </td>
</tr>
<?php endforeach; ?>
</table>
</div>
</div>
