<h2><?php echo html_escape($heading); ?></h2>
<p>
  <?php if ( ! empty($is_draft)): ?>
    <a href="<?php echo site_url('admin/project_discard/'.$row['code']); ?>" onclick="return confirm('Discard this draft? It will not be saved.');">Cancel and return to projects</a>
  <?php else: ?>
    <a href="<?php echo site_url('admin/projects'); ?>">Back to projects</a>
  <?php endif; ?>
</p>
<?php if ($msg): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<?php if ( ! empty($error)): ?><p class="form-error"><?php echo html_escape($error); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card project-form">
  <?php
    $item = is_array($item) ? $item : array();
    $fields = crestora_pick_admin_fields($item);
    $title_value = isset($item['title']) ? $item['title'] : '';
    $location_value = isset($item['location']) ? $item['location'] : '';
    $locality_value = isset($item['locality']) ? (string) $item['locality'] : '';
    $category_value = isset($item['category']) ? (string) $item['category'] : '';
    $category_labels = crestora_category_labels();
    $location_choices = crestora_location_choices();
  ?>
  <div class="form-grid">
    <label>Title <span class="req">*</span>
      <input name="payload[title]" value="<?php echo html_escape($title_value); ?>" required data-slug-source />
    </label>
    <input type="hidden" name="slug" value="<?php echo html_escape($row['slug']); ?>" required data-slug-target />
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
      <span class="file-note">City and map labels are filled automatically from this location.</span>
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
  </div>
  <p class="file-note" style="margin:0 0 12px">Fields below match the public project list and project detail page only.</p>
  <?php
    fieldform_set_choices(array(
      'status' => array(
        'ongoing' => 'Ongoing',
        'upcoming' => 'Upcoming',
        'completed' => 'Completed',
      ),
    ));
    fieldform_render($fields, 'payload');
  ?>
  <p><button type="submit">Save project</button></p>
</form>
