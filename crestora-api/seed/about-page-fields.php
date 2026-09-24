<?php
$m = new mysqli('localhost', 'root', '', 'crestora_db');
if ($m->connect_error) {
    fwrite(STDERR, $m->connect_error);
    exit(1);
}
$m->set_charset('utf8mb4');
$row = $m->query("SELECT payload FROM sections WHERE page='about' AND section_key='page'")->fetch_assoc();
$about = json_decode($row['payload'], true);
if (!is_array($about)) {
    fwrite(STDERR, "about payload missing\n");
    exit(1);
}
$base = 'http://localhost:8080/crestora-api/uploads/';
$defaults = array(
    'breadcrumb' => 'ABOUT US',
    'heroBadge' => 'ESTABLISHED 2012 • CRAFTING TIMELESS LANDMARKS',
    'heroTitleLead' => 'Architecting Generational',
    'heroTitleHighlight' => 'Wealth & Trust',
    'heroLead' => "Crestora Properties is Tamil Nadu's benchmark developer for DTCP and RERA-approved gated plotted communities and bespoke residences. We bridge pristine legal transparency with enduring classical architecture.",
    'heroMetrics' => array(
        array('value' => '6+', 'label' => 'Years of Excellence'),
        array('value' => '8+', 'label' => 'Landmark Enclaves'),
        array('value' => '100+', 'label' => 'Sanctioned Plots'),
        array('value' => '100%', 'label' => 'Title Transparency'),
    ),
    'heritageEyebrow' => 'THE CRESTORA HERITAGE',
    'heritageTitleLead' => 'Where Visionary Planning Meets',
    'heritageTitleHighlight' => 'Unshakeable Integrity',
    'heritageLead' => 'Headquartered in Coimbatore, Crestora Properties was founded with an uncompromising philosophy: to rid the plotted real estate sector of speculation and deliver communities built on 100% sanctioned legal foundations.',
    'heritageBody' => 'Over the past 12+ years, we have meticulously surveyed, developed, and handed over thousands of premium DTCP & RERA villa plots and master-planned residences across Coimbatore. Every layout is engineered with wide bitumen boulevards, landscaped parks, underground conduits, and natural rainwater harvesting systems.',
    'anchors' => array(
        array(
            'title' => '100% DTCP & RERA Registered',
            'text' => 'Every single layout is verified and registered with TN RERA before launch.',
        ),
        array(
            'title' => 'Spotless 30-Year Title Pedigree',
            'text' => 'Scrutinized by senior legal advocates for instant registry and peaceful patta transfer.',
        ),
        array(
            'title' => 'Signature British Architecture',
            'text' => 'Classical neoclassical entry arches and timeless European design aesthetics.',
        ),
        array(
            'title' => '100% Vasthu & Natural Harmony',
            'text' => 'Carefully oriented street grids and sweet groundwater reserves for family prosperity.',
        ),
    ),
    'mainImage' => $base . 'about.png',
    'secondaryImage' => $base . 'banner-1.png',
    'secondaryBadgeTag' => 'Neoclassical Facade',
    'secondaryBadgeName' => 'Regal Arch Gateway',
    'sealNumber' => '6+',
    'sealText' => 'YEARS OF ETHICAL EXCELLENCE',
    'reraTitle' => '100% TN-RERA APPROVED',
    'reraSubtitle' => 'Fully Sanctioned Plots',
    'philosophyEyebrow' => 'GUIDING PRINCIPLES',
    'philosophyTitleLead' => 'Our Vision, Mission &',
    'philosophyTitleHighlight' => 'Core Philosophy',
    'philosophyIntro' => 'The foundational pillars that guide every land acquisition, master layout design, and customer partnership.',
    'pillarsEyebrow' => 'THE CRESTORA BENCHMARK',
    'pillarsTitleLead' => 'The 6 Pillars of',
    'pillarsTitleHighlight' => 'Crestora Excellence',
    'pillarsIntro' => 'Why thousands of discerning property buyers, NRI families, and investors place their trust in Crestora developments.',
    'accreditationsEyebrow' => 'CERTIFICATIONS & REGISTRATIONS',
    'accreditationsTitle' => 'Institutional Accreditations & Legal Assurances',
    'ctaEyebrow' => 'START YOUR PROPERTY JOURNEY',
    'ctaTitleLead' => 'Ready to Experience',
    'ctaTitleHighlight' => 'Crestora Excellence',
    'ctaTitleTrail' => 'In Person?',
    'ctaText' => 'Schedule a complimentary private chauffeur-driven site visit to any of our DTCP and RERA-approved gated communities across Coimbatore.',
    'ctaProjectsLabel' => 'EXPLORE ALL PROJECTS',
    'ctaVisitLabel' => 'SCHEDULE SITE VISIT',
    'ctaPhoneLabel' => 'CALL DIRECT HELPLINE',
    'ctaPhone' => '+919159066666',
);
$added = 0;
foreach ($defaults as $key => $value) {
    if (!isset($about[$key]) || $about[$key] === '' || $about[$key] === array()) {
        $about[$key] = $value;
        $added++;
    }
}
$json = json_encode($about, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$stmt = $m->prepare("UPDATE sections SET payload = ? WHERE page='about' AND section_key='page'");
$stmt->bind_param('s', $json);
$stmt->execute();
echo "added=$added bytes=" . strlen($json) . "\n";
echo "hero=" . $about['heroTitleLead'] . " metrics=" . count($about['heroMetrics']) . " anchors=" . count($about['anchors']) . "\n";
echo "image=" . $about['mainImage'] . "\n";
