<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
$order = array(
	'hero' => 1,
	'categories' => 2,
	'locations' => 3,
	'about_strip' => 4,
	'stats' => 5,
	'landmark' => 6,
	'ticker' => 7,
	'why_coimbatore' => 8,
	'featured' => 9,
	'google_reviews' => 10,
	'testimonials' => 11,
	'faqs' => 12,
	'insights' => 13,
	'partners' => 14,
	'why_choose' => 15,
	'build_companion' => 16,
	'nri' => 17,
);
$stmt = $m->prepare("UPDATE sections SET sort_order = ? WHERE page = 'home' AND section_key = ?");
foreach ($order as $key => $sort) {
	$stmt->bind_param('is', $sort, $key);
	$stmt->execute();
	echo "$sort $key rows={$stmt->affected_rows}\n";
}
