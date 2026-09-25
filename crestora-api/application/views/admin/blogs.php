<h2>Blogs</h2>
<?php if ( ! empty($msg)): ?><p class="ok"><?php echo html_escape($msg); ?></p><?php endif; ?>
<p><a class="btn btn-add" href="<?php echo site_url('admin/blog_create'); ?>">Add blog</a></p>
<div class="card">
<table>
<tr><th>Image</th><th>Title</th><th>Slug</th><th>Category</th><th>Featured</th><th>Active</th><th></th></tr>
<?php foreach ($rows as $r): $item = json_decode($r['payload'], TRUE); $image = (is_array($item) && ! empty($item['image'])) ? $item['image'] : ''; ?>
<tr>
  <td><?php if ($image): ?><img class="thumb" src="<?php echo html_escape($image); ?>" alt="" /><?php endif; ?></td>
  <td><?php echo html_escape($r['title']); ?></td>
  <td><?php echo html_escape($r['slug']); ?></td>
  <td><?php echo html_escape($r['category']); ?></td>
  <td><?php echo $r['featured'] ? 'Yes' : 'No'; ?></td>
  <td><?php echo $r['is_active'] ? 'Yes' : 'No'; ?></td>
  <td>
    <div class="row-actions">
      <a href="<?php echo site_url('admin/blog/'.$r['code']); ?>">Edit</a>
      <form method="post" action="<?php echo site_url('admin/blog_delete/'.$r['code']); ?>" onsubmit="return confirm('Delete this blog?');">
        <button type="submit" class="btn-delete">Delete</button>
      </form>
    </div>
  </td>
</tr>
<?php endforeach; ?>
</table>
</div>
