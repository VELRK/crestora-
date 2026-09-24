<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
$n = $m->query('SELECT COUNT(*) c FROM projects')->fetch_assoc()['c'];
echo "db=$n\n";
$cookie = 'c:/xampp/htdocs/crestora-api/seed/cookies.txt';
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/blog/b1');
curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => true, CURLOPT_COOKIEFILE => $cookie));
$html = curl_exec($ch);
curl_close($ch);
$res = $m->query('SELECT code, title FROM projects ORDER BY sort_order');
$missing = 0;
while ($row = $res->fetch_assoc()) {
    if (strpos($html, 'value="' . $row['code'] . '"') === false) {
        echo 'missing ' . $row['code'] . "\n";
        $missing++;
    }
}
echo "missing=$missing html=" . strlen($html) . "\n";
