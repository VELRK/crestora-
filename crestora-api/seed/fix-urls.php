<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
$from = 'http://localhost/crestora-api';
$to = 'http://localhost:8080/crestora-api';
$m->query("UPDATE settings SET setting_value = REPLACE(setting_value, '$from', '$to')");
echo "settings {$m->affected_rows}\n";
$m->query("UPDATE sections SET payload = REPLACE(payload, '$from', '$to')");
echo "sections {$m->affected_rows}\n";
