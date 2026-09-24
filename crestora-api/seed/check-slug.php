<?php
$cookie = 'c:/xampp/htdocs/crestora-api/seed/cookies.txt';
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/login');
curl_setopt_array($ch, array(CURLOPT_POST => true, CURLOPT_POSTFIELDS => 'username=admin&password=admin123', CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_COOKIEJAR => $cookie, CURLOPT_COOKIEFILE => $cookie));
curl_exec($ch);
curl_close($ch);
$db = new mysqli('localhost', 'root', '', 'crestora_db');
$p = $db->query("SELECT code, slug FROM projects ORDER BY sort_order LIMIT 1")->fetch_assoc();
$b = $db->query("SELECT code, slug FROM blogs ORDER BY sort_order LIMIT 1")->fetch_assoc();
echo "project {$p['code']} slug={$p['slug']}\n";
echo "blog {$b['code']} slug={$b['slug']}\n";
foreach (array('project/'.$p['code'] => 'project', 'blog/'.$b['code'] => 'blog', 'projects' => 'projects', 'blogs' => 'blogs') as $path => $label) {
    $ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/'.$path);
    curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_COOKIEFILE => $cookie));
    $html = curl_exec($ch);
    curl_close($ch);
    echo $label.' slugField='.(strpos($html, 'name="slug"') !== false ? 'yes' : 'no').' slugText='.(strpos($html, $label === 'project' || $label === 'projects' ? $p['slug'] : $b['slug']) !== false ? 'yes' : 'no')."\n";
}
$api = json_decode(file_get_contents('http://localhost:8080/crestora-api/index.php/api/projects'), true);
echo 'apiSlug='.$api['data'][0]['slug']."\n";
