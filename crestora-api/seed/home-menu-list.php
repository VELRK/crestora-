<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
$r = $m->query("SELECT sort_order, section_key, title FROM sections WHERE page='home' ORDER BY sort_order");
while ($row = $r->fetch_assoc()) {
	echo $row['sort_order'] . ' ' . $row['section_key'] . ' | ' . $row['title'] . "\n";
}
