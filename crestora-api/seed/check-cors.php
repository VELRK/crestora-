<?php
function head($url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER => true,
        CURLOPT_NOBODY => true,
        CURLOPT_HTTPHEADER => array('Origin: http://127.0.0.1:4173'),
    ));
    $raw = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $acao = (stripos($raw, 'Access-Control-Allow-Origin') !== false) ? 'yes' : 'no';
    echo "$code cors=$acao $url\n";
}
head('http://localhost:8080/crestora-properties/crestora-api/api/home');
head('http://localhost:8080/crestora-api/index.php/api/home');
$html = file_get_contents('http://127.0.0.1:4173/projects');
echo 'preview=' . (strpos($html, 'index-31yw9ySS.js') !== false ? 'new-bundle' : 'old-bundle') . "\n";
$js = file_get_contents('c:/xampp/htdocs/crestora-properties/dist/assets/index-31yw9ySS.js');
echo 'bundleNewApi=' . (strpos($js, 'crestora-properties/crestora-api/api') !== false ? 'yes' : 'no') . "\n";
echo 'bundleOldApi=' . (strpos($js, 'crestora-api/index.php/api') !== false ? 'yes' : 'no') . "\n";
