<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('fieldform');
	}

	private function require_login()
	{
		if ( ! $this->session->userdata('admin_id')) {
			redirect('admin/login');
		}
	}

	public function index()
	{
		$this->require_login();
		$data['projects'] = $this->count_saved_projects();
		$data['projects_active'] = $this->count_saved_projects_active();
		$data['blogs'] = $this->count_saved_blogs();
		$data['enquiries'] = $this->db->count_all('enquiries');
		$data['visits'] = $this->db->count_all('site_visits');
		$data['leads_new'] = (int) $this->db->where('status', 'new')->count_all_results('enquiries')
			+ (int) $this->db->where('status', 'new')->count_all_results('site_visits');
		$data['by_category'] = $this->dashboard_group_counts('projects', 'category');
		$data['by_status'] = $this->dashboard_group_counts('projects', 'status');
		$data['leads_week'] = $this->dashboard_leads_week();
		$data['recent_enquiries'] = $this->db->order_by('created_at', 'DESC')->limit(5)->get('enquiries')->result_array();
		$data['recent_visits'] = $this->db->order_by('created_at', 'DESC')->limit(5)->get('site_visits')->result_array();
		$data['category_labels'] = crestora_category_labels();
		$this->load->view('admin/layout', array('title' => 'Dashboard', 'body' => $this->load->view('admin/dashboard', $data, TRUE)));
	}

	private function dashboard_group_counts($table, $column)
	{
		$this->db->select($column . ' AS label, COUNT(*) AS total', FALSE)
			->from($table)
			->where($column . ' !=', '');
		if ($table === 'projects') {
			$this->db->where('category !=', '');
		}
		$rows = $this->db->group_by($column)
			->order_by('total', 'DESC')
			->get()
			->result_array();
		return is_array($rows) ? $rows : array();
	}

	private function is_project_draft($row)
	{
		if ( ! is_array($row)) {
			return FALSE;
		}
		if (trim(isset($row['category']) ? $row['category'] : '') !== '') {
			return FALSE;
		}
		return strcasecmp(trim(isset($row['title']) ? $row['title'] : ''), 'New project') === 0;
	}

	private function is_blog_draft($row)
	{
		if ( ! is_array($row)) {
			return FALSE;
		}
		return strcasecmp(trim(isset($row['title']) ? $row['title'] : ''), 'New blog') === 0;
	}

	private function count_saved_projects()
	{
		return (int) $this->db->where('category !=', '')->count_all_results('projects');
	}

	private function count_saved_projects_active()
	{
		return (int) $this->db->where('category !=', '')->where('is_active', 1)->count_all_results('projects');
	}

	private function count_saved_blogs()
	{
		return (int) $this->db->where('title !=', 'New blog')->count_all_results('blogs');
	}

	private function dashboard_leads_week()
	{
		$series = array();
		for ($i = 6; $i >= 0; $i--) {
			$date = date('Y-m-d', strtotime('-' . $i . ' days'));
			$series[$date] = array(
				'date' => $date,
				'label' => date('D', strtotime($date)),
				'contacts' => 0,
				'visits' => 0,
				'total' => 0,
			);
		}
		$start = date('Y-m-d', strtotime('-6 days')) . ' 00:00:00';
		$enq = $this->db->query(
			'SELECT DATE(created_at) AS d, COUNT(*) AS c FROM enquiries WHERE created_at >= ? GROUP BY DATE(created_at)',
			array($start)
		)->result_array();
		foreach ($enq as $row) {
			$d = isset($row['d']) ? $row['d'] : '';
			if ($d !== '' && isset($series[$d])) {
				$series[$d]['contacts'] = (int) $row['c'];
			}
		}
		$vis = $this->db->query(
			'SELECT DATE(created_at) AS d, COUNT(*) AS c FROM site_visits WHERE created_at >= ? GROUP BY DATE(created_at)',
			array($start)
		)->result_array();
		foreach ($vis as $row) {
			$d = isset($row['d']) ? $row['d'] : '';
			if ($d !== '' && isset($series[$d])) {
				$series[$d]['visits'] = (int) $row['c'];
			}
		}
		foreach ($series as $date => $item) {
			$series[$date]['total'] = $item['contacts'] + $item['visits'];
		}
		return array_values($series);
	}

	public function login()
	{
		$error = '';
		if ($this->input->method() === 'post') {
			$user = $this->db->get_where('admins', array('username' => $this->input->post('username')))->row_array();
			if ($user && password_verify($this->input->post('password'), $user['password_hash'])) {
				$this->session->set_userdata(array('admin_id' => $user['id'], 'admin_name' => $user['name']));
				redirect('admin');
			}
			$error = 'Invalid username or password';
		}
		$this->load->view('admin/login', array('error' => $error));
	}

	public function logout()
	{
		$this->session->sess_destroy();
		redirect('admin/login');
	}

	public function settings()
	{
		$this->require_login();
		if ($this->input->method() === 'post') {
			$posted = $this->input->post('settings');
			if ( ! is_array($posted)) {
				$posted = array();
			}
			if (isset($_FILES['upload']['name']) && is_array($_FILES['upload']['name'])) {
				foreach ($_FILES['upload']['name'] as $key => $filename) {
					if ($filename && (int) $_FILES['upload']['error'][$key] === UPLOAD_ERR_OK) {
						$url = fieldform_store_upload($_FILES['upload']['tmp_name'][$key], $filename);
						if ($url) {
							$posted[$key] = $url;
						}
					}
				}
			}
			foreach ($posted as $key => $value) {
				$this->db->replace('settings', array('setting_key' => $key, 'setting_value' => $value));
			}
			$this->session->set_flashdata('msg', 'Settings saved');
			redirect('admin/settings');
		}
		$data['settings'] = $this->db->get('settings')->result_array();
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => 'Site settings', 'body' => $this->load->view('admin/settings', $data, TRUE)));
	}

	public function section($id = 0)
	{
		$this->require_login();
		$row = $this->db->get_where('sections', array('id' => (int) $id))->row_array();
		if ( ! $row) {
			show_404();
		}
		if ($this->input->method() === 'post') {
			$original = json_decode($row['payload'], TRUE);
			$posted = $this->input->post('payload');
			$payload = is_array($original)
				? fieldform_json(fieldform_finish(fieldform_apply($original, is_array($posted) ? $posted : array())))
				: $this->input->post('payload');
			$this->db->where('id', (int) $id)->update('sections', array(
				'title' => $this->input->post('title'),
				'is_visible' => $this->input->post('is_visible') ? 1 : 0,
				'payload' => $payload,
			));
			$this->session->set_flashdata('msg', 'Section saved');
			redirect('admin/section/' . $id);
		}
		$data['row'] = $row;
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => 'Edit section', 'body' => $this->load->view('admin/section', $data, TRUE)));
	}

	public function project_create()
	{
		$this->require_login();
		$last = $this->db->order_by('sort_order', 'DESC')->limit(1)->get('projects')->row_array();
		$payload = fieldform_blank($this->project_template());
		$code = 'p' . time();
		$payload['id'] = $code;
		$payload['title'] = 'New project';
		$payload['slug'] = 'new-project-' . time();
		$payload['status'] = 'upcoming';
		$payload['isFeatured'] = FALSE;
		$payload['isPopular'] = FALSE;
		$sort = $last ? ((int) $last['sort_order'] + 1) : 1;
		$this->db->insert('projects', array(
			'code' => $code,
			'slug' => $payload['slug'],
			'title' => $payload['title'],
			'category' => '',
			'locality' => '',
			'status' => 'upcoming',
			'price' => 0,
			'is_featured' => 0,
			'is_popular' => 0,
			'is_active' => 0,
			'sort_order' => $sort,
			'payload' => fieldform_json($payload),
		));
		redirect('admin/project/' . $code);
	}

	public function project_discard($code = '')
	{
		$this->require_login();
		$row = $this->db->get_where('projects', array('code' => $code))->row_array();
		if ($row && $this->is_project_draft($row)) {
			$this->db->delete('projects', array('code' => $code));
			$this->session->set_flashdata('msg', 'Draft discarded');
		}
		redirect('admin/projects');
	}

	public function project_delete($code = '')
	{
		$this->require_login();
		if ($this->input->method() === 'post' && $code !== '') {
			$this->db->delete('projects', array('code' => $code));
			$this->session->set_flashdata('msg', 'Project deleted');
		}
		redirect('admin/projects');
	}

	public function projects()
	{
		$this->require_login();
		$data['rows'] = $this->db->order_by('sort_order', 'ASC')->get('projects')->result_array();
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => 'Projects', 'body' => $this->load->view('admin/projects', $data, TRUE)));
	}

	public function project($code = '')
	{
		$this->require_login();
		$row = $this->db->get_where('projects', array('code' => $code))->row_array();
		if ( ! $row) {
			show_404();
		}
		if ($this->input->method() === 'post') {
			$original = $this->fill_project(json_decode($row['payload'], TRUE), $row);
			$posted = $this->input->post('payload');
			$payload = crestora_sync_project(fieldform_finish(fieldform_apply($original, is_array($posted) ? $posted : array())));
			$payload = crestora_prune_project_payload($payload, $original);
			$title = trim(isset($payload['title']) ? $payload['title'] : '');
			$location = trim(isset($payload['location']) ? $payload['location'] : '');
			$category = trim(isset($payload['category']) ? $payload['category'] : '');
			$missing = array();
			if ($title === '') {
				$missing[] = 'Title';
			}
			if ($location === '') {
				$missing[] = 'Location';
			}
			if ($category === '') {
				$missing[] = 'Category';
			}
			if ($missing) {
				$row['slug'] = (string) $this->input->post('slug');
				$row['is_active'] = $this->input->post('is_active') ? 1 : 0;
				$row['sort_order'] = (int) $this->input->post('sort_order');
				$payload['title'] = $title;
				$payload['location'] = $location;
				$data['row'] = $row;
				$data['item'] = $payload;
				$data['heading'] = ($row['title'] === 'New project' || $title === '') ? 'Add project' : 'Edit project';
				$data['is_draft'] = $this->is_project_draft($row);
				$data['msg'] = '';
				$data['error'] = implode(' and ', $missing) . ' ' . (count($missing) === 1 ? 'is' : 'are') . ' required.';
				$this->load->view('admin/layout', array('title' => $data['heading'], 'body' => $this->load->view('admin/project', $data, TRUE)));
				return;
			}
			$slug = $this->unique_slug('projects', $this->slugify($this->input->post('slug'), $title), $code);
			$payload['slug'] = $slug;
			$was_draft = $this->is_project_draft($row);
			$this->db->where('code', $code)->update('projects', array(
				'title' => isset($payload['title']) ? $payload['title'] : $row['title'],
				'slug' => $slug,
				'category' => isset($payload['category']) ? $payload['category'] : $row['category'],
				'locality' => isset($payload['locality']) ? $payload['locality'] : $row['locality'],
				'status' => isset($payload['status']) ? $payload['status'] : $row['status'],
				'price' => isset($payload['price']) ? $payload['price'] : $row['price'],
				'is_featured' => ! empty($payload['isFeatured']) ? 1 : 0,
				'is_popular' => ! empty($payload['isPopular']) ? 1 : 0,
				'is_active' => $this->input->post('is_active') ? 1 : ($was_draft ? 1 : 0),
				'sort_order' => (int) $row['sort_order'],
				'payload' => fieldform_json($payload),
			));
			if ($this->form_stays_open()) {
				$this->session->set_flashdata('msg', ! empty($_POST['add_list']) ? 'Item added' : 'Item removed');
				redirect('admin/project/' . $code);
			}
			$this->session->set_flashdata('msg', 'Project saved');
			redirect('admin/projects');
		}
		$data['row'] = $row;
		$data['item'] = $this->fill_project(json_decode($row['payload'], TRUE), $row);
		$data['heading'] = ($row['title'] === 'New project') ? 'Add project' : 'Edit project';
		$data['is_draft'] = $this->is_project_draft($row);
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => $data['heading'], 'body' => $this->load->view('admin/project', $data, TRUE)));
	}

	public function blog_create()
	{
		$this->require_login();
		$last = $this->db->order_by('sort_order', 'DESC')->limit(1)->get('blogs')->row_array();
		$sample = $last ? json_decode($last['payload'], TRUE) : array('title' => '', 'slug' => '', 'excerpt' => '');
		$payload = fieldform_blank(is_array($sample) ? $sample : array());
		$code = 'b' . time();
		$payload['id'] = $code;
		$payload['title'] = 'New blog';
		$payload['slug'] = 'new-blog-' . time();
		$payload['featured'] = FALSE;
		$sort = $last ? ((int) $last['sort_order'] + 1) : 1;
		$this->db->insert('blogs', array(
			'code' => $code,
			'slug' => $payload['slug'],
			'title' => $payload['title'],
			'category' => '',
			'featured' => 0,
			'is_active' => 0,
			'sort_order' => $sort,
			'payload' => fieldform_json($payload),
		));
		redirect('admin/blog/' . $code);
	}

	public function blog_discard($code = '')
	{
		$this->require_login();
		$row = $this->db->get_where('blogs', array('code' => $code))->row_array();
		if ($row && $this->is_blog_draft($row)) {
			$this->db->delete('blogs', array('code' => $code));
			$this->session->set_flashdata('msg', 'Draft discarded');
		}
		redirect('admin/blogs');
	}

	public function blog_delete($code = '')
	{
		$this->require_login();
		if ($this->input->method() === 'post' && $code !== '') {
			$this->db->delete('blogs', array('code' => $code));
			$this->session->set_flashdata('msg', 'Blog deleted');
		}
		redirect('admin/blogs');
	}

	public function blogs()
	{
		$this->require_login();
		$data['rows'] = $this->db->order_by('sort_order', 'ASC')->get('blogs')->result_array();
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => 'Blogs', 'body' => $this->load->view('admin/blogs', $data, TRUE)));
	}

	public function blog($code = '')
	{
		$this->require_login();
		$row = $this->db->get_where('blogs', array('code' => $code))->row_array();
		if ( ! $row) {
			show_404();
		}
		if ($this->input->method() === 'post') {
			$original = json_decode($row['payload'], TRUE);
			$posted = $this->input->post('payload');
			$payload = fieldform_finish(fieldform_apply(is_array($original) ? $original : array(), is_array($posted) ? $posted : array()));
			if (is_array($posted) && array_key_exists('relatedProjectId', $posted)) {
				$payload['relatedProjectId'] = (string) $posted['relatedProjectId'];
			}
			$title = trim(isset($payload['title']) ? $payload['title'] : '');
			if ($title === '') {
				$row['slug'] = (string) $this->input->post('slug');
				$row['is_active'] = $this->input->post('is_active') ? 1 : 0;
				$payload['title'] = '';
				$data['row'] = $row;
				$data['item'] = $payload;
				$data['projects'] = $this->db->order_by('sort_order', 'ASC')->get('projects')->result_array();
				$data['heading'] = 'Add blog';
				$data['is_draft'] = $this->is_blog_draft($row);
				$data['msg'] = '';
				$data['error'] = 'Title is required.';
				$this->load->view('admin/layout', array('title' => $data['heading'], 'body' => $this->load->view('admin/blog', $data, TRUE)));
				return;
			}
			$slug = $this->unique_slug('blogs', $this->slugify($this->input->post('slug'), $title), $code);
			$payload['slug'] = $slug;
			$was_draft = $this->is_blog_draft($row);
			$this->db->where('code', $code)->update('blogs', array(
				'title' => isset($payload['title']) ? $payload['title'] : $row['title'],
				'slug' => $slug,
				'category' => isset($payload['category']) ? $payload['category'] : $row['category'],
				'featured' => ! empty($payload['featured']) ? 1 : 0,
				'is_active' => $this->input->post('is_active') ? 1 : ($was_draft ? 1 : 0),
				'payload' => fieldform_json($payload),
			));
			if ($this->form_stays_open()) {
				$this->session->set_flashdata('msg', ! empty($_POST['add_list']) ? 'Item added' : 'Item removed');
				redirect('admin/blog/' . $code);
			}
			$this->session->set_flashdata('msg', 'Blog saved');
			redirect('admin/blogs');
		}
		$data['row'] = $row;
		$data['item'] = json_decode($row['payload'], TRUE);
		$data['projects'] = $this->db->order_by('sort_order', 'ASC')->get('projects')->result_array();
		$data['heading'] = ($row['title'] === 'New blog') ? 'Add blog' : 'Edit blog';
		$data['is_draft'] = $this->is_blog_draft($row);
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => $data['heading'], 'body' => $this->load->view('admin/blog', $data, TRUE)));
	}

	private function project_fields()
	{
		return crestora_project_admin_schema();
	}

	private function project_template()
	{
		return $this->project_fields();
	}

	private function fill_project($item, $row)
	{
		$template = $this->project_fields();
		$item = $this->order_like($template, $this->fill_missing(is_array($item) ? $item : array(), $template));
		$columns = array('title' => 'title', 'category' => 'category', 'locality' => 'locality', 'status' => 'status', 'price' => 'price');
		foreach ($columns as $key => $column) {
			$empty = ! isset($item[$key]) || $item[$key] === '' || $item[$key] === 0;
			if ($empty && isset($row[$column]) && $row[$column] !== '' && $row[$column] !== 0 && $row[$column] !== '0') {
				$item[$key] = $row[$column];
			}
		}
		if (empty($item['isFeatured']) && ! empty($row['is_featured'])) {
			$item['isFeatured'] = TRUE;
		}
		if (empty($item['isPopular']) && ! empty($row['is_popular'])) {
			$item['isPopular'] = TRUE;
		}
		return $item;
	}

	private function order_like($template, $item)
	{
		$out = array();
		foreach ($template as $key => $value) {
			if ( ! array_key_exists($key, $item)) {
				continue;
			}
			if (is_array($value) && is_array($item[$key]) && ! $this->is_list_array($value)) {
				$out[$key] = $this->order_like($value, $item[$key]);
			} else {
				$out[$key] = $item[$key];
			}
		}
		foreach ($item as $key => $value) {
			if ( ! array_key_exists($key, $out)) {
				$out[$key] = $value;
			}
		}
		return $out;
	}

	private function fill_missing($item, $template)
	{
		foreach ($template as $key => $value) {
			if ( ! array_key_exists($key, $item)) {
				$item[$key] = is_array($value) ? fieldform_blank($value) : $value;
			} elseif (is_array($value) && is_array($item[$key]) && ! $this->is_list_array($value)) {
				$item[$key] = $this->fill_missing($item[$key], $value);
			}
		}
		return $item;
	}

	private function merge_shape($base, $extra)
	{
		if ( ! is_array($extra)) {
			return $base;
		}
		if ( ! is_array($base) || $base === array()) {
			if ($this->is_list_array($extra)) {
				return $extra ? array($this->merge_list_sample($extra)) : array();
			}
			$out = array();
			foreach ($extra as $key => $value) {
				$out[$key] = is_array($value) ? $this->merge_shape(array(), $value) : $value;
			}
			return $out;
		}
		if ($this->is_list_array($base) || $this->is_list_array($extra)) {
			$items = array();
			if ($this->is_list_array($base)) {
				$items = array_merge($items, $base);
			}
			if ($this->is_list_array($extra)) {
				$items = array_merge($items, $extra);
			}
			return $items ? array($this->merge_list_sample($items)) : array();
		}
		foreach ($extra as $key => $value) {
			if ( ! array_key_exists($key, $base)) {
				$base[$key] = is_array($value) ? $this->merge_shape(array(), $value) : $value;
			} elseif (is_array($value) && is_array($base[$key])) {
				$base[$key] = $this->merge_shape($base[$key], $value);
			}
		}
		return $base;
	}

	private function merge_list_sample($items)
	{
		$sample = NULL;
		foreach ($items as $item) {
			if ($sample === NULL) {
				$sample = $item;
				continue;
			}
			if (is_array($sample) && is_array($item)) {
				$sample = $this->merge_shape($sample, $item);
			}
		}
		return $sample;
	}

	private function form_stays_open()
	{
		return ! empty($_POST['add_list']) || ! empty($_POST['payload_delete']);
	}

	private function slugify($value, $fallback = '')
	{
		$text = strtolower(trim((string) $value));
		$text = preg_replace('/[^a-z0-9]+/', '-', $text);
		$text = trim($text, '-');
		if ($text === '') {
			$text = strtolower(trim((string) $fallback));
			$text = preg_replace('/[^a-z0-9]+/', '-', $text);
			$text = trim($text, '-');
		}
		return $text !== '' ? $text : 'item';
	}

	private function unique_slug($table, $slug, $code)
	{
		$base = $slug;
		$n = 2;
		while (TRUE) {
			$taken = $this->db->get_where($table, array('slug' => $slug))->row_array();
			if ( ! $taken || $taken['code'] === $code) {
				return $slug;
			}
			$slug = $base.'-'.$n;
			$n++;
		}
	}

	public function leads()
	{
		redirect('admin/contacts');
	}

	public function contacts()
	{
		$this->require_login();
		$data['rows'] = $this->db->order_by('id', 'DESC')->get('enquiries')->result_array();
		$this->load->view('admin/layout', array('title' => 'Contact forms', 'body' => $this->load->view('admin/contacts', $data, TRUE)));
	}

	public function visits()
	{
		$this->require_login();
		$data['rows'] = $this->db->order_by('id', 'DESC')->get('site_visits')->result_array();
		$this->load->view('admin/layout', array('title' => 'Site visits', 'body' => $this->load->view('admin/visits', $data, TRUE)));
	}

	public function categories()
	{
		$this->require_login();
		list($row, $meta, $items) = $this->load_items('home', 'categories');
		$data['ready'] = (bool) $row;
		$data['rows'] = $items;
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => 'Categories', 'body' => $this->load->view('admin/categories', $data, TRUE)));
	}

	public function category_create()
	{
		$this->catalog_form('categories', '', array(
			'id' => '',
			'categoryKey' => '',
			'categoryName' => '',
			'title' => '',
			'subtitle' => '',
			'description' => '',
			'badge' => '',
			'plotsCount' => '',
			'startingPrice' => '',
			'exampleText' => '',
			'image' => '',
			'icon' => 'LandPlot',
		), 'Add category', 'admin/categories');
	}

	public function category($id = '')
	{
		$this->catalog_form('categories', $id, array(), 'Edit category', 'admin/categories');
	}

	public function category_delete($id = '')
	{
		$this->require_login();
		if ($this->input->method() === 'post' && $id !== '') {
			list($row, $meta, $items) = $this->load_items('home', 'categories');
			$index = $this->find_item_index($items, $id);
			if ($row && $index >= 0) {
				$key = isset($items[$index]['categoryKey']) ? $items[$index]['categoryKey'] : '';
				array_splice($items, $index, 1);
				$this->save_items('home', 'categories', $meta, $items);
				if ($key !== '') {
					$this->remove_filter('categories', $key);
					$this->remove_filter('propertyTypes', $key);
				}
				$this->session->set_flashdata('msg', 'Category deleted');
			}
		}
		redirect('admin/categories');
	}

	public function locations()
	{
		$this->require_login();
		list($row, $meta, $items) = $this->load_items('home', 'locations');
		$data['ready'] = (bool) $row;
		$data['rows'] = $items;
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => 'Locations', 'body' => $this->load->view('admin/locations', $data, TRUE)));
	}

	public function location_create()
	{
		$this->catalog_form('locations', '', array(
			'id' => '',
			'name' => '',
			'state' => '',
			'count' => 0,
			'cityKey' => '',
			'image' => '',
			'highlight' => '',
		), 'Add location', 'admin/locations');
	}

	public function location($id = '')
	{
		$this->catalog_form('locations', $id, array(), 'Edit location', 'admin/locations');
	}

	public function location_delete($id = '')
	{
		$this->require_login();
		if ($this->input->method() === 'post' && $id !== '') {
			list($row, $meta, $items) = $this->load_items('home', 'locations');
			$index = $this->find_item_index($items, $id);
			if ($row && $index >= 0) {
				$key = isset($items[$index]['cityKey']) ? $items[$index]['cityKey'] : '';
				array_splice($items, $index, 1);
				$this->save_items('home', 'locations', $meta, $items);
				if ($key !== '') {
					$this->remove_filter('localities', $key);
				}
				$this->session->set_flashdata('msg', 'Location deleted');
			}
		}
		redirect('admin/locations');
	}

	public function slides()
	{
		$this->require_login();
		list($row, $meta, $items) = $this->load_items('home', 'hero');
		$data['ready'] = (bool) $row;
		$data['rows'] = $items;
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => 'Slider', 'body' => $this->load->view('admin/slides', $data, TRUE)));
	}

	public function slide_create()
	{
		$this->slide_form('', array(
			'id' => '',
			'subtitle' => '',
			'title' => '',
			'titleHighlight1' => '',
			'titleHighlight2' => '',
			'description' => '',
			'tagline' => '',
			'projectName' => '',
			'location' => '',
			'price' => '',
			'period' => 'Onwards',
			'bgImage' => '',
			'tag' => '',
			'badge' => '',
			'plotsCount' => '',
			'landArea' => '',
		), 'Add slide');
	}

	public function slide($id = '')
	{
		$this->slide_form($id, array(), 'Edit slide');
	}

	public function slide_delete($id = '')
	{
		$this->require_login();
		if ($this->input->method() === 'post' && $id !== '') {
			list($row, $meta, $items) = $this->load_items('home', 'hero');
			$index = $this->find_item_index($items, $id);
			if ($row && $index >= 0) {
				array_splice($items, $index, 1);
				$this->save_items('home', 'hero', $meta, $items);
				$this->session->set_flashdata('msg', 'Slide deleted');
			}
		}
		redirect('admin/slides');
	}

	private function slide_form($id, $blank, $heading)
	{
		$this->require_login();
		list($row, $meta, $items) = $this->load_items('home', 'hero');
		if ( ! $row) {
			show_error('The slider section is missing.');
		}
		$index = ($id === '') ? -1 : $this->find_item_index($items, $id);
		if ($id !== '' && $index < 0) {
			show_404();
		}
		$item = ($index >= 0) ? $items[$index] : $blank;
		$error = '';
		if ($this->input->method() === 'post') {
			$posted = $this->input->post('item');
			if ( ! is_array($posted)) {
				$posted = array();
			}
			$item = array_merge($item, $posted);
			if (isset($_FILES['bgImage']['name']) && $_FILES['bgImage']['name'] !== '' && (int) $_FILES['bgImage']['error'] === UPLOAD_ERR_OK) {
				$url = fieldform_store_upload($_FILES['bgImage']['tmp_name'], $_FILES['bgImage']['name']);
				if ($url) {
					$item['bgImage'] = $url;
				}
			}
			$title = trim(isset($item['title']) ? $item['title'] : '');
			if ($title === '') {
				$error = 'Slide title is required';
			} else {
				$item['title'] = $title;
				if ($item['id'] === '') {
					$item['id'] = $this->unique_item_id($items, 's'.(count($items) + 1));
				}
				if ($index >= 0) {
					$items[$index] = $item;
				} else {
					$items[] = $item;
				}
				$this->save_items('home', 'hero', $meta, $items);
				$this->session->set_flashdata('msg', 'Slide saved');
				redirect('admin/slides');
			}
		}
		$defaults = array(
			'id' => '', 'subtitle' => '', 'title' => '', 'titleHighlight1' => '', 'titleHighlight2' => '',
			'description' => '', 'tagline' => '', 'projectName' => '', 'location' => '', 'price' => '',
			'period' => '', 'bgImage' => '', 'tag' => '', 'badge' => '', 'plotsCount' => '', 'landArea' => '',
		);
		$data['item'] = array_merge($defaults, $item);
		$data['heading'] = ($id === '') ? $heading : 'Edit slide';
		$data['error'] = $error;
		$this->load->view('admin/layout', array('title' => $data['heading'], 'body' => $this->load->view('admin/slide_form', $data, TRUE)));
	}

	private function save_list($page, $key, $items)
	{
		$this->db->where('page', $page)->where('section_key', $key)->update('sections', array(
			'payload' => json_encode(array_values($items), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
		));
	}

	private function catalog_form($kind, $id, $blank, $heading, $list_url)
	{
		$this->require_login();
		$page_key = ($kind === 'locations') ? 'locations' : 'categories';
		list($row, $meta, $items) = $this->load_items('home', $page_key);
		if ( ! $row) {
			show_error('The '.$page_key.' section is missing.');
		}
		$index = ($id === '') ? -1 : $this->find_item_index($items, $id);
		if ($id !== '' && $index < 0) {
			show_404();
		}
		$item = ($index >= 0) ? $items[$index] : $blank;
		$error = '';
		if ($this->input->method() === 'post') {
			$posted = $this->input->post('item');
			if ( ! is_array($posted)) {
				$posted = array();
			}
			$item = array_merge($item, $posted);
			if (isset($_FILES['image']['name']) && $_FILES['image']['name'] !== '' && (int) $_FILES['image']['error'] === UPLOAD_ERR_OK) {
				$url = fieldform_store_upload($_FILES['image']['tmp_name'], $_FILES['image']['name']);
				if ($url) {
					$item['image'] = $url;
				}
			}
			if ($kind === 'locations') {
				$name = trim(isset($item['name']) ? $item['name'] : '');
				$key = $this->slugify(isset($item['cityKey']) ? $item['cityKey'] : '', $name);
				$missing = array();
				if ($name === '') {
					$missing[] = 'Name';
				}
				if (empty($item['image'])) {
					$missing[] = 'Image';
				}
				if ($missing) {
					$error = 'Location ' . implode(' and ', $missing) . ' ' . (count($missing) === 1 ? 'is' : 'are') . ' required.';
				} else {
					$item['name'] = $name;
					$item['cityKey'] = $key;
					$item['count'] = (int) $item['count'];
					if ($item['id'] === '') {
						$item['id'] = $this->unique_item_id($items, $key);
					}
					if ($index >= 0) {
						$items[$index] = $item;
					} else {
						$items[] = $item;
					}
					$this->save_items('home', 'locations', $meta, $items);
					$this->upsert_filter('localities', $key, $name, array('city' => 'coimbatore'));
					$this->session->set_flashdata('msg', 'Location saved');
					redirect($list_url);
				}
			} else {
				$name = trim(isset($item['categoryName']) ? $item['categoryName'] : '');
				$title = trim(isset($item['title']) ? $item['title'] : '');
				$key = $this->slugify(isset($item['categoryKey']) ? $item['categoryKey'] : '', $name);
				$missing = array();
				if ($name === '') {
					$missing[] = 'Name';
				}
				if ($title === '') {
					$missing[] = 'Title';
				}
				if (empty($item['image'])) {
					$missing[] = 'Image';
				}
				if ($missing) {
					$error = implode(' and ', $missing) . ' ' . (count($missing) === 1 ? 'is' : 'are') . ' required.';
				} else {
					$item['categoryName'] = $name;
					$item['categoryKey'] = $key;
					$item['title'] = $title;
					$item['badge'] = $item['badge'] !== '' ? $item['badge'] : $name;
					if ($item['id'] === '') {
						$item['id'] = $this->unique_item_id($items, $key);
					}
					if ($index >= 0) {
						$items[$index] = $item;
					} else {
						$items[] = $item;
					}
					$this->save_items('home', 'categories', $meta, $items);
					$this->upsert_filter('categories', $key, $name, array('subtitle' => isset($item['subtitle']) ? $item['subtitle'] : ''));
					$this->upsert_filter('propertyTypes', $key, $name);
					$this->session->set_flashdata('msg', 'Category saved');
					redirect($list_url);
				}
			}
		}
		$data['item'] = $item;
		$data['heading'] = ($id === '') ? $heading : str_replace('Add ', 'Edit ', $heading);
		$data['error'] = $error;
		$data['list_url'] = $list_url;
		$data['kind'] = $kind;
		$this->load->view('admin/layout', array('title' => $data['heading'], 'body' => $this->load->view('admin/catalog_form', $data, TRUE)));
	}

	private function load_items($page, $key)
	{
		$row = $this->db->get_where('sections', array('page' => $page, 'section_key' => $key))->row_array();
		$payload = ($row && $row['payload'] !== '') ? json_decode($row['payload'], TRUE) : array();
		if ( ! is_array($payload)) {
			$payload = array();
		}
		if (isset($payload['items']) && is_array($payload['items'])) {
			$items = $payload['items'];
			$meta = $payload;
			unset($meta['items']);
		} elseif ($this->is_list_array($payload)) {
			$items = $payload;
			$meta = array();
		} else {
			$items = array();
			$meta = $payload;
		}
		return array($row, $meta, array_values($items));
	}

	private function save_items($page, $key, $meta, $items)
	{
		$payload = is_array($meta) ? $meta : array();
		$payload['items'] = array_values($items);
		$this->db->where('page', $page)->where('section_key', $key)->update('sections', array(
			'payload' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
		));
	}

	private function find_item_index($items, $id)
	{
		$id = rawurldecode((string) $id);
		foreach ($items as $index => $item) {
			if (isset($item['id']) && (string) $item['id'] === (string) $id) {
				return $index;
			}
			if (isset($item['categoryKey']) && (string) $item['categoryKey'] === (string) $id) {
				return $index;
			}
			if (isset($item['cityKey']) && (string) $item['cityKey'] === (string) $id) {
				return $index;
			}
		}
		return -1;
	}

	private function unique_item_id($items, $base)
	{
		$id = $base !== '' ? $base : 'item';
		$try = $id;
		$n = 2;
		while ($this->find_item_index($items, $try) >= 0) {
			$try = $id.'-'.$n;
			$n++;
		}
		return $try;
	}

	private function is_list_array($value)
	{
		if ( ! is_array($value)) {
			return FALSE;
		}
		if ($value === array()) {
			return TRUE;
		}
		return array_keys($value) === range(0, count($value) - 1);
	}

	private function remove_filter($list_key, $value)
	{
		if ($value === '' || $value === 'all') {
			return;
		}
		$row = $this->db->get_where('sections', array('page' => 'global', 'section_key' => 'filters'))->row_array();
		if ( ! $row) {
			return;
		}
		$payload = json_decode($row['payload'], TRUE);
		if ( ! is_array($payload) || ! isset($payload[$list_key]) || ! is_array($payload[$list_key])) {
			return;
		}
		$payload[$list_key] = array_values(array_filter($payload[$list_key], function ($item) use ($value) {
			return ! (isset($item['value']) && (string) $item['value'] === (string) $value);
		}));
		$this->db->where('id', (int) $row['id'])->update('sections', array(
			'payload' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
		));
	}

	private function upsert_filter($list_key, $value, $label, $extra = array())
	{
		if ($value === '' || $value === 'all') {
			return;
		}
		$row = $this->db->get_where('sections', array('page' => 'global', 'section_key' => 'filters'))->row_array();
		if ( ! $row) {
			return;
		}
		$payload = json_decode($row['payload'], TRUE);
		if ( ! is_array($payload)) {
			$payload = array();
		}
		if ( ! isset($payload[$list_key]) || ! is_array($payload[$list_key])) {
			$payload[$list_key] = array();
		}
		$found = FALSE;
		foreach ($payload[$list_key] as $index => $item) {
			if (isset($item['value']) && $item['value'] === $value) {
				$payload[$list_key][$index] = array_merge($item, $extra, array('id' => isset($item['id']) ? $item['id'] : $value, 'label' => $label, 'value' => $value));
				$found = TRUE;
				break;
			}
		}
		if ( ! $found) {
			$payload[$list_key][] = array_merge(array('id' => $value, 'label' => $label, 'value' => $value), $extra);
		}
		$this->db->where('id', (int) $row['id'])->update('sections', array(
			'payload' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
		));
	}
}
