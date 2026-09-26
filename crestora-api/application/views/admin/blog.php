<h2><?php echo html_escape($heading); ?></h2>
<p><a href="<?php echo site_url('admin/blogs'); ?>">Back to blogs</a></p>
<?php if ($msg): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card">
  <?php
    $fields = is_array($item) ? $item : array();
    $related = isset($fields['relatedProjectId']) ? (string) $fields['relatedProjectId'] : '';
    unset($fields['slug'], $fields['relatedProjectId']);
    $project_rows = isset($projects) && is_array($projects) ? $projects : array();
    $known = FALSE;
  ?>
  <div class="form-grid">
    <label><input type="checkbox" name="is_active" value="1" <?php echo $row['is_active'] ? 'checked' : ''; ?> style="width:auto" /> Active on site</label>
    <label class="span-3">Slug
      <span class="url-field">
        <span class="url-prefix">/blog/</span>
        <input name="slug" value="<?php echo html_escape($row['slug']); ?>" />
      </span>
      <span class="file-note">The /blog/ part stays fixed. Type the slug after it.</span>
    </label>
    <label>Related project
      <select name="payload[relatedProjectId]">
        <option value="">None</option>
        <?php foreach ($project_rows as $project): ?>
          <?php if ((string) $project['code'] === $related) { $known = TRUE; } ?>
          <option value="<?php echo html_escape($project['code']); ?>" <?php echo ((string) $project['code'] === $related) ? 'selected' : ''; ?>><?php echo html_escape($project['title'] !== '' ? $project['title'] : $project['code']); ?></option>
        <?php endforeach; ?>
        <?php if ($related !== '' && ! $known): ?>
          <option value="<?php echo html_escape($related); ?>" selected><?php echo html_escape($related); ?></option>
        <?php endif; ?>
      </select>
      <span class="file-note">Shown with this article. Pick the project by name.</span>
    </label>
  </div>
  <?php
    fieldform_set_choices(array(
      'category' => array(
        'Market Insights' => 'Market Insights',
        'Legal & Advisory' => 'Legal & Advisory',
        'NRI Guide' => 'NRI Guide',
        'Infrastructure & Growth' => 'Infrastructure & Growth',
        'Sustainable Living' => 'Sustainable Living',
        'Smart Construction' => 'Smart Construction',
      ),
    ));
    fieldform_render($fields, 'payload');
  ?>
  <p><button type="submit">Save blog</button></p>
</form>
