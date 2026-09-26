<h2><?php echo html_escape($heading); ?></h2>
<p><a href="<?php echo site_url('admin/projects'); ?>">Back to projects</a></p>
<?php if ($msg): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card project-form">
  <div class="form-grid">
    <label>Active on site
      <span class="check-field"><input type="checkbox" name="is_active" value="1" <?php echo $row['is_active'] ? 'checked' : ''; ?> /><span>Yes</span></span>
    </label>
    <label>Sort order
      <input name="sort_order" value="<?php echo (int) $row['sort_order']; ?>" />
    </label>
    <label class="span-2">Slug
      <span class="url-field">
        <span class="url-prefix">/project/</span>
        <input name="slug" value="<?php echo html_escape($row['slug']); ?>" />
      </span>
      <span class="file-note">The /project/ part stays fixed. Type the slug after it.</span>
    </label>
  </div>
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
      'status' => array('ongoing' => 'Ongoing', 'upcoming' => 'Upcoming', 'completed' => 'Completed'),
    ));
    fieldform_render($fields, 'payload');
  ?>
  <p><button type="submit">Save project</button></p>
</form>
