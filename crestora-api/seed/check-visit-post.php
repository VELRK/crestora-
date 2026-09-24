<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
if ($m->connect_error) { echo 'db '.$m->connect_error."\n"; exit; }
$t = $m->query("SHOW TABLES LIKE 'site_visits'");
echo 'table=' . ($t && $t->num_rows ? 'yes' : 'no') . "\n";
if ($t && $t->num_rows) {
    $c = $m->query('SHOW COLUMNS FROM site_visits');
    while ($r = $c->fetch_assoc()) echo $r['Field'].' '.$r['Type']."\n";
    echo 'before=' . $m->query('SELECT COUNT(*) c FROM site_visits')->fetch_assoc()['c'] . "\n";
}
$payload = json_encode(array(
    'name' => 'Test Visitor',
    'phone' => '9876543210',
    'email' => 'test@example.com',
    'projectName' => 'Crestora Regal Arch',
    'visitDate' => '2026-10-01',
    'preferredSlot' => 'Morning (10:00 AM - 1:00 PM)',
    'message' => 'pickup test',
));
$ch = curl_init('http://localhost:8080/crestora-api/index.php/api/site-visits');
curl_setopt_array($ch, array(
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
));
$res = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo "http=$code body=$res\n";
if ($t && $t->num_rows) {
    echo 'after=' . $m->query('SELECT COUNT(*) c FROM site_visits')->fetch_assoc()['c'] . "\n";
    $row = $m->query('SELECT * FROM site_visits ORDER BY id DESC LIMIT 1')->fetch_assoc();
    echo 'last=' . json_encode($row) . "\n";
}
