<h2>Enquiries</h2>
<div class="card">
<table>
<tr><th>When</th><th>Name</th><th>Phone</th><th>Email</th><th>Message</th></tr>
<?php foreach ($enquiries as $r): ?>
<tr>
  <td><?php echo html_escape($r['created_at']); ?></td>
  <td><?php echo html_escape($r['name']); ?></td>
  <td><?php echo html_escape($r['phone']); ?></td>
  <td><?php echo html_escape($r['email']); ?></td>
  <td><?php echo html_escape($r['message']); ?></td>
</tr>
<?php endforeach; ?>
</table>
</div>
<h2>Site visits</h2>
<div class="card">
<table>
<tr><th>When</th><th>Name</th><th>Phone</th><th>Project</th><th>Date</th></tr>
<?php foreach ($visits as $r): ?>
<tr>
  <td><?php echo html_escape($r['created_at']); ?></td>
  <td><?php echo html_escape($r['name']); ?></td>
  <td><?php echo html_escape($r['phone']); ?></td>
  <td><?php echo html_escape($r['project_name']); ?></td>
  <td><?php echo html_escape($r['visit_date']); ?></td>
</tr>
<?php endforeach; ?>
</table>
</div>
