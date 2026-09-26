<h2><?php echo html_escape($heading); ?></h2>
<p><a href="<?php echo site_url('admin/projects'); ?>">Back to projects</a></p>
<?php if ($msg): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<?php if ( ! empty($error)): ?><p class="form-error"><?php echo html_escape($error); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card project-form">
  <?php
    $fields = is_array($item) ? $item : array();
    $title_value = isset($fields['title']) ? $fields['title'] : '';
    $location_value = isset($fields['location']) ? $fields['location'] : '';
    $locality_value = isset($fields['locality']) ? (string) $fields['locality'] : '';
    $category_value = isset($fields['category']) ? (string) $fields['category'] : '';
    $category_labels = crestora_category_labels();
    $location_choices = crestora_location_choices();
    unset($fields['slug'], $fields['title'], $fields['location'], $fields['locality'], $fields['category'], $fields['type'], $fields['typeName']);
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
      <select name="payload[location]" required>
        <option value="">Select location</option>
        <?php
          $location_known = FALSE;
          foreach ($location_choices as $loc):
            $selected = (strcasecmp($loc['name'], $location_value) === 0) || ($location_value === '' && $locality_value !== '' && $loc['key'] === $locality_value);
            if ($selected) {
              $location_known = TRUE;
            }
        ?>
          <option value="<?php echo html_escape($loc['name']); ?>" <?php echo $selected ? 'selected' : ''; ?>><?php echo html_escape($loc['name']); ?></option>
        <?php endforeach; ?>
        <?php if ($location_value !== '' && ! $location_known): ?>
          <option value="<?php echo html_escape($location_value); ?>" selected><?php echo html_escape($location_value); ?></option>
        <?php endif; ?>
      </select>
    </label>
    <label>Category <span class="req">*</span>
      <select name="payload[category]" required>
        <option value="">Select category</option>
        <?php foreach ($category_labels as $key => $label): ?>
          <option value="<?php echo html_escape($key); ?>" <?php echo ((string) $key === $category_value) ? 'selected' : ''; ?>><?php echo html_escape($label); ?></option>
        <?php endforeach; ?>
        <?php if ($category_value !== '' && ! isset($category_labels[$category_value])): ?>
          <option value="<?php echo html_escape($category_value); ?>" selected><?php echo html_escape($category_value); ?></option>
        <?php endif; ?>
      </select>
    </label>
    <label>Active on site
      <span class="check-field"><input type="checkbox" name="is_active" value="1" <?php echo $row['is_active'] ? 'checked' : ''; ?> /><span>Yes</span></span>
    </label>
    <label>Sort order
      <input name="sort_order" value="<?php echo (int) $row['sort_order']; ?>" />
    </label>
  </div>
  <?php
    fieldform_set_choices(array(
      'status' => array('ongoing' => 'Ongoing', 'upcoming' => 'Upcoming', 'completed' => 'Completed'),
    ));
    fieldform_render($fields, 'payload');
  ?>
  <p><button type="submit">Save project</button></p>
</form>
