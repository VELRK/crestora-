<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('fieldform');
		$this->output->set_content_type('application/json');
	}

	private function emit($payload)
	{
		$json = json_encode($payload);
		$json = str_replace('http://localhost:8080/crestora-api', 'http://localhost:8080/crestora-properties/crestora-api', $json);
		$json = str_replace('http://localhost/crestora-api', 'http://localhost:8080/crestora-properties/crestora-api', $json);
		$json = str_replace('http:\\/\\/localhost:8080\\/crestora-api', 'http:\\/\\/localhost:8080\\/crestora-properties\\/crestora-api', $json);
		$json = str_replace('http:\\/\\/localhost\\/crestora-api', 'http:\\/\\/localhost:8080\\/crestora-properties\\/crestora-api', $json);
		echo $json;
	}

	private function ok($data, $extra = array())
	{
		$this->emit(array_merge(array('success' => TRUE, 'data' => $data), $extra));
	}

	private function section($page, $key)
	{
		$row = $this->db->get_where('sections', array(
			'page' => $page,
			'section_key' => $key,
			'is_visible' => 1,
		))->row_array();
		if ( ! $row) {
			return NULL;
		}
		$decoded = json_decode($row['payload'], TRUE);
		return $decoded === NULL ? $row['payload'] : $decoded;
	}

	private function section_list($page, $key)
	{
		$decoded = $this->section($page, $key);
		if ( ! is_array($decoded)) {
			return array();
		}
		if (isset($decoded['items']) && is_array($decoded['items'])) {
			return array_values($decoded['items']);
		}
		if ($decoded === array() || array_keys($decoded) === range(0, count($decoded) - 1)) {
			return $decoded;
		}
		return $decoded;
	}

	private function settings_map()
	{
		$rows = $this->db->get('settings')->result_array();
		$out = array();
		foreach ($rows as $row) {
			$out[$row['setting_key']] = $row['setting_value'];
		}
		return $out;
	}

	public function settings()
	{
		$this->ok($this->settings_map());
	}

	public function home()
	{
		$blogs = $this->active_blogs();
		$this->ok(array(
			'heroSlides' => $this->section_list('home', 'hero'),
			'categories' => $this->section('home', 'categories'),
			'locations' => $this->section('home', 'locations'),
			'aboutStrip' => $this->section('home', 'about_strip'),
			'stats' => $this->section('home', 'stats'),
			'ticker' => $this->section('home', 'ticker'),
			'whyCoimbatore' => $this->section('home', 'why_coimbatore'),
			'testimonials' => $this->section('home', 'testimonials'),
			'googleReviews' => $this->section('home', 'google_reviews'),
			'faqs' => $this->section('home', 'faqs'),
			'partners' => $this->section('home', 'partners'),
			'whyChoose' => $this->section('home', 'why_choose'),
			'buildCompanion' => $this->section('home', 'build_companion'),
			'nri' => $this->section('home', 'nri'),
			'landmark' => $this->section('home', 'landmark'),
			'featured' => $this->section('home', 'featured'),
			'insights' => $this->section('home', 'insights'),
			'latestBlogs' => array_slice($blogs, 0, 3),
			'sections' => $this->db->select('page, section_key, title, is_visible, sort_order')
				->order_by('sort_order', 'ASC')
				->get_where('sections', array('page' => 'home'))
				->result_array(),
		));
	}

	public function filters()
	{
		$this->ok($this->section('global', 'filters'));
	}

	public function categories()
	{
		$filters = $this->section('global', 'filters');
		$this->ok(isset($filters['categories']) ? $filters['categories'] : array());
	}

	public function locations()
	{
		$filters = $this->section('global', 'filters');
		$this->ok(isset($filters['localities']) ? $filters['localities'] : array());
	}

	public function projects()
	{
		$rows = $this->db->order_by('sort_order', 'ASC')->get_where('projects', array('is_active' => 1))->result_array();
		$list = array();
		foreach ($rows as $row) {
			$item = json_decode($row['payload'], TRUE);
			if ($item) {
				$list[] = crestora_sync_project($item);
			}
		}
		$status = $this->input->get('status');
		$category = $this->input->get('category');
		$locality = $this->input->get('locality');
		$keyword = $this->input->get('keyword');
		$maxPrice = $this->input->get('maxPrice');
		if ($status && $status !== 'all') {
			$list = array_values(array_filter($list, function ($p) use ($status) {
				return isset($p['status']) && strtolower($p['status']) === strtolower($status);
			}));
		}
		if ($category && $category !== 'all') {
			$list = array_values(array_filter($list, function ($p) use ($category) {
				return (isset($p['category']) && $p['category'] === $category) || (isset($p['type']) && $p['type'] === $category);
			}));
		}
		if ($locality && $locality !== 'all') {
			$list = array_values(array_filter($list, function ($p) use ($locality) {
				return (isset($p['locality']) && $p['locality'] === $locality) || (isset($p['city']) && $p['city'] === $locality);
			}));
		}
		if ($keyword) {
			$q = strtolower($keyword);
			$list = array_values(array_filter($list, function ($p) use ($q) {
				$hay = strtolower(($p['title'] ?? '') . ' ' . ($p['location'] ?? '') . ' ' . ($p['description'] ?? ''));
				return strpos($hay, $q) !== FALSE;
			}));
		}
		if ($maxPrice && $maxPrice !== 'all') {
			$max = (float) $maxPrice;
			$list = array_values(array_filter($list, function ($p) use ($max) {
				return isset($p['price']) && (float) $p['price'] <= $max;
			}));
		}
		$this->emit(array('success' => TRUE, 'total' => count($list), 'data' => $list));
	}

	private function find_project($id)
	{
		$row = $this->db->get_where('projects', array('code' => $id))->row_array();
		if ( ! $row) {
			$row = $this->db->get_where('projects', array('slug' => $id))->row_array();
		}
		if ( ! $row) {
			return NULL;
		}
		$item = json_decode($row['payload'], TRUE);
		if ( ! is_array($item)) {
			$item = array();
		}
		if (empty($item['id'])) {
			$item['id'] = $row['code'];
		}
		return crestora_sync_project($item);
	}

	public function project($id = '')
	{
		$item = $this->find_project($id);
		if ( ! $item) {
			echo json_encode(array('success' => FALSE, 'error' => 'Project not found'));
			return;
		}
		$this->ok($item);
	}

	public function similar($id = '')
	{
		$current = $this->find_project($id);
		if ( ! $current) {
			$this->ok(array());
			return;
		}
		$rows = $this->db->order_by('sort_order', 'ASC')->get_where('projects', array('is_active' => 1))->result_array();
		$scored = array();
		foreach ($rows as $row) {
			$item = json_decode($row['payload'], TRUE);
			if ( ! is_array($item)) {
				continue;
			}
			if (empty($item['id'])) {
				$item['id'] = $row['code'];
			}
			$item = crestora_sync_project($item);
			if ($item['id'] === $current['id'] || $row['code'] === $current['id'] || ( ! empty($current['slug']) && isset($item['slug']) && $item['slug'] === $current['slug'])) {
				continue;
			}
			$score = 0;
			if ( ! empty($current['locality']) && isset($item['locality']) && $item['locality'] === $current['locality']) {
				$score += 3;
			}
			if ( ! empty($current['type']) && isset($item['type']) && $item['type'] === $current['type']) {
				$score += 2;
			}
			if ( ! empty($current['category']) && isset($item['category']) && $item['category'] === $current['category']) {
				$score += 2;
			}
			if ( ! empty($current['city']) && isset($item['city']) && $item['city'] === $current['city']) {
				$score += 1;
			}
			$scored[] = array('score' => $score, 'sort' => (int) $row['sort_order'], 'item' => $item);
		}
		usort($scored, function ($a, $b) {
			if ($a['score'] === $b['score']) {
				return $a['sort'] - $b['sort'];
			}
			return $b['score'] - $a['score'];
		});
		$out = array();
		foreach ($scored as $row) {
			if (count($out) >= 3) {
				break;
			}
			$out[] = $row['item'];
		}
		$this->ok($out);
	}

	public function about()
	{
		$this->ok($this->section('about', 'page'));
	}

	private function active_blogs()
	{
		$rows = $this->db->order_by('sort_order', 'ASC')->get_where('blogs', array('is_active' => 1))->result_array();
		$list = array();
		foreach ($rows as $row) {
			$item = json_decode($row['payload'], TRUE);
			if ($item) {
				$list[] = $item;
			}
		}
		return $list;
	}

	public function blogs()
	{
		$meta = $this->section('blogs', 'meta');
		$this->ok(array(
			'categories' => isset($meta['categories']) ? $meta['categories'] : array(),
			'newsletter' => isset($meta['newsletter']) ? $meta['newsletter'] : array(),
			'posts' => $this->active_blogs(),
		));
	}

	public function blog($id = '')
	{
		$row = $this->db->get_where('blogs', array('code' => $id))->row_array();
		if ( ! $row) {
			$row = $this->db->get_where('blogs', array('slug' => $id))->row_array();
		}
		if ( ! $row) {
			echo json_encode(array('success' => FALSE, 'error' => 'Blog not found'));
			return;
		}
		$this->ok(json_decode($row['payload'], TRUE));
	}

	public function contact()
	{
		$this->ok(array(
			'page' => $this->section('contact', 'page'),
			'settings' => $this->settings_map(),
		));
	}

	public function enquiries()
	{
		if ($this->input->method() !== 'post') {
			echo json_encode(array('success' => FALSE, 'error' => 'POST required'));
			return;
		}
		$body = json_decode($this->input->raw_input_stream, TRUE);
		if ( ! is_array($body)) {
			$body = $this->input->post();
		}
		$this->db->insert('enquiries', array(
			'name' => isset($body['name']) ? $body['name'] : '',
			'phone' => isset($body['phone']) ? $body['phone'] : '',
			'email' => isset($body['email']) ? $body['email'] : '',
			'message' => isset($body['message']) ? $body['message'] : '',
			'project_name' => isset($body['projectName']) ? $body['projectName'] : '',
			'source' => isset($body['source']) ? $body['source'] : 'contact',
			'status' => 'new',
			'created_at' => date('Y-m-d H:i:s'),
		));
		echo json_encode(array(
			'success' => TRUE,
			'enquiryId' => 'ENQ-' . $this->db->insert_id(),
			'message' => 'Thank you for reaching out. We will share the project brochure and price details shortly.',
		));
	}

	public function site_visits()
	{
		if ($this->input->method() !== 'post') {
			echo json_encode(array('success' => FALSE, 'error' => 'POST required'));
			return;
		}
		$body = json_decode($this->input->raw_input_stream, TRUE);
		if ( ! is_array($body)) {
			$body = $this->input->post();
		}
		$project = isset($body['projectName']) ? $body['projectName'] : '';
		$this->db->insert('site_visits', array(
			'name' => isset($body['name']) ? $body['name'] : '',
			'phone' => isset($body['phone']) ? $body['phone'] : '',
			'email' => isset($body['email']) ? $body['email'] : '',
			'project_name' => $project,
			'visit_date' => isset($body['visitDate']) ? $body['visitDate'] : '',
			'message' => isset($body['message']) ? $body['message'] : '',
			'status' => 'new',
			'created_at' => date('Y-m-d H:i:s'),
		));
		$id = 'ADS-CBE-' . $this->db->insert_id();
		echo json_encode(array(
			'success' => TRUE,
			'bookingId' => $id,
			'message' => 'Site visit to ' . ($project ?: 'project') . ' booked successfully. Our Coimbatore advisor will connect within 2 business hours.',
		));
	}
}
