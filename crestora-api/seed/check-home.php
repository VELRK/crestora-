<?php
$home = json_decode(file_get_contents('http://localhost:8080/crestora-api/index.php/api/home'), true);
$d = $home['data'];
$keys = array('heroSlides','categories','locations','aboutStrip','stats','ticker','whyCoimbatore','testimonials','googleReviews','faqs','partners','landmark','featured','insights','latestBlogs');
foreach ($keys as $key) {
    $value = $d[$key];
    if (isset($value['items'])) {
        echo "$key items=" . count($value['items']) . " title=" . ($value['titleLead'] ?? $value['title'] ?? '') . "\n";
    } elseif (isset($value['titleLead'])) {
        echo "$key title=" . $value['titleLead'] . "\n";
    } elseif (is_array($value) && isset($value[0])) {
        echo "$key count=" . count($value) . "\n";
    } else {
        echo "$key ok " . ($value['title'] ?? $value['eyebrow'] ?? $value['image'] ?? 'object') . "\n";
    }
}
echo "category0=" . $d['categories']['items'][0]['title'] . "\n";
echo "whyImage=" . $d['whyCoimbatore']['image'] . "\n";
echo "aboutImage=" . $d['aboutStrip']['image'] . "\n";
echo "hero=" . $d['heroSlides'][0]['bgImage'] . "\n";
