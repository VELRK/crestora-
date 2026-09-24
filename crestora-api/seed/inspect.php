<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
if ($m->connect_error) { fwrite(STDERR, $m->connect_error); exit(1); }

function keys_of($value, $prefix = '') {
    $out = array();
    if (is_array($value)) {
        $isList = array_keys($value) === range(0, count($value) - 1);
        if ($isList) {
            $out[] = $prefix . '[] count=' . count($value);
            if (isset($value[0])) {
                $out = array_merge($out, keys_of($value[0], $prefix . '[0]'));
            }
        } else {
            foreach ($value as $k => $v) {
                $path = $prefix === '' ? $k : $prefix . '.' . $k;
                if (is_array($v)) {
                    $out = array_merge($out, keys_of($v, $path));
                } else {
                    $sample = is_string($v) ? substr($v, 0, 60) : json_encode($v);
                    $out[] = $path . ' = ' . $sample;
                }
            }
        }
    }
    return $out;
}

$r = $m->query('SELECT page, section_key, title, is_visible, payload FROM sections ORDER BY page, sort_order');
while ($row = $r->fetch_assoc()) {
    echo "\n=== {$row['page']} / {$row['section_key']} | {$row['title']} | vis={$row['is_visible']} ===\n";
    $decoded = json_decode($row['payload'], true);
    if ($decoded === null) {
        echo "NOT JSON\n";
        continue;
    }
    foreach (keys_of($decoded) as $line) echo $line . "\n";
}

echo "\n=== SETTINGS ===\n";
$s = $m->query('SELECT setting_key, LEFT(setting_value, 80) v FROM settings');
while ($row = $s->fetch_assoc()) echo $row['setting_key'] . ' = ' . $row['v'] . "\n";

echo "\n=== PROJECT FIELDS (first) ===\n";
$p = $m->query('SELECT payload FROM projects ORDER BY sort_order LIMIT 1')->fetch_assoc();
foreach (keys_of(json_decode($p['payload'], true)) as $line) echo $line . "\n";

echo "\n=== BLOG FIELDS (first) ===\n";
$b = $m->query('SELECT payload FROM blogs ORDER BY sort_order LIMIT 1')->fetch_assoc();
foreach (keys_of(json_decode($b['payload'], true)) as $line) echo $line . "\n";

echo "\n=== COUNTS ===\n";
foreach (array('projects','blogs','enquiries','site_visits','admins','sections','settings') as $t) {
    $c = $m->query("SELECT COUNT(*) c FROM `$t`")->fetch_assoc();
    echo "$t {$c['c']}\n";
}
