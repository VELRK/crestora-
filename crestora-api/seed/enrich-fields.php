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
    'hours' => 'Monday – Sunday, 9:00 AM – 7:30 PM',
    'registered_office' => '16 A 1, 2nd Floor, Huzur Road, Behind Taj Vivanta, Gopalapuram, Coimbatore - 641 018',
    'corporate_office' => '3rd Floor, Harita Center, Avinashi Rd, Opp. to GKNM Hospital, Coimbatore - 641 037',
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
    'phoneTel' => '+919159066666',
    'hours' => 'Monday – Sunday, 9:00 AM – 7:30 PM',
    'whatsapp' => 'https://wa.me/919159066666?text=Hi%20Crestora%20Properties,%20I%20would%20like%20to%20know%20more%20about%20your%20projects.',
    'whatsappLabel' => 'Chat on WhatsApp (+91 91590 66666)',
    'mapUrl' => 'https://maps.google.com/?q=GKNM+Hospital+Avinashi+Road+Coimbatore',
    'mapEmbed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.353368297072!2d76.9822452!3d11.0120893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859b867c2d829%3A0x7d6f51f49615a13c!2sGKNM%20Hospital%2C%20Avinashi%20Rd%2C%20Pappanaickenpalayam%2C%20Coimbatore%2C%20Tamil%20Nadu%20641037!5e0!3m2!1sen!2sin!4v1711111111111!5m2!1sen!2sin',
    'infoHeading' => 'Contact Information',
    'infoLead' => 'Reach out to us directly for enquiries about DTCP & RERA villa plots and residences across Coimbatore.',
    'heroBadge' => 'CRESTORA PROPERTIES',
    'heroTitle' => 'Get in Touch',
    'heroSubtitle' => 'We would love to hear from you. Speak directly with our team or send us a message below.',
), $contact);
if (empty($contact['address']) || strpos($contact['address'], 'Harita') === false) {
    $contact['address'] = '3rd Floor, Harita Center, Avinashi Road, Opposite to GKNM Hospital, Coimbatore - 641 037';
}
$json = json_encode($contact, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$stmt = $m->prepare("UPDATE sections SET payload = ? WHERE page='contact' AND section_key='page'");
$stmt->bind_param('s', $json);
$stmt->execute();
echo "contact fields " . count($contact) . "\n";

$row = $m->query("SELECT payload FROM sections WHERE page='about' AND section_key='page'")->fetch_assoc();
$about = json_decode($row['payload'], true);
if (empty($about['founderName'])) {
    $about['founderName'] = 'Dr. K. Ravindran';
    $about['founderRole'] = 'Founder & Managing Director • Crestora Properties';
    $about['founderQuote'] = 'Land is the cornerstone of every family’s generational legacy. When you invest with Crestora, you are not merely purchasing square footage; you are anchoring your family’s future in undisputed certainty.';
    $json = json_encode($about, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $stmt = $m->prepare("UPDATE sections SET payload = ? WHERE page='about' AND section_key='page'");
    $stmt->bind_param('s', $json);
    $stmt->execute();
    echo "about founder fields added\n";
}
echo "done\n";
