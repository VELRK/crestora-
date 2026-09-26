<h2>Dashboard</h2>
<p class="lead">Content, projects, and leads for the public site.</p>
<div class="stats">
  <a class="stat" href="<?php echo site_url('admin/projects'); ?>"><span>Projects</span><strong><?php echo (int) $projects; ?></strong></a>
  <a class="stat" href="<?php echo site_url('admin/blogs'); ?>"><span>Blogs</span><strong><?php echo (int) $blogs; ?></strong></a>
  <a class="stat" href="<?php echo site_url('admin/contacts'); ?>"><span>Contact forms</span><strong><?php echo (int) $enquiries; ?></strong></a>
  <a class="stat" href="<?php echo site_url('admin/visits'); ?>"><span>Site visits</span><strong><?php echo (int) $visits; ?></strong></a>
</div>
