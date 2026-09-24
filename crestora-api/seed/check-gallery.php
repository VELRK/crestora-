<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
$row = $m->query("SELECT payload FROM projects WHERE code='p1'")->fetch_assoc();
$p = json_decode($row['payload'], true);
echo 'gallery type=' . gettype($p['gallery']) . ' count=' . count($p['gallery']) . "\n";
echo 'first=' . (is_string($p['gallery'][0]) ? $p['gallery'][0] : json_encode($p['gallery'][0])) . "\n";
echo 'image=' . $p['image'] . "\n";
echo 'is_image gallery0=' . (preg_match('/\[(gallery)\]\[\d+\]$/', 'payload[gallery][0]') ? 'yes' : 'no') . "\n";
echo 'is_image value=' . (preg_match('/\.(jpe?g|png|gif|webp)(\?.*)?$/i', $p['gallery'][0]) ? 'yes' : 'no') . "\n";
