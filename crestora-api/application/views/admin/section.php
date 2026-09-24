<h2>Edit <?php echo html_escape($row['page'].' / '.$row['section_key']); ?></h2>
<?php if ($msg): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card">
  <label>Section title</label>
  <input name="title" value="<?php echo html_escape($row['title']); ?>" />
  <label><input type="checkbox" name="is_visible" value="1" <?php echo $row['is_visible'] ? 'checked' : ''; ?> style="width:auto" /> Visible on site</label>
  <?php
    $payload = json_decode($row['payload'], TRUE);
    if (is_array($payload)) {
      fieldform_render($payload, 'payload');
    } else {
      echo '<label>Content<textarea name="payload" rows="16">'.html_escape($row['payload']).'</textarea></label>';
    }
  ?>
  <p><button type="submit">Save section</button></p>
</form>
