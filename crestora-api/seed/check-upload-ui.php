<?php
$cookie = 'c:/xampp/htdocs/crestora-api/seed/cookies.txt';
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/login');
curl_setopt_array($ch, array(
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => 'username=admin&password=admin123',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_COOKIEJAR => $cookie,
    CURLOPT_COOKIEFILE => $cookie,
));
$html = curl_exec($ch);
curl_close($ch);
echo 'sidebar=' . (strpos($html, 'class="sidebar"') !== false ? 'yes' : 'no') . "\n";
echo 'topnav=' . (strpos($html, '<header>') !== false ? 'yes' : 'no') . "\n";
$m = new mysqli('localhost', 'root', '', 'crestora_db');
$id = $m->query("SELECT id FROM sections WHERE page='home' AND section_key='hero'")->fetch_assoc()['id'];
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/section/' . $id);
curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_COOKIEFILE => $cookie));
$html = curl_exec($ch);
curl_close($ch);
echo 'hero files=' . preg_match_all('/type="file"/', $html) . ' enctype=' . (strpos($html, 'multipart/form-data') !== false ? 'yes' : 'no') . "\n";
$pid = $m->query("SELECT code FROM projects LIMIT 1")->fetch_assoc()['code'];
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/project/' . $pid);
curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_COOKIEFILE => $cookie));
$html = curl_exec($ch);
curl_close($ch);
echo 'project files=' . preg_match_all('/type="file"/', $html) . ' gallery-add=' . (strpos($html, 'upload_extra[gallery]') !== false ? 'yes' : 'no') . "\n";
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/settings');
curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_COOKIEFILE => $cookie));
$html = curl_exec($ch);
curl_close($ch);
echo 'settings logo file=' . (strpos($html, 'name="upload[logo]"') !== false ? 'yes' : 'no') . "\n";
