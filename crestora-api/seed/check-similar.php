<?php
$api = json_decode(file_get_contents('http://localhost:8080/crestora-api/index.php/api/projects'), true);
$list = $api['data'];
echo 'count=' . count($list) . "\n";
$missing = 0;
foreach ($list as $p) {
    $city = isset($p['city']) ? $p['city'] : '';
    $loc = isset($p['locality']) ? $p['locality'] : '';
    $type = isset($p['type']) ? $p['type'] : '';
    if ($city === '' && $loc === '' && $type === '') {
        $missing++;
        echo 'no-match ' . $p['id'] . ' ' . $p['title'] . "\n";
    }
}
echo "missingMatch=$missing\n";
echo 'sample=' . $list[0]['id'] . ' city=' . $list[0]['city'] . ' loc=' . $list[0]['locality'] . ' type=' . $list[0]['type'] . "\n";
echo 'last=' . $list[count($list)-1]['id'] . ' city=' . ($list[count($list)-1]['city'] ?? '') . ' loc=' . ($list[count($list)-1]['locality'] ?? '') . ' type=' . ($list[count($list)-1]['type'] ?? '') . "\n";
