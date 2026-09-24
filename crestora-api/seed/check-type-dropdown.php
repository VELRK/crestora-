<?php
$cookie = 'c:/xampp/htdocs/crestora-api/seed/cookies.txt';
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/login');
curl_setopt_array($ch, array(CURLOPT_POST => true, CURLOPT_POSTFIELDS => 'username=admin&password=admin123', CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_COOKIEJAR => $cookie, CURLOPT_COOKIEFILE => $cookie));
curl_exec($ch);
curl_close($ch);
function grab($url, $cookie) {
    $ch = curl_init($url);
    curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_COOKIEFILE => $cookie));
    $html = curl_exec($ch);
    curl_close($ch);
    return $html;
}
$cookie = 'c:/xampp/htdocs/crestora-api/seed/cookies.txt';
$project = grab('http://localhost:8080/crestora-api/index.php/admin/project/p1', $cookie);
$blog = grab('http://localhost:8080/crestora-api/index.php/admin/blog/b1', $cookie);
echo 'projectTypeSelect=' . (strpos($project, 'name="payload[type]"') !== false && strpos($project, '<select name="payload[type]"') !== false ? 'yes' : 'no') . "\n";
echo 'projectCategorySelect=' . (strpos($project, '<select name="payload[category]"') !== false ? 'yes' : 'no') . "\n";
echo 'projectPlotsSelected=' . (strpos($project, 'value="plots" selected') !== false ? 'yes' : 'no') . "\n";
echo 'blogCategorySelect=' . (strpos($blog, '<select name="payload[category]"') !== false ? 'yes' : 'no') . "\n";
echo 'blogMarket=' . (strpos($blog, 'Market Insights') !== false ? 'yes' : 'no') . "\n";
