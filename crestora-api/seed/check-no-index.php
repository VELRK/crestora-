<?php
function req($url, $cookie = null, $post = null) {
    $ch = curl_init($url);
    $opts = array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER => true,
        CURLOPT_FOLLOWLOCATION => false,
    );
    if ($cookie) {
        $opts[CURLOPT_COOKIEJAR] = $cookie;
        $opts[CURLOPT_COOKIEFILE] = $cookie;
    }
    if ($post !== null) {
        $opts[CURLOPT_POST] = true;
        $opts[CURLOPT_POSTFIELDS] = $post;
    }
    curl_setopt_array($ch, $opts);
    $raw = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $parts = explode("\r\n\r\n", $raw, 2);
    $headers = $parts[0];
    $body = isset($parts[1]) ? $parts[1] : '';
    return array($code, $headers, $body);
}
$cookie = 'c:/xampp/htdocs/crestora-api/seed/cookies-clean.txt';
if (file_exists($cookie)) unlink($cookie);
list($code, $headers, $body) = req('http://localhost:8080/crestora-api/admin/login');
echo "loginPage=$code hasForm=" . (strpos($body, 'name="username"') !== false ? 'yes' : 'no') . "\n";
list($code, $headers, $body) = req('http://localhost:8080/crestora-api/admin/login', $cookie, 'username=admin&password=admin123');
$loc = '';
if (preg_match('/Location:\s*(\S+)/i', $headers, $m)) $loc = $m[1];
echo "loginPost=$code location=$loc\n";
list($code, $headers, $body) = req('http://localhost:8080/crestora-api/admin', $cookie);
$hrefs = array();
preg_match_all('/href="([^"]*admin[^"]*)"/', $body, $hrefs);
$sample = array_slice(array_unique($hrefs[1]), 0, 6);
echo "dashboard=$code indexInLinks=" . (strpos($body, 'index.php') !== false ? 'yes' : 'no') . "\n";
echo "links=" . implode(' | ', $sample) . "\n";
list($code, $headers, $body) = req('http://localhost:8080/crestora-api/admin/projects', $cookie);
echo "projects=$code title=" . (strpos($body, 'Projects') !== false ? 'yes' : 'no') . " index=" . (strpos($body, 'index.php') !== false ? 'yes' : 'no') . "\n";
list($code, $headers, $body) = req('http://localhost:8080/crestora-api/api/projects');
echo "api=$code success=" . (strpos($body, '"success"') !== false ? 'yes' : 'no') . "\n";
list($code, $headers, $body) = req('http://localhost:8080/crestora-api/index.php/admin/login');
echo "oldLogin=$code\n";
