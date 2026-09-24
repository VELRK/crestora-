<?php
$cookie = 'c:/xampp/htdocs/crestora-api/seed/cookies.txt';
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/login');
curl_setopt_array($ch, array(CURLOPT_POST => true, CURLOPT_POSTFIELDS => 'username=admin&password=admin123', CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_COOKIEJAR => $cookie, CURLOPT_COOKIEFILE => $cookie));
curl_exec($ch);
curl_close($ch);
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/blog/b1');
curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_COOKIEFILE => $cookie));
$html = curl_exec($ch);
curl_close($ch);
echo 'select=' . (strpos($html, 'name="payload[relatedProjectId]"') !== false ? 'yes' : 'no') . "\n";
echo 'textId=' . (strpos($html, 'name="payload[relatedProjectId]" value=') !== false ? 'yes' : 'no') . "\n";
preg_match_all('/<option value="(p\d+)"[^>]*>([^<]+)/', $html, $m, PREG_SET_ORDER);
echo 'options=' . count($m) . "\n";
foreach (array_slice($m, 0, 4) as $row) {
    echo $row[1] . ' => ' . $row[2] . "\n";
}
echo 'selected=' . (strpos($html, 'value="p1" selected') !== false ? 'p1' : 'other') . "\n";
