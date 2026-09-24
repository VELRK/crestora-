<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
$from = array('http://localhost:8080/crestora-api', 'http://localhost/crestora-api', 'http:\\/\\/localhost:8080\\/crestora-api', 'http:\\/\\/localhost\\/crestora-api');
$to = array('http://localhost:8080/crestora-properties/crestora-api', 'http://localhost:8080/crestora-properties/crestora-api', 'http:\\/\\/localhost:8080\\/crestora-properties\\/crestora-api', 'http:\\/\\/localhost:8080\\/crestora-properties\\/crestora-api');
$keys = array('sections' => 'id', 'projects' => 'code', 'blogs' => 'code', 'settings' => 'setting_key');
foreach (array('sections' => 'payload', 'projects' => 'payload', 'blogs' => 'payload', 'settings' => 'setting_value') as $table => $col) {
    $res = $m->query("SELECT * FROM {$table}");
    $n = 0;
    while ($row = $res->fetch_assoc()) {
        $value = $row[$col];
        $next = str_replace($from, $to, $value);
        if ($next === $value) continue;
        $idcol = $keys[$table];
        $stmt = $m->prepare("UPDATE {$table} SET {$col}=? WHERE {$idcol}=?");
        $stmt->bind_param('ss', $next, $row[$idcol]);
        $stmt->execute();
        $n++;
    }
    echo "$table updated=$n\n";
}
