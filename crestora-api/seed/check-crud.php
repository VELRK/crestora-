<?php
$cookie = 'c:/xampp/htdocs/crestora-api/seed/cookies.txt';
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/login');
curl_setopt_array($ch, array(CURLOPT_POST=>true, CURLOPT_POSTFIELDS=>'username=admin&password=admin123', CURLOPT_RETURNTRANSFER=>true, CURLOPT_FOLLOWLOCATION=>true, CURLOPT_COOKIEJAR=>$cookie, CURLOPT_COOKIEFILE=>$cookie));
curl_exec($ch); curl_close($ch);
$m = new mysqli('localhost','root','','crestora_db');
$id = $m->query("SELECT id FROM sections WHERE page='home' AND section_key='testimonials'")->fetch_assoc()['id'];
$faq = $m->query("SELECT id FROM sections WHERE page='home' AND section_key='faqs'")->fetch_assoc()['id'];
foreach (array('testimonials'=>$id, 'faqs'=>$faq) as $name=>$sid) {
  $ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/section/'.$sid);
  curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER=>true, CURLOPT_COOKIEFILE=>$cookie));
  $html = curl_exec($ch); curl_close($ch);
  echo "$name add=".(strpos($html,'Add item')!==false?'yes':'no')." delete=".(substr_count($html,'Delete this item'))."\n";
}
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/projects');
curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER=>true, CURLOPT_COOKIEFILE=>$cookie));
$html = curl_exec($ch); curl_close($ch);
echo 'projects add='.(strpos($html,'Add project')!==false?'yes':'no').' delete='.(substr_count($html,'project_delete'))."\n";
$ch = curl_init('http://localhost:8080/crestora-api/index.php/admin/blogs');
curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER=>true, CURLOPT_COOKIEFILE=>$cookie));
$html = curl_exec($ch); curl_close($ch);
echo 'blogs add='.(strpos($html,'Add blog')!==false?'yes':'no').' delete='.(substr_count($html,'blog_delete'))."\n";
