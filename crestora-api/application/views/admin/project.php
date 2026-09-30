<h2><?php echo html_escape($heading); ?></h2>
<p><a href="<?php echo site_url('admin/projects'); ?>">Back to projects</a></p>
<?php if ($msg): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<?php if ( ! empty($error)): ?><p class="form-error"><?php echo html_escape($error); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card project-form">
  <?php
    $item = is_array($item) ? $item : array();
    $fields = crestora_pick_admin_fields($item);
    $title_value = isset($item['title']) ? $item['title'] : '';
    $location_value = isset($item['location']) ? $item['location'] : '';
    $locality_value = isset($item['locality']) ? (string) $item['locality'] : '';
    $category_labels = crestora_category_labels();
    $selected_categories = array();
    if ( ! empty($item['categories']) && is_array($item['categories'])) {
      foreach ($item['categories'] as $cat_key) {
        $cat_key = trim((string) $cat_key);
        if ($cat_key !== '') {
          $selected_categories[] = $cat_key;
        }
      }
    }
    if ( ! $selected_categories && ! empty($item['category'])) {
      $selected_categories[] = (string) $item['category'];
    }
    if ( ! $selected_categories && ! empty($row['categories_json'])) {
      $selected_categories = crestora_decode_categories_json($row['categories_json']);
    }
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
    </label>
    <label class="span-3">Categories <span class="req">*</span>
      <div class="category-multi">
        <?php foreach ($category_labels as $key => $label):
          $checked = in_array((string) $key, $selected_categories, TRUE);
        ?>
          <span class="check-field category-multi-item">
            <input type="checkbox" name="payload[categories][]" value="<?php echo html_escape($key); ?>" <?php echo $checked ? 'checked' : ''; ?> />
            <span><?php echo html_escape($label); ?></span>
          </span>
        <?php endforeach; ?>
        <?php foreach ($selected_categories as $legacy_key):
          if (isset($category_labels[$legacy_key])) {
            continue;
          }
        ?>
          <span class="check-field category-multi-item">
            <input type="checkbox" name="payload[categories][]" value="<?php echo html_escape($legacy_key); ?>" checked />
            <span><?php echo html_escape($legacy_key); ?> (legacy)</span>
          </span>
        <?php endforeach; ?>
      </div>
    </label>
    <label>Active on site
      <span class="check-field"><input type="checkbox" name="is_active" value="1" <?php echo $row['is_active'] ? 'checked' : ''; ?> /><span>Yes</span></span>
    </label>
  </div>
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
