<?php
$category_labels = isset($category_labels) && is_array($category_labels) ? $category_labels : array();
$by_category = isset($by_category) ? $by_category : array();
$by_status = isset($by_status) ? $by_status : array();
$leads_week = isset($leads_week) ? $leads_week : array();
$max_cat = 0;
foreach ($by_category as $row) {
	$n = (int) $row['total'];
	if ($n > $max_cat) {
		$max_cat = $n;
	}
}
$max_status = 0;
foreach ($by_status as $row) {
	$n = (int) $row['total'];
	if ($n > $max_status) {
		$max_status = $n;
	}
}
$max_leads = 0;
foreach ($leads_week as $day) {
	$n = (int) $day['total'];
	if ($n > $max_leads) {
		$max_leads = $n;
	}
}
if ($max_leads < 1) {
	$max_leads = 1;
}
$status_labels = array(
	'ongoing' => 'Ongoing',
	'upcoming' => 'Upcoming',
	'completed' => 'Completed',
);
?>
<div class="dash-head">
  <div>
    <h2>Dashboard</h2>
    <p class="lead">Overview of listings, content, and incoming leads.</p>
  </div>
  <div class="dash-pill">
    <i class="fas fa-bolt" aria-hidden="true"></i>
    <?php echo (int) $leads_new; ?> new lead<?php echo ((int) $leads_new === 1) ? '' : 's'; ?> to review
  </div>
</div>

<div class="stats dash-stats">
  <a class="stat dash-stat" href="<?php echo site_url('admin/projects'); ?>">
    <span class="dash-stat-icon"><i class="fas fa-building" aria-hidden="true"></i></span>
    <span>Projects</span>
    <strong><?php echo (int) $projects; ?></strong>
    <em><?php echo (int) $projects_active; ?> live on site</em>
  </a>
  <a class="stat dash-stat" href="<?php echo site_url('admin/blogs'); ?>">
    <span class="dash-stat-icon"><i class="fas fa-newspaper" aria-hidden="true"></i></span>
    <span>Blogs</span>
    <strong><?php echo (int) $blogs; ?></strong>
    <em>Published articles</em>
  </a>
  <a class="stat dash-stat" href="<?php echo site_url('admin/contacts'); ?>">
    <span class="dash-stat-icon"><i class="fas fa-envelope" aria-hidden="true"></i></span>
    <span>Contact forms</span>
    <strong><?php echo (int) $enquiries; ?></strong>
    <em>All time enquiries</em>
  </a>
  <a class="stat dash-stat" href="<?php echo site_url('admin/visits'); ?>">
    <span class="dash-stat-icon"><i class="fas fa-calendar-check" aria-hidden="true"></i></span>
    <span>Site visits</span>
    <strong><?php echo (int) $visits; ?></strong>
    <em>Visit requests</em>
  </a>
</div>

<div class="dash-grid">
  <div class="card dash-card">
    <h3><i class="fas fa-chart-bar" aria-hidden="true"></i> Projects by category</h3>
    <?php if (empty($by_category)): ?>
      <p class="dash-empty">No categorized projects yet.</p>
    <?php else: ?>
      <div class="chart-bars">
        <?php foreach ($by_category as $row):
          $key = isset($row['label']) ? $row['label'] : '';
          $count = (int) $row['total'];
          $pct = $max_cat > 0 ? round($count / $max_cat * 100) : 0;
          $name = isset($category_labels[$key]) ? $category_labels[$key] : ($key !== '' ? ucwords(str_replace('-', ' ', $key)) : 'Other');
        ?>
        <div class="chart-row">
          <span class="chart-label"><?php echo html_escape($name); ?></span>
          <div class="chart-track" aria-hidden="true"><div class="chart-fill chart-fill-a" style="width:<?php echo (int) $pct; ?>%"></div></div>
          <span class="chart-val"><?php echo $count; ?></span>
        </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>

  <div class="card dash-card">
    <h3><i class="fas fa-layer-group" aria-hidden="true"></i> Projects by status</h3>
    <?php if (empty($by_status)): ?>
      <p class="dash-empty">No status data yet.</p>
    <?php else: ?>
      <div class="chart-bars">
        <?php foreach ($by_status as $row):
          $key = isset($row['label']) ? strtolower($row['label']) : '';
          $count = (int) $row['total'];
          $pct = $max_status > 0 ? round($count / $max_status * 100) : 0;
          $name = isset($status_labels[$key]) ? $status_labels[$key] : ucwords($key);
        ?>
        <div class="chart-row">
          <span class="chart-label"><?php echo html_escape($name); ?></span>
          <div class="chart-track" aria-hidden="true"><div class="chart-fill chart-fill-b" style="width:<?php echo (int) $pct; ?>%"></div></div>
          <span class="chart-val"><?php echo $count; ?></span>
        </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</div>

<div class="card dash-card dash-card-wide">
  <h3><i class="fas fa-chart-line" aria-hidden="true"></i> Leads — last 7 days</h3>
  <p class="dash-sub">Contact forms and site visit bookings combined.</p>
  <div class="week-chart" role="img" aria-label="Lead activity for the last seven days">
    <?php foreach ($leads_week as $day):
      $total = (int) $day['total'];
      $h = $max_leads > 0 ? max(8, round($total / $max_leads * 100)) : 8;
    ?>
    <div class="week-col">
      <div class="week-bar-wrap">
        <div class="week-bar" style="height:<?php echo (int) $h; ?>%" title="<?php echo (int) $day['contacts']; ?> contacts, <?php echo (int) $day['visits']; ?> visits">
          <?php if ($total > 0): ?><span class="week-bar-num"><?php echo $total; ?></span><?php endif; ?>
        </div>
      </div>
      <span class="week-label"><?php echo html_escape($day['label']); ?></span>
    </div>
    <?php endforeach; ?>
  </div>
</div>

<div class="dash-grid dash-grid-bottom">
  <div class="card dash-card">
    <h3><i class="fas fa-inbox" aria-hidden="true"></i> Latest contact forms</h3>
    <?php if (empty($recent_enquiries)): ?>
      <p class="dash-empty">No enquiries yet.</p>
    <?php else: ?>
      <ul class="dash-feed">
        <?php foreach ($recent_enquiries as $row): ?>
        <li>
          <strong><?php echo html_escape($row['name'] !== '' ? $row['name'] : 'Visitor'); ?></strong>
          <span><?php echo html_escape($row['phone']); ?></span>
          <?php if ( ! empty($row['created_at'])): ?>
            <time><?php echo html_escape(date('M j, g:i A', strtotime($row['created_at']))); ?></time>
          <?php endif; ?>
        </li>
        <?php endforeach; ?>
      </ul>
      <p class="dash-link"><a href="<?php echo site_url('admin/contacts'); ?>">View all contact forms →</a></p>
    <?php endif; ?>
  </div>

  <div class="card dash-card">
    <h3><i class="fas fa-map-marked-alt" aria-hidden="true"></i> Latest site visits</h3>
    <?php if (empty($recent_visits)): ?>
      <p class="dash-empty">No visit requests yet.</p>
    <?php else: ?>
      <ul class="dash-feed">
        <?php foreach ($recent_visits as $row): ?>
        <li>
          <strong><?php echo html_escape($row['name'] !== '' ? $row['name'] : 'Visitor'); ?></strong>
          <span><?php echo html_escape($row['project_name'] !== '' ? $row['project_name'] : $row['phone']); ?></span>
          <?php if ( ! empty($row['created_at'])): ?>
            <time><?php echo html_escape(date('M j, g:i A', strtotime($row['created_at']))); ?></time>
          <?php endif; ?>
        </li>
        <?php endforeach; ?>
      </ul>
      <p class="dash-link"><a href="<?php echo site_url('admin/visits'); ?>">View all site visits →</a></p>
    <?php endif; ?>
  </div>
</div>
