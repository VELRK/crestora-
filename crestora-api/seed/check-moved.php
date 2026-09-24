<?php
function hit($url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_HEADER => true, CURLOPT_FOLLOWLOCATION => false));
    $raw = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $parts = explode("\r\n\r\n", $raw, 2);
    return array($code, $parts[0], isset($parts[1]) ? $parts[1] : '');
}
list($code, $headers, $body) = hit('http://localhost:8080/crestora-properties/crestora-api/admin/login');
echo "admin=$code form=" . (strpos($body, 'name="username"') !== false ? 'yes' : 'no') . "\n";
list($code, $headers, $body) = hit('http://localhost:8080/crestora-properties/crestora-api/api/projects');
$d = json_decode($body, true);
echo "api=$code success=" . (!empty($d['success']) ? 'yes' : 'no') . " total=" . (isset($d['total']) ? $d['total'] : 0) . "\n";
list($code, $headers, $body) = hit('http://localhost:8080/crestora-api/admin');
$loc = '';
if (preg_match('/Location:\s*(\S+)/i', $headers, $m)) $loc = $m[1];
echo "oldRedirect=$code location=$loc\n";
