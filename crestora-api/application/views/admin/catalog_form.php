<h2><?php echo html_escape($heading); ?></h2>
<p><a href="<?php echo site_url($list_url); ?>">Back to list</a></p>
<?php if ( ! empty($error)): ?><p class="ok"><?php echo html_escape($error); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card">
  <?php if ($kind === 'locations'): ?>
    <label>Name<input name="item[name]" value="<?php echo html_escape($item['name']); ?>" required /></label>
    <label>Key<input name="item[cityKey]" value="<?php echo html_escape($item['cityKey']); ?>" />
      <span class="file-note">Used by the location filter. Leave blank to build it from the name.</span>
    </label>
    <label>Corridor<input name="item[state]" value="<?php echo html_escape($item['state']); ?>" /></label>
    <label>Highlight<input name="item[highlight]" value="<?php echo html_escape($item['highlight']); ?>" /></label>
    <label>Property count<input name="item[count]" value="<?php echo html_escape($item['count']); ?>" /></label>
    <input type="hidden" name="item[id]" value="<?php echo html_escape($item['id']); ?>" />
  <?php else: ?>
    <label>Name<input name="item[categoryName]" value="<?php echo html_escape($item['categoryName']); ?>" required /></label>
    <label>Key<input name="item[categoryKey]" value="<?php echo html_escape($item['categoryKey']); ?>" />
      <span class="file-note">Used by the category filter. Leave blank to build it from the name.</span>
    </label>
    <label>Title<input name="item[title]" value="<?php echo html_escape($item['title']); ?>" /></label>
    <label>Subtitle<input name="item[subtitle]" value="<?php echo html_escape($item['subtitle']); ?>" /></label>
    <label>Description<textarea name="item[description]" rows="4"><?php echo html_escape($item['description']); ?></textarea></label>
    <label>Badge<input name="item[badge]" value="<?php echo html_escape($item['badge']); ?>" /></label>
    <label>Count label<input name="item[plotsCount]" value="<?php echo html_escape($item['plotsCount']); ?>" /></label>
    <label>Starting price<input name="item[startingPrice]" value="<?php echo html_escape($item['startingPrice']); ?>" /></label>
    <input type="hidden" name="item[id]" value="<?php echo html_escape($item['id']); ?>" />
    <input type="hidden" name="item[exampleText]" value="<?php echo html_escape($item['exampleText']); ?>" />
    <input type="hidden" name="item[icon]" value="<?php echo html_escape($item['icon']); ?>" />
  <?php endif; ?>
  <label>Image
    <?php if ( ! empty($item['image'])): ?><img class="img-preview" src="<?php echo html_escape($item['image']); ?>" alt="" /><?php endif; ?>
    <input class="file-input" type="file" name="image" accept="image/jpeg,image/png,image/gif,image/webp" />
    <span class="file-note">Upload a new image, or leave this empty to keep the current one.</span>
  </label>
  <input type="hidden" name="item[image]" value="<?php echo html_escape(isset($item['image']) ? $item['image'] : ''); ?>" />
  <p><button type="submit">Save</button></p>
</form>
