<?php
$mysqli = new mysqli('localhost', 'root', '', 'crestora_db');
if ($mysqli->connect_error) {
    fwrite(STDERR, $mysqli->connect_error);
    exit(1);
}
$mysqli->set_charset('utf8mb4');
$data = json_decode(file_get_contents(__DIR__ . '/content.json'), true);
if (!$data) {
    fwrite(STDERR, "content.json missing\n");
    exit(1);
}

$hash = password_hash('admin123', PASSWORD_DEFAULT);
$mysqli->query("DELETE FROM admins");
$stmt = $mysqli->prepare("INSERT INTO admins (username, password_hash, name) VALUES ('admin', ?, 'Crestora Admin')");
$stmt->bind_param('s', $hash);
$stmt->execute();

$mysqli->query("DELETE FROM settings");
$ins = $mysqli->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)");
foreach ($data['settings'] as $k => $v) {
    $ins->bind_param('ss', $k, $v);
    $ins->execute();
}

$sections = array(
    array('home', 'hero', 'Hero slider', $data['home']['heroSlides'], 1),
    array('home', 'categories', 'Property categories', $data['home']['categories'], 2),
    array('home', 'locations', 'Prime locations', $data['home']['locations'], 3),
    array('home', 'about_strip', 'About strip', $data['aboutStrip'], 4),
    array('home', 'stats', 'Stats', $data['home']['stats'], 5),
    array('home', 'ticker', 'Marquee ticker', $data['ticker'], 6),
    array('home', 'why_coimbatore', 'Why Coimbatore', $data['home']['whyCoimbatore'], 7),
    array('home', 'testimonials', 'Testimonials', $data['home']['testimonials'], 8),
    array('home', 'google_reviews', 'Google reviews', $data['home']['googleReviews'], 9),
    array('home', 'faqs', 'FAQ', $data['home']['faqs'], 10),
    array('home', 'partners', 'Bank partners', $data['home']['partners'], 11),
    array('home', 'why_choose', 'Why choose us', $data['home']['whyChoose'], 12),
    array('home', 'build_companion', 'Build companion', $data['home']['buildCompanion'], 13),
    array('home', 'nri', 'NRI services', $data['home']['nri'], 14),
    array('global', 'menus', 'Navigation', $data['projects']['navLinks'], 1),
    array('global', 'filters', 'Project filters', array(
        'categories' => $data['projects']['categories'],
        'propertyTypes' => $data['projects']['propertyTypes'],
        'localities' => $data['projects']['localities'],
        'budgets' => $data['projects']['budgets'],
        'sortOptions' => $data['projects']['sortOptions'],
    ), 2),
    array('about', 'page', 'About page', $data['about'], 1),
    array('blogs', 'meta', 'Blog categories and newsletter', array(
        'categories' => $data['blogs']['categories'],
        'newsletter' => $data['blogs']['newsletter'],
    ), 1),
    array('contact', 'page', 'Contact page', $data['contact'], 1),
    array('projects', 'page', 'Projects page', array(
        'title' => 'All Projects',
        'pageName' => 'All Projects',
    ), 1),
);

$mysqli->query("DELETE FROM sections");
$sec = $mysqli->prepare("INSERT INTO sections (page, section_key, title, payload, is_visible, sort_order) VALUES (?, ?, ?, ?, 1, ?)");
foreach ($sections as $row) {
    $json = json_encode($row[3], JSON_UNESCAPED_UNICODE);
    $sec->bind_param('ssssi', $row[0], $row[1], $row[2], $json, $row[4]);
    $sec->execute();
}

$mysqli->query("DELETE FROM projects");
$pstmt = $mysqli->prepare("INSERT INTO projects (code, slug, title, category, locality, status, price, is_featured, is_popular, is_active, sort_order, payload) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)");
$i = 1;
foreach ($data['projects']['projects'] as $p) {
    $code = $p['id'];
    $slug = isset($p['slug']) ? $p['slug'] : $code;
    $title = $p['title'];
    $category = isset($p['category']) ? $p['category'] : '';
    $locality = isset($p['locality']) ? $p['locality'] : '';
    $status = isset($p['status']) ? $p['status'] : '';
    $price = isset($p['price']) ? (float) $p['price'] : 0;
    $featured = !empty($p['isFeatured']) ? 1 : 0;
    $popular = !empty($p['isPopular']) ? 1 : 0;
    $json = json_encode($p, JSON_UNESCAPED_UNICODE);
    $pstmt->bind_param('ssssssdiiis', $code, $slug, $title, $category, $locality, $status, $price, $featured, $popular, $i, $json);
    $pstmt->execute();
    $i++;
}

$mysqli->query("DELETE FROM blogs");
$bstmt = $mysqli->prepare("INSERT INTO blogs (code, slug, title, category, featured, is_active, sort_order, payload) VALUES (?, ?, ?, ?, ?, 1, ?, ?)");
$i = 1;
foreach ($data['blogs']['posts'] as $b) {
    $code = $b['id'];
    $slug = $b['slug'];
    $title = $b['title'];
    $category = isset($b['category']) ? $b['category'] : '';
    $featured = !empty($b['featured']) ? 1 : 0;
    $json = json_encode($b, JSON_UNESCAPED_UNICODE);
    $bstmt->bind_param('ssssiis', $code, $slug, $title, $category, $featured, $i, $json);
    $bstmt->execute();
    $i++;
}

echo "seeded projects=" . count($data['projects']['projects']) . " blogs=" . count($data['blogs']['posts']) . "\n";
