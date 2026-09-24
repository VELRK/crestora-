<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
$m->set_charset('utf8mb4');

function is_list($value) {
    return is_array($value) && array_keys($value) === range(0, count($value) - 1);
}

function save_section($m, $page, $key, $payload) {
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $stmt = $m->prepare('UPDATE sections SET payload = ? WHERE page = ? AND section_key = ?');
    $stmt->bind_param('sss', $json, $page, $key);
    $stmt->execute();
    echo "updated $page/$key\n";
}

function load_section($m, $page, $key) {
    $stmt = $m->prepare('SELECT payload FROM sections WHERE page = ? AND section_key = ?');
    $stmt->bind_param('ss', $page, $key);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    return $row ? json_decode($row['payload'], true) : null;
}

function wrap_items($m, $page, $key, $meta) {
    $data = load_section($m, $page, $key);
    if (!is_array($data)) {
        echo "missing $page/$key\n";
        return;
    }
    if (isset($data['items']) && is_array($data['items'])) {
        $data = array_merge($data, $meta);
        save_section($m, $page, $key, $data);
        return;
    }
    if (!is_list($data)) {
        echo "not a list $page/$key\n";
        return;
    }
    save_section($m, $page, $key, array_merge($meta, array('items' => $data)));
}

wrap_items($m, 'home', 'categories', array(
    'eyebrow' => 'PROPERTY CATEGORIES',
    'titleLead' => 'Explore by',
    'titleHighlight' => 'Category',
    'intro' => 'Curated residential plots, luxury villas, eco farmlands, and commercial developments across prime corridors.',
));
wrap_items($m, 'home', 'locations', array(
    'eyebrow' => 'STRATEGIC GROWTH CORRIDORS',
    'titleLead' => 'Explore Prime',
    'titleHighlight' => 'Locations',
    'intro' => "Browse DTCP and RERA-approved plotted developments across Coimbatore's highest-appreciation residential and IT growth corridors.",
));
wrap_items($m, 'home', 'faqs', array(
    'eyebrow' => 'FREQUENTLY ASKED QUESTIONS',
    'titleLead' => 'Answers &',
    'titleHighlight' => 'Advisory',
    'intro' => 'Key insights into DTCP sanctions, TN RERA compliance, bank home loan pre-approvals, and NRI acquisition protocols at Crestora Properties.',
));
wrap_items($m, 'home', 'partners', array(
    'eyebrow' => 'INSTITUTIONAL PRE-APPROVALS',
    'titleLead' => 'Banking & Home Loan Partners',
    'titleHighlight' => '',
    'intro' => 'All Crestora Properties projects are pre-sanctioned for hassle-free home and plot loans.',
));
wrap_items($m, 'home', 'testimonials', array(
    'eyebrow' => 'HAPPY INVESTORS',
    'titleLead' => 'Client Stories &',
    'titleHighlight' => 'Testimonials',
    'intro' => 'Hear from families and NRI investors who trusted Crestora Properties for secure, DTCP & RERA-approved plotted developments and luxury residences.',
));

$about = load_section($m, 'home', 'about_strip');
if (is_array($about)) {
    $about['eyebrow'] = 'ABOUT US';
    $about['title'] = 'All About Crestora Properties';
    $about['titleHighlight'] = 'Crestora Properties';
    $about['paragraphs'] = array(
        'Crestora Properties develops DTCP and RERA-approved gated community villa plots and bespoke luxury residences across Coimbatore and Tamil Nadu\'s fastest growing corridors.',
        'Combining strategic locations, crystal-clear legal titles, and completely transparent documentation, we engineer spaces where families flourish, communities bond, and generational capital appreciation is assured.',
    );
    $about['features'] = array(
        '100% DTCP & RERA Sanctioned',
        'Instant Patta Transfer & Registry',
        '100% Vasthu Compliant Layouts',
        'Approved by SBI, HDFC & ICICI',
    );
    $about['badgeValue'] = '6+ YRS';
    $about['badgeText'] = 'Of Ethical Real Estate Leadership';
    save_section($m, 'home', 'about_strip', $about);
}

$why = load_section($m, 'home', 'why_coimbatore');
if (is_array($why)) {
    $why['image'] = 'http://localhost:8080/crestora-api/uploads/whycbe.png';
    $why['corridorsTitle'] = 'Explore Properties by High-Growth Corridors';
    $why['chipLabel'] = 'COIMBATORE SPOTLIGHT';
    save_section($m, 'home', 'why_coimbatore', $why);
}

$modules = array(
    array('landmark', 'Landmark projects', 16, array(
        'eyebrow' => 'FEATURED DEVELOPMENTS',
        'titleLead' => 'Discover Landmark',
        'titleHighlight' => 'Properties',
        'intro' => "Explore Crestora Properties' plotted developments across Coimbatore and Tamil Nadu offering strategic locations, clear DTCP & RERA titles, and master layouts engineered for long-term appreciation.",
    )),
    array('featured', 'Featured properties', 18, array(
        'eyebrow' => 'PRESTIGIOUS PROJECTS',
        'titleLead' => 'Featured Prime',
        'titleHighlight' => 'Residences & Plots',
        'buttonText' => 'VIEW ALL PROJECTS',
    )),
    array('insights', 'Latest insights', 20, array(
        'eyebrow' => 'INSIGHT HUB',
        'titleLead' => 'Market Insights &',
        'titleHighlight' => 'Advisory',
        'intro' => 'Stay informed with expert analysis on Coimbatore infrastructure projects, Avinashi road elevated expressway, DTCP legal procedures, and high-yield real estate investments.',
        'buttonText' => 'Explore All Insights & Blogs',
    )),
);

$stmt = $m->prepare('INSERT INTO sections (page, section_key, title, payload, is_visible, sort_order) VALUES (\'home\', ?, ?, ?, 1, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), payload = VALUES(payload)');
foreach ($modules as $mod) {
    $json = json_encode($mod[3], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $stmt->bind_param('sssi', $mod[0], $mod[1], $json, $mod[2]);
    $stmt->execute();
    echo "module home/{$mod[0]}\n";
}
echo "done\n";
