<h2><?php echo html_escape($heading); ?></h2>
<p><a href="<?php echo site_url($list_url); ?>">Back to list</a></p>
<?php if ( ! empty($error)): ?><p class="form-error"><?php echo html_escape($error); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card project-form">
  <div class="form-grid">
  <?php if ($kind === 'locations'): ?>
    <label>Name <span class="req">*</span><input name="item[name]" value="<?php echo html_escape($item['name']); ?>" required data-slug-source /></label>
    <input type="hidden" name="item[cityKey]" value="<?php echo html_escape($item['cityKey']); ?>" required data-slug-target />
    <label>Corridor<input name="item[state]" value="<?php echo html_escape($item['state']); ?>" /></label>
    <label>Highlight<input name="item[highlight]" value="<?php echo html_escape($item['highlight']); ?>" /></label>
    <input type="hidden" name="item[id]" value="<?php echo html_escape($item['id']); ?>" />
  <?php else: ?>
    <label>Name <span class="req">*</span><input name="item[categoryName]" value="<?php echo html_escape($item['categoryName']); ?>" required data-slug-source /></label>
    <input type="hidden" name="item[categoryKey]" value="<?php echo html_escape($item['categoryKey']); ?>" required data-slug-target />
    <label>Title <span class="req">*</span><input name="item[title]" value="<?php echo html_escape($item['title']); ?>" required /></label>
    <label>Count label<input name="item[plotsCount]" value="<?php echo html_escape($item['plotsCount']); ?>" placeholder="e.g. Plots" /></label>
    <label>Icon
      <select name="item[icon]">
        <?php
          $icons = array('LandPlot' => 'Plots / land', 'Home' => 'Villas / homes', 'Building2' => 'Apartments / buildings', 'Warehouse' => 'Commercial / industrial', 'MapPinned' => 'Location');
          $cur = isset($item['icon']) ? $item['icon'] : 'LandPlot';
          foreach ($icons as $val => $lab):
        ?>
          <option value="<?php echo html_escape($val); ?>" <?php echo ((string) $val === (string) $cur) ? 'selected' : ''; ?>><?php echo html_escape($lab); ?></option>
        <?php endforeach; ?>
        <?php if ($cur !== '' && ! isset($icons[$cur])): ?>
          <option value="<?php echo html_escape($cur); ?>" selected><?php echo html_escape($cur); ?> (custom)</option>
        <?php endif; ?>
      </select>
    </label>
    <input type="hidden" name="item[id]" value="<?php echo html_escape($item['id']); ?>" />
  <?php endif; ?>
  </div>
  <div class="form-stack">
    <label>Image <?php if (empty($item['image'])): ?><span class="req">*</span><?php endif; ?>
      <span class="img-field">
        <?php if ( ! empty($item['image'])): ?><img class="img-preview" src="<?php echo html_escape($item['image']); ?>" alt="" /><?php endif; ?>
        <input class="file-input" type="file" name="image" accept="image/jpeg,image/png,image/gif,image/webp" <?php echo empty($item['image']) ? 'required' : ''; ?> />
        <span class="file-note">Upload a new image, or leave this empty to keep the current one.</span>
      </span>
    </label>
  </div>
  <input type="hidden" name="item[image]" value="<?php echo html_escape(isset($item['image']) ? $item['image'] : ''); ?>" />
  <p><button type="submit">Save</button></p>
</form>
