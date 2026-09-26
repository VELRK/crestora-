<h2><?php echo html_escape($heading); ?></h2>
<p><a href="<?php echo site_url('admin/projects'); ?>">Back to projects</a></p>
<?php if ($msg): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<?php if ( ! empty($error)): ?><p class="form-error"><?php echo html_escape($error); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card project-form">
  <?php
    $fields = is_array($item) ? $item : array();
    $title_value = isset($fields['title']) ? $fields['title'] : '';
    $location_value = isset($fields['location']) ? $fields['location'] : '';
    unset($fields['slug'], $fields['title'], $fields['location']);
  ?>
  <div class="form-grid">
    <label>Title <span class="req">*</span>
      <input name="payload[title]" value="<?php echo html_escape($title_value); ?>" required data-slug-source />
    </label>
    <label class="span-2">Slug <span class="req">*</span>
      <span class="url-field">
        <span class="url-prefix">/project/</span>
        <input name="slug" value="<?php echo html_escape($row['slug']); ?>" required data-slug-target />
      </span>
      <span class="file-note">Updates from the title. Type here if you want a different slug.</span>
    </label>
    <label>Location <span class="req">*</span>
      <input name="payload[location]" value="<?php echo html_escape($location_value); ?>" required />
    </label>
    <label>Active on site
      <span class="check-field"><input type="checkbox" name="is_active" value="1" <?php echo $row['is_active'] ? 'checked' : ''; ?> /><span>Yes</span></span>
    </label>
    <label>Sort order
      <input name="sort_order" value="<?php echo (int) $row['sort_order']; ?>" />
    </label>
  </div>
  <?php
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
