<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
if ($m->connect_error) {
    fwrite(STDERR, $m->connect_error);
    exit(1);
}
$m->set_charset('utf8mb4');

function rewrite_host($text) {
    return str_replace(
        array('http://localhost/crestora-api', 'http:\\/\\/localhost\\/crestora-api'),
        array('http://localhost:8080/crestora-api', 'http:\\/\\/localhost:8080\\/crestora-api'),
        $text
    );
}

foreach (array('sections', 'projects', 'blogs') as $table) {
    $idcol = $table === 'sections' ? 'id' : 'code';
    $res = $m->query("SELECT `$idcol` AS id, payload FROM `$table`");
    $stmt = $m->prepare("UPDATE `$table` SET payload = ? WHERE `$idcol` = ?");
    while ($row = $res->fetch_assoc()) {
        $next = rewrite_host($row['payload']);
        if ($next !== $row['payload']) {
            $stmt->bind_param('ss', $next, $row['id']);
            $stmt->execute();
            echo "rewrote $table {$row['id']}\n";
        }
    }
}

$res = $m->query("SELECT setting_key, setting_value FROM settings");
while ($row = $res->fetch_assoc()) {
    $next = rewrite_host($row['setting_value']);
    if ($next !== $row['setting_value']) {
        $key = $row['setting_key'];
        $stmt = $m->prepare('UPDATE settings SET setting_value = ? WHERE setting_key = ?');
        $stmt->bind_param('ss', $next, $key);
        $stmt->execute();
        echo "rewrote setting $key\n";
    }
}

$extraSettings = array(
    'owner_name' => 'Jagadeesh Palanisamy',
    'phone' => '+91 99430 53044 / +91 94425 23744',
    'phone_tel' => '+919943053044',
    'email' => 'crestoraproperties1@gmail.com',
    'whatsapp' => 'https://wa.me/919943053044?text=Hi%20Crestora%20Properties,%20I%20am%20interested%20in%20your%20villa%20plots.',
    'hours' => 'Monday – Sunday, 9:00 AM – 7:30 PM',
    'registered_office' => '6/459, PG Pudur, S S Kulam Via, Coimbatore - 641 107',
    'corporate_office' => '6/459, PG Pudur, S S Kulam Via, Coimbatore - 641 107',
);
$stmt = $m->prepare('INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?, ?)');
foreach ($extraSettings as $key => $value) {
    $stmt->bind_param('ss', $key, $value);
    $stmt->execute();
    echo "setting $key\n";
}

$row = $m->query("SELECT payload FROM sections WHERE page='contact' AND section_key='page'")->fetch_assoc();
$contact = json_decode($row['payload'], true);
$contact = array_merge(array(
    'ownerName' => 'Jagadeesh Palanisamy',
    'phone' => '+91 99430 53044 / +91 94425 23744',
    'phoneTel' => '+919943053044',
    'email' => 'crestoraproperties1@gmail.com',
    'hours' => 'Monday – Sunday, 9:00 AM – 7:30 PM',
    'whatsapp' => 'https://wa.me/919943053044?text=Hi%20Crestora%20Properties,%20I%20would%20like%20to%20know%20more%20about%20your%20projects.',
    'mapUrl' => 'https://www.google.com/maps/search/?api=1&query=6%2F459%2C+PG+Pudur%2C+S+S+Kulam+Via%2C+Coimbatore+641107',
    'mapEmbed' => 'https://www.google.com/maps?q=6%2F459%2C+PG+Pudur%2C+S+S+Kulam+Via%2C+Coimbatore+641107&output=embed',
    'infoHeading' => 'Contact Information',
    'infoLead' => 'Reach out to us directly for enquiries about DTCP & RERA villa plots and residences across Coimbatore.',
    'heroBadge' => 'CRESTORA PROPERTIES',
    'heroTitle' => 'Get in Touch',
    'heroSubtitle' => 'We would love to hear from you. Speak directly with our team or send us a message below.',
), $contact);
$contact['address'] = '6/459, PG Pudur, S S Kulam Via, Coimbatore - 641 107';
$json = json_encode($contact, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$stmt = $m->prepare("UPDATE sections SET payload = ? WHERE page='contact' AND section_key='page'");
$stmt->bind_param('s', $json);
$stmt->execute();
echo "contact fields " . count($contact) . "\n";

$row = $m->query("SELECT payload FROM sections WHERE page='about' AND section_key='page'")->fetch_assoc();
$about = json_decode($row['payload'], true);
$about['founderName'] = 'Jagadeesh Palanisamy';
$about['founderRole'] = 'Owner & Managing Director • Crestora Properties';
$about['founderQuote'] = 'Land is the cornerstone of every family’s generational legacy. When you invest with Crestora, you are not merely purchasing square footage; you are anchoring your family’s future in undisputed certainty.';
$json = json_encode($about, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$stmt = $m->prepare("UPDATE sections SET payload = ? WHERE page='about' AND section_key='page'");
$stmt->bind_param('s', $json);
$stmt->execute();
echo "about founder fields added\n";
echo "done\n";
