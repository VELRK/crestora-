<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
$m->set_charset('utf8mb4');
$row = $m->query("SELECT id, title, payload FROM sections WHERE page='about'")->fetch_assoc();
echo "id=" . $row['id'] . " title=" . $row['title'] . "\n";
$about = json_decode($row['payload'], true);
function walk($data, $prefix = '') {
    if (!is_array($data)) {
        $v = is_string($data) ? $data : json_encode($data);
        if (strlen($v) > 80) $v = substr($v, 0, 80) . '...';
        echo $prefix . " = " . $v . "\n";
        return;
    }
    $isList = array_keys($data) === range(0, count($data) - 1);
    if ($isList) {
        echo $prefix . " [list " . count($data) . "]\n";
        if (isset($data[0]) && is_array($data[0])) {
            echo $prefix . "[0] keys: " . implode(', ', array_keys($data[0])) . "\n";
        }
        return;
    }
    foreach ($data as $k => $v) {
        walk($v, $prefix === '' ? $k : $prefix . '.' . $k);
    }
}
walk($about);
