<h2><?php echo html_escape($heading); ?></h2>
<p><a href="<?php echo site_url('admin/projects'); ?>">Back to projects</a></p>
<?php if ($msg): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card">
  <label><input type="checkbox" name="is_active" value="1" <?php echo $row['is_active'] ? 'checked' : ''; ?> style="width:auto" /> Active on site</label>
  <label>Slug
    <input name="slug" value="<?php echo html_escape($row['slug']); ?>" />
    <span class="file-note">Public address: /project/<?php echo html_escape($row['slug']); ?></span>
  </label>
  <?php
    $fields = is_array($item) ? $item : array();
    unset($fields['slug']);
    $project_types = array(
      'plots' => 'Plots',
      'villa' => 'Villas',
      'farmlands' => 'Farmlands',
      'commercial' => 'Commercial Lands',
      'gated-community' => 'Gated Communities',
    );
    fieldform_set_choices(array(
      'type' => $project_types,
      'category' => $project_types,
    ));
    fieldform_render($fields, 'payload');
  ?>
  <p><button type="submit">Save project</button></p>
</form>
