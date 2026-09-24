<?php
$cookie = 'c:/xampp/htdocs/crestora-api/seed/cookies.txt';
@unlink($cookie);
$login = 'http://localhost:8080/crestora-api/index.php/admin/login';
$ch = curl_init($login);
curl_setopt_array($ch, array(
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => 'username=admin&password=admin123',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_COOKIEJAR => $cookie,
    CURLOPT_COOKIEFILE => $cookie,
));
$body = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo "login $code dashboard=" . (strpos($body, 'Page sections') !== false ? 'yes' : 'no') . "\n";

$m = new mysqli('localhost', 'root', '', 'crestora_db');
$sections = $m->query("SELECT id, page, section_key FROM sections ORDER BY page, sort_order");
while ($row = $sections->fetch_assoc()) {
    $url = 'http://localhost:8080/crestora-api/index.php/admin/section/' . $row['id'];
    $ch = curl_init($url);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_COOKIEFILE => $cookie,
    ));
    $html = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $inputs = preg_match_all('/<input |<textarea /', $html);
    $jsonbox = strpos($html, 'Content JSON') !== false ? 'JSON' : 'fields';
    echo "{$row['page']}/{$row['section_key']} http=$status inputs=$inputs mode=$jsonbox\n";
}

foreach (array('admin/project/p1', 'admin/blog/b1', 'admin/settings', 'admin/blogs', 'admin/leads') as $path) {
    $ch = curl_init('http://localhost:8080/crestora-api/index.php/' . $path);
    curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_COOKIEFILE => $cookie));
    $html = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $inputs = preg_match_all('/<input |<textarea /', $html);
    echo "$path http=$status inputs=$inputs hasEdit=" . (strpos($html, 'Edit fields') !== false ? 'yes' : 'no') . "\n";
}

$home = file_get_contents('http://localhost:8080/crestora-api/index.php/api/home');
$json = json_decode($home, true);
$slide = $json['data']['heroSlides'][0];
echo "api hero image=" . $slide['bgImage'] . "\n";
echo "api categories=" . count($json['data']['categories']) . " locations=" . count($json['data']['locations']) . " faqs=" . count($json['data']['faqs']) . " blogs=" . count($json['data']['latestBlogs']) . "\n";
$projects = json_decode(file_get_contents('http://localhost:8080/crestora-api/index.php/api/projects'), true);
echo "api projects=" . $projects['total'] . " keys=" . implode(',', array_keys($projects['data'][0])) . "\n";
$about = json_decode(file_get_contents('http://localhost:8080/crestora-api/index.php/api/about'), true);
echo "about founder=" . $about['data']['founderName'] . " milestones=" . count($about['data']['milestones']) . " leadership=" . count($about['data']['leadership']) . "\n";
$contact = json_decode(file_get_contents('http://localhost:8080/crestora-api/index.php/api/contact'), true);
echo "contact phone=" . $contact['data']['page']['phone'] . " address=" . $contact['data']['page']['address'] . "\n";
$settings = json_decode(file_get_contents('http://localhost:8080/crestora-api/index.php/api/settings'), true);
echo "settings keys=" . implode(',', array_keys($settings['data'])) . "\n";
