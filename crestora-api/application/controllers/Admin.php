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
		$data['projects'] = $this->db->count_all('projects');
		$data['blogs'] = $this->db->count_all('blogs');
		$data['enquiries'] = $this->db->count_all('enquiries');
		$data['visits'] = $this->db->count_all('site_visits');
		$data['sections'] = $this->db->order_by('page', 'ASC')->order_by('sort_order', 'ASC')->get('sections')->result_array();
		$this->load->view('admin/layout', array('title' => 'Dashboard', 'body' => $this->load->view('admin/dashboard', $data, TRUE)));
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
		$sample = $last ? json_decode($last['payload'], TRUE) : array('title' => '', 'slug' => '', 'description' => '');
		$payload = fieldform_blank(is_array($sample) ? $sample : array());
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
			'is_active' => 1,
			'sort_order' => $sort,
			'payload' => fieldform_json($payload),
		));
		redirect('admin/project/' . $code);
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
			$original = json_decode($row['payload'], TRUE);
			$posted = $this->input->post('payload');
			$payload = fieldform_finish(fieldform_apply(is_array($original) ? $original : array(), is_array($posted) ? $posted : array()));
			$slug = $this->unique_slug('projects', $this->slugify($this->input->post('slug'), isset($payload['title']) ? $payload['title'] : $row['title']), $code);
			$payload['slug'] = $slug;
			$this->db->where('code', $code)->update('projects', array(
				'title' => isset($payload['title']) ? $payload['title'] : $row['title'],
				'slug' => $slug,
				'category' => isset($payload['category']) ? $payload['category'] : $row['category'],
				'locality' => isset($payload['locality']) ? $payload['locality'] : $row['locality'],
				'status' => isset($payload['status']) ? $payload['status'] : $row['status'],
				'price' => isset($payload['price']) ? $payload['price'] : $row['price'],
				'is_featured' => ! empty($payload['isFeatured']) ? 1 : 0,
				'is_popular' => ! empty($payload['isPopular']) ? 1 : 0,
				'is_active' => $this->input->post('is_active') ? 1 : 0,
				'payload' => fieldform_json($payload),
			));
			$this->session->set_flashdata('msg', 'Project saved');
			redirect('admin/projects');
		}
		$data['row'] = $row;
		$data['item'] = json_decode($row['payload'], TRUE);
		$data['heading'] = ($row['title'] === 'New project') ? 'Add project' : 'Edit project';
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
			'is_active' => 1,
			'sort_order' => $sort,
			'payload' => fieldform_json($payload),
		));
		redirect('admin/blog/' . $code);
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
			$slug = $this->unique_slug('blogs', $this->slugify($this->input->post('slug'), isset($payload['title']) ? $payload['title'] : $row['title']), $code);
			$payload['slug'] = $slug;
			$this->db->where('code', $code)->update('blogs', array(
				'title' => isset($payload['title']) ? $payload['title'] : $row['title'],
				'slug' => $slug,
				'category' => isset($payload['category']) ? $payload['category'] : $row['category'],
				'featured' => ! empty($payload['featured']) ? 1 : 0,
				'is_active' => $this->input->post('is_active') ? 1 : 0,
				'payload' => fieldform_json($payload),
			));
			$this->session->set_flashdata('msg', 'Blog saved');
			redirect('admin/blogs');
		}
		$data['row'] = $row;
		$data['item'] = json_decode($row['payload'], TRUE);
		$data['projects'] = $this->db->order_by('sort_order', 'ASC')->get('projects')->result_array();
		$data['heading'] = ($row['title'] === 'New blog') ? 'Add blog' : 'Edit blog';
		$data['msg'] = $this->session->flashdata('msg');
		$this->load->view('admin/layout', array('title' => $data['heading'], 'body' => $this->load->view('admin/blog', $data, TRUE)));
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
				array_splice($items, $index, 1);
				$this->save_items('home', 'categories', $meta, $items);
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
				array_splice($items, $index, 1);
				$this->save_items('home', 'locations', $meta, $items);
				$this->session->set_flashdata('msg', 'Location deleted');
			}
		}
		redirect('admin/locations');
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
				if ($name === '') {
					$error = 'Location name is required';
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
				$key = $this->slugify(isset($item['categoryKey']) ? $item['categoryKey'] : '', $name);
				if ($name === '') {
					$error = 'Category name is required';
				} else {
					$item['categoryName'] = $name;
					$item['categoryKey'] = $key;
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
		foreach ($items as $index => $item) {
			if (isset($item['id']) && (string) $item['id'] === (string) $id) {
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
