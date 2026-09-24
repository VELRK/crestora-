<?php
$api = json_decode(file_get_contents('http://localhost:8080/crestora-api/index.php/api/projects'), true);
echo 'total=' . $api['total'] . "\n";
foreach ($api['data'] as $p) {
    echo ($p['id'] ?? '-') . ' | ' . ($p['title'] ?? '-') . ' | ' . ($p['location'] ?? '-') . "\n";
}
