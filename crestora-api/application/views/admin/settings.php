<h2>Site settings</h2>
<?php if ($msg): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card">
<?php foreach ($settings as $row): ?>
  <label><?php echo html_escape(ucwords(str_replace('_', ' ', $row['setting_key']))); ?></label>
  <?php if ($row['setting_key'] === 'logo' || preg_match('/\.(jpe?g|png|gif|webp)(\?.*)?$/i', $row['setting_value'])): ?>
    <?php if ($row['setting_value']): ?><img class="img-preview" src="<?php echo html_escape($row['setting_value']); ?>" alt="" /><?php endif; ?>
    <input type="hidden" name="settings[<?php echo html_escape($row['setting_key']); ?>]" value="<?php echo html_escape($row['setting_value']); ?>" />
    <input class="file-input" type="file" accept="image/jpeg,image/png,image/gif,image/webp" name="upload[<?php echo html_escape($row['setting_key']); ?>]" />
  <?php else: ?>
    <input name="settings[<?php echo html_escape($row['setting_key']); ?>]" value="<?php echo html_escape($row['setting_value']); ?>" />
  <?php endif; ?>
<?php endforeach; ?>
  <p><button type="submit">Save settings</button></p>
</form>
