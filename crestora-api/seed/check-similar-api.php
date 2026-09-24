<?php
foreach (array('regal-arch', 'p1', 'p1790212664') as $id) {
    $url = 'http://localhost:8080/crestora-api/index.php/api/projects/' . rawurlencode($id) . '/similar';
    $json = json_decode(file_get_contents($url), true);
    $titles = array();
    foreach ($json['data'] as $p) {
        $titles[] = $p['id'] . ':' . $p['title'];
    }
    echo $id . ' count=' . count($json['data']) . ' ' . implode(' | ', $titles) . "\n";
}
