<h2><?php echo html_escape($heading); ?></h2>
<p><a href="<?php echo site_url('admin/slides'); ?>">Back to slider</a></p>
<?php if ( ! empty($error)): ?><p class="form-error"><?php echo html_escape($error); ?></p><?php endif; ?>
<form method="post" enctype="multipart/form-data" class="card project-form">
  <div class="form-grid">
  <label>Title <span class="req">*</span><input name="item[title]" value="<?php echo html_escape($item['title']); ?>" required /></label>
  <label>Gold word<input name="item[titleHighlight1]" value="<?php echo html_escape($item['titleHighlight1']); ?>" /></label>
  <label>Second highlight<input name="item[titleHighlight2]" value="<?php echo html_escape($item['titleHighlight2']); ?>" /></label>
  <label>Eyebrow<input name="item[subtitle]" value="<?php echo html_escape($item['subtitle']); ?>" /></label>
  <label>Description<textarea name="item[description]" rows="4"><?php echo html_escape($item['description']); ?></textarea></label>
  <label>Tagline<input name="item[tagline]" value="<?php echo html_escape($item['tagline']); ?>" /></label>
  <label>Project name<input name="item[projectName]" value="<?php echo html_escape($item['projectName']); ?>" /></label>
  <label>Location<input name="item[location]" value="<?php echo html_escape($item['location']); ?>" /></label>
  <label>Price<input name="item[price]" value="<?php echo html_escape($item['price']); ?>" /></label>
  <label>Price note<input name="item[period]" value="<?php echo html_escape($item['period']); ?>" /></label>
  <label>Tag<input name="item[tag]" value="<?php echo html_escape($item['tag']); ?>" /></label>
  <label>Badge<input name="item[badge]" value="<?php echo html_escape($item['badge']); ?>" /></label>
  <label>Plots<input name="item[plotsCount]" value="<?php echo html_escape($item['plotsCount']); ?>" /></label>
  <label>Land area<input name="item[landArea]" value="<?php echo html_escape($item['landArea']); ?>" /></label>
  <label>Background image
    <?php if ( ! empty($item['bgImage'])): ?><img class="img-preview" src="<?php echo html_escape($item['bgImage']); ?>" alt="" /><?php endif; ?>
    <input class="file-input" type="file" name="bgImage" accept="image/jpeg,image/png,image/gif,image/webp" />
    <span class="file-note">Upload a new image, or leave this empty to keep the current one.</span>
  </label>
  <input type="hidden" name="item[id]" value="<?php echo html_escape($item['id']); ?>" />
  <input type="hidden" name="item[bgImage]" value="<?php echo html_escape(isset($item['bgImage']) ? $item['bgImage'] : ''); ?>" />
  </div>
  <p><button type="submit">Save</button></p>
</form>
