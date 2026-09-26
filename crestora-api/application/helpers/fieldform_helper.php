<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function fieldform_is_list($value)
{
	if ( ! is_array($value)) {
		return FALSE;
	}
	return array_keys($value) === range(0, count($value) - 1);
}

function fieldform_label($name)
{
	if (preg_match('/\[([^\]]+)\]$/', $name, $match)) {
		$key = $match[1];
		if (ctype_digit($key)) {
			return 'Item ' . ((int) $key + 1);
		}
		$label = preg_replace('/([a-z])([A-Z])/', '$1 $2', str_replace('_', ' ', $key));
		return ucwords($label);
	}
	return 'Content';
}

function fieldform_render($data, $name = 'payload')
{
	echo '<div class="fields">';
	fieldform_walk($data, $name);
	echo '</div>';
}

function fieldform_walk($data, $name)
{
	if (is_array($data)) {
		$is_list = fieldform_is_list($data);
		if ($is_list && $data && ! is_array(reset($data))) {
			$is_gallery = (bool) preg_match('/\[(gallery|images|photos)\]$/i', $name);
			echo '<fieldset class="group"><legend>' . html_escape(fieldform_label($name)) . '</legend>';
			foreach ($data as $index => $value) {
				echo '<div class="item-row">';
				fieldform_input($name . '[' . $index . ']', $value, 'Item ' . ($index + 1));
				echo fieldform_delete_button($name . '[' . $index . ']');
				echo '</div>';
			}
			if ($is_gallery) {
				echo '<label>Add gallery image<input class="file-input" type="file" accept="image/jpeg,image/png,image/gif,image/webp" name="upload_extra[gallery][]" multiple /></label>';
			}
			echo '<div class="add-row">' . fieldform_add_button($name) . '</div>';
			echo '</fieldset>';
			return;
		}
		if ($is_list) {
			echo '<fieldset class="group"><legend>' . html_escape(fieldform_label($name)) . ' (' . count($data) . ')</legend>';
			foreach ($data as $index => $item) {
				$legend = 'Item ' . ($index + 1);
				if (is_array($item) && ! empty($item['title'])) {
					$legend .= ' — ' . $item['title'];
				}
				echo '<fieldset class="item"><legend>' . html_escape($legend) . '</legend>';
				echo fieldform_delete_button($name . '[' . $index . ']');
				fieldform_walk($item, $name . '[' . $index . ']');
				echo '</fieldset>';
			}
			echo '<div class="add-row">' . fieldform_add_button($name) . '</div>';
			echo '</fieldset>';
			return;
		}
		$scalars = array();
		$children = array();
		foreach ($data as $key => $value) {
			if (is_array($value)) {
				$children[$key] = $value;
			} else {
				$scalars[$key] = $value;
			}
		}
		if ($scalars) {
			$short = array();
			$wide = array();
			foreach ($scalars as $key => $value) {
				$field_name = $name . '[' . $key . ']';
				if (fieldform_is_wide($field_name, $value)) {
					$wide[$key] = $value;
				} else {
					$short[$key] = $value;
				}
			}
			if ($short) {
				echo '<div class="form-grid">';
				foreach ($short as $key => $value) {
					$field_name = $name . '[' . $key . ']';
					if ($key === 'id') {
						echo '<input type="hidden" name="' . html_escape($field_name) . '" value="' . html_escape((string) $value) . '" />';
						continue;
					}
					fieldform_input($field_name, $value, fieldform_label($field_name));
				}
				echo '</div>';
			}
			if ($wide) {
				echo '<div class="form-stack">';
				foreach ($wide as $key => $value) {
					fieldform_input($name . '[' . $key . ']', $value, fieldform_label($name . '[' . $key . ']'));
				}
				echo '</div>';
			}
		}
		foreach ($children as $key => $value) {
			fieldform_walk($value, $name . '[' . $key . ']');
		}
		return;
	}
	fieldform_input($name, $data, fieldform_label($name));
}

function fieldform_is_image($name, $value)
{
	if ( ! is_string($value)) {
		return FALSE;
	}
	$looks_like_file = (bool) preg_match('#^(https?:)?//#i', $value) || (bool) preg_match('/\.(jpe?g|png|gif|webp)(\?.*)?$/i', $value);
	if (preg_match('/\[(image|images|logo|avatar|banner|bannerImage|bgImage|photo|thumbnail)\]$/i', $name)) {
		return $looks_like_file || $value === '';
	}
	if (preg_match('/\[(gallery|images|photos)\]\[\d+\]$/i', $name)) {
		return TRUE;
	}
	return (bool) preg_match('/\.(jpe?g|png|gif|webp)(\?.*)?$/i', $value);
}

function fieldform_upload_name($name)
{
	return preg_replace('/^payload/', 'upload', $name, 1);
}

function fieldform_delete_name($name)
{
	return preg_replace('/^payload/', 'payload_delete', $name, 1);
}

function fieldform_add_button($name)
{
	$label = fieldform_label($name);
	$text = ($label === 'Content') ? 'Add item' : 'Add ' . strtolower($label);
	return '<button type="button" data-list="' . html_escape($name) . '" class="btn-plus js-add-item" title="' . html_escape($text) . '"><i class="fas fa-plus"></i><span>' . html_escape($text) . '</span></button>';
}

function fieldform_delete_button($name)
{
	return '<button type="button" class="btn-remove js-remove-item" title="Remove" aria-label="Remove"><i class="fas fa-trash"></i></button>';
}

function fieldform_blank($sample)
{
	if (is_array($sample)) {
		$out = array();
		foreach ($sample as $key => $value) {
			$out[$key] = fieldform_blank($value);
		}
		return fieldform_is_list($sample) ? array_values($out) : $out;
	}
	if (is_bool($sample)) {
		return FALSE;
	}
	if (is_int($sample) || is_float($sample)) {
		return 0;
	}
	return '';
}

function fieldform_append_blank(&$payload, $name)
{
	if ($name === 'payload') {
		if (fieldform_is_list($payload) && $payload) {
			$payload[] = fieldform_blank($payload[count($payload) - 1]);
		}
		return;
	}
	if ( ! preg_match('/^payload((?:\[[^\]]+\])+)$/', $name, $match)) {
		return;
	}
	preg_match_all('/\[([^\]]+)\]/', $match[1], $keys);
	$node =& $payload;
	foreach ($keys[1] as $key) {
		if ( ! isset($node[$key]) || ! is_array($node[$key])) {
			return;
		}
		$node =& $node[$key];
	}
	if (fieldform_is_list($node) && $node) {
		$node[] = fieldform_blank($node[count($node) - 1]);
	}
}

function fieldform_drop_deleted($data, $flags)
{
	if ( ! is_array($data) || ! is_array($flags)) {
		return $data;
	}
	if (fieldform_is_list($data)) {
		$out = array();
		foreach ($data as $index => $item) {
			$flag = isset($flags[$index]) ? $flags[$index] : NULL;
			if ($flag === '1' || $flag === 1) {
				continue;
			}
			$out[] = is_array($item) ? fieldform_drop_deleted($item, is_array($flag) ? $flag : array()) : $item;
		}
		return $out;
	}
	foreach ($data as $key => $value) {
		if (is_array($value) && isset($flags[$key]) && is_array($flags[$key])) {
			$data[$key] = fieldform_drop_deleted($value, $flags[$key]);
		}
	}
	return $data;
}

function fieldform_finish($payload)
{
	$flags = isset($_POST['payload_delete']) ? $_POST['payload_delete'] : array();
	$payload = fieldform_drop_deleted($payload, is_array($flags) ? $flags : array());
	$payload = fieldform_merge_uploads($payload);
	if ( ! empty($_POST['add_list'])) {
		fieldform_append_blank($payload, $_POST['add_list']);
	}
	return $payload;
}

function fieldform_set_choices($choices)
{
	$GLOBALS['fieldform_choices'] = is_array($choices) ? $choices : array();
}

function fieldform_choices_for($name)
{
	if (empty($GLOBALS['fieldform_choices']) || ! preg_match('/\[([^\]]+)\]$/', $name, $match)) {
		return NULL;
	}
	$key = $match[1];
	if ( ! isset($GLOBALS['fieldform_choices'][$key]) || ! is_array($GLOBALS['fieldform_choices'][$key])) {
		return NULL;
	}
	return $GLOBALS['fieldform_choices'][$key];
}

function fieldform_is_wide($name, $value)
{
	if (is_bool($value)) {
		return FALSE;
	}
	$text = is_string($value) ? $value : '';
	if (fieldform_is_image($name, $text)) {
		return TRUE;
	}
	if (preg_match('/\[(location)\]$/i', $name)) {
		return FALSE;
	}
	if (preg_match('/\[(description|tagline|priceRange|area)\]$/i', $name)) {
		return TRUE;
	}
	return strlen($text) > 90 || strpos($text, "\n") !== FALSE;
}

function fieldform_input($name, $value, $label)
{
	$wide = fieldform_is_wide($name, $value);
	$required = (bool) preg_match('/^(payload|item)\[(title|name|categoryName)\]$/', $name);
	echo '<label' . ($wide ? ' class="span-3"' : '') . '>' . html_escape($label);
	if (is_bool($value)) {
		echo '<span class="check-field">';
		echo '<input type="hidden" name="' . html_escape($name) . '" value="0" />';
		echo '<input type="checkbox" name="' . html_escape($name) . '" value="1" ' . ($value ? 'checked' : '') . ' />';
		echo '<span>Yes</span>';
		echo '</span></label>';
		return;
	}
	$text = (string) $value;
	if (fieldform_is_image($name, $text)) {
		echo '<div class="img-field">';
		if ($text !== '') {
			echo '<img class="img-preview" src="' . html_escape($text) . '" alt="" />';
		}
		echo '<input type="hidden" name="' . html_escape($name) . '" value="' . html_escape($text) . '" />';
		echo '<input class="file-input" type="file" accept="image/jpeg,image/png,image/gif,image/webp" name="' . html_escape(fieldform_upload_name($name)) . '" />';
		echo '<span class="file-note">Upload a new image, or leave this empty to keep the current one.</span>';
		echo '</div></label>';
		return;
	}
	$choices = fieldform_choices_for($name);
	if (is_array($choices)) {
		echo '<select name="' . html_escape($name) . '">';
		$found = FALSE;
		foreach ($choices as $opt_value => $opt_label) {
			$selected = ((string) $opt_value === $text);
			if ($selected) {
				$found = TRUE;
			}
			echo '<option value="' . html_escape($opt_value) . '"' . ($selected ? ' selected' : '') . '>' . html_escape($opt_label) . '</option>';
		}
		if ($text !== '' && ! $found) {
			echo '<option value="' . html_escape($text) . '" selected>' . html_escape($text) . '</option>';
		}
		echo '</select></label>';
		return;
	}
	$req = $required ? ' required' : '';
	$slug_attr = ($name === 'payload[title]') ? ' data-slug-source' : '';
	if ($wide) {
		echo '<textarea name="' . html_escape($name) . '" rows="4"' . $req . '>' . html_escape($text) . '</textarea>';
	} else {
		echo '<input name="' . html_escape($name) . '" value="' . html_escape($text) . '"' . $req . $slug_attr . ' />';
	}
	echo '</label>';
}

function fieldform_store_upload($tmp, $original_name)
{
	$info = @getimagesize($tmp);
	if ( ! $info) {
		return NULL;
	}
	$ext = image_type_to_extension($info[2], FALSE);
	if ( ! in_array($ext, array('jpg', 'jpeg', 'png', 'gif', 'webp'), TRUE)) {
		return NULL;
	}
	$dir = FCPATH . 'uploads' . DIRECTORY_SEPARATOR;
	if ( ! is_dir($dir)) {
		mkdir($dir, 0755, TRUE);
	}
	$file = date('YmdHis') . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
	if ( ! move_uploaded_file($tmp, $dir . $file)) {
		return NULL;
	}
	$CI =& get_instance();
	return rtrim($CI->config->item('base_url'), '/') . '/uploads/' . $file;
}

function fieldform_walk_uploads($names, $tmp, $errors, $path, &$target)
{
	if ( ! is_array($names)) {
		if ((int) $errors !== UPLOAD_ERR_OK || ! is_uploaded_file($tmp)) {
			return;
		}
		$url = fieldform_store_upload($tmp, $names);
		if ($url) {
			$node =& $target;
			foreach ($path as $key) {
				if ( ! isset($node[$key]) || ! is_array($node[$key])) {
					$node[$key] = array();
				}
				$node =& $node[$key];
			}
			$node = $url;
		}
		return;
	}
	foreach ($names as $key => $child) {
		$next = $path;
		$next[] = $key;
		fieldform_walk_uploads(
			$child,
			isset($tmp[$key]) ? $tmp[$key] : NULL,
			isset($errors[$key]) ? $errors[$key] : UPLOAD_ERR_NO_FILE,
			$next,
			$target
		);
	}
}

function fieldform_merge_uploads($payload)
{
	if (isset($_FILES['upload']) && is_array($_FILES['upload']['name'])) {
		fieldform_walk_uploads($_FILES['upload']['name'], $_FILES['upload']['tmp_name'], $_FILES['upload']['error'], array(), $payload);
	}
	if (isset($_FILES['upload_extra']['name']['gallery']) && is_array($_FILES['upload_extra']['name']['gallery'])) {
		foreach ($_FILES['upload_extra']['name']['gallery'] as $index => $name) {
			$error = $_FILES['upload_extra']['error']['gallery'][$index];
			$tmp = $_FILES['upload_extra']['tmp_name']['gallery'][$index];
			if ((int) $error === UPLOAD_ERR_OK && is_uploaded_file($tmp)) {
				$url = fieldform_store_upload($tmp, $name);
				if ($url) {
					if ( ! isset($payload['gallery']) || ! is_array($payload['gallery'])) {
						$payload['gallery'] = array();
					}
					$payload['gallery'][] = $url;
				}
			}
		}
	}
	return $payload;
}

function fieldform_apply($original, $posted)
{
	if (is_array($original)) {
		$is_list = fieldform_is_list($original);
		if ($is_list) {
			return fieldform_apply_list($original, is_array($posted) ? $posted : array());
		}
		$out = array();
		foreach ($original as $key => $value) {
			$child = (is_array($posted) && array_key_exists($key, $posted)) ? $posted[$key] : NULL;
			if (is_array($value)) {
				$out[$key] = fieldform_apply($value, is_array($child) ? $child : array());
			} else {
				$out[$key] = fieldform_cast($value, $child);
			}
		}
		return $out;
	}
	return fieldform_cast($original, $posted);
}

function fieldform_apply_list($original, $posted)
{
	$keys = array();
	foreach ($original as $key => $value) {
		if (array_key_exists($key, $posted)) {
			$keys[] = $key;
		}
	}
	foreach ($posted as $key => $value) {
		if ( ! array_key_exists($key, $original) && ctype_digit((string) $key)) {
			$keys[] = $key;
		}
	}
	$template = $original ? $original[count($original) - 1] : '';
	$out = array();
	foreach ($keys as $key) {
		$sample = array_key_exists($key, $original) ? $original[$key] : $template;
		$child = $posted[$key];
		if (is_array($sample)) {
			$out[] = fieldform_apply($sample, is_array($child) ? $child : array());
		} else {
			$out[] = fieldform_cast($sample, $child);
		}
	}
	return $out;
}

function fieldform_cast($original, $posted)
{
	if (is_bool($original)) {
		return $posted === '1' || $posted === 1 || $posted === TRUE;
	}
	if ($posted === NULL) {
		return $original;
	}
	if (is_int($original)) {
		return (int) $posted;
	}
	if (is_float($original)) {
		return (float) $posted;
	}
	return (string) $posted;
}

function fieldform_json($value)
{
	return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function crestora_catalog_items($key)
{
	static $cache = array();
	if (isset($cache[$key])) {
		return $cache[$key];
	}
	$CI =& get_instance();
	$row = $CI->db->get_where('sections', array('page' => 'home', 'section_key' => $key))->row_array();
	$payload = ($row && $row['payload'] !== '') ? json_decode($row['payload'], TRUE) : array();
	if ( ! is_array($payload) || $payload === array()) {
		$items = array();
	} elseif (isset($payload['items']) && is_array($payload['items'])) {
		$items = $payload['items'];
	} elseif (array_values($payload) === $payload) {
		$items = $payload;
	} else {
		$items = array();
	}
	$cache[$key] = array_values($items);
	return $cache[$key];
}

function crestora_category_labels()
{
	static $labels = NULL;
	if ($labels !== NULL) {
		return $labels;
	}
	$labels = array(
		'plots' => 'Plots',
		'villa' => 'Villas',
		'farmlands' => 'Farmlands',
		'commercial' => 'Commercial Lands',
		'gated-community' => 'Gated Communities',
	);
	foreach (crestora_catalog_items('categories') as $item) {
		if ( ! is_array($item)) {
			continue;
		}
		$key = trim(isset($item['categoryKey']) ? $item['categoryKey'] : '');
		$name = trim(isset($item['categoryName']) ? $item['categoryName'] : '');
		if ($key !== '' && $name !== '') {
			$labels[$key] = $name;
		}
	}
	return $labels;
}

function crestora_location_choices()
{
	static $choices = NULL;
	if ($choices !== NULL) {
		return $choices;
	}
	$choices = array();
	foreach (crestora_catalog_items('locations') as $item) {
		if ( ! is_array($item)) {
			continue;
		}
		$name = trim(isset($item['name']) ? $item['name'] : '');
		if ($name === '') {
			continue;
		}
		$key = trim(isset($item['cityKey']) ? $item['cityKey'] : '');
		$choices[] = array('name' => $name, 'key' => $key);
	}
	return $choices;
}

function crestora_sync_project($payload)
{
	if ( ! is_array($payload)) {
		return array();
	}
	$labels = crestora_category_labels();
	$category = trim(isset($payload['category']) ? (string) $payload['category'] : '');
	if ($category === '' && ! empty($payload['type'])) {
		$category = trim((string) $payload['type']);
	}
	if ($category !== '') {
		$payload['category'] = $category;
		$payload['type'] = $category;
		$payload['typeName'] = isset($labels[$category]) ? $labels[$category] : $category;
	}
	$picked = trim(isset($payload['location']) ? (string) $payload['location'] : '');
	foreach (crestora_location_choices() as $loc) {
		if (strcasecmp($loc['name'], $picked) === 0) {
			$payload['location'] = $loc['name'];
			if ($loc['key'] !== '') {
				$payload['locality'] = $loc['key'];
			}
			break;
		}
	}
	return $payload;
}

function fieldform_asset_url($url)
{
	$url = trim((string) $url);
	if ($url === '') {
		return '';
	}
	if (preg_match('#(?:^|/)uploads/([^/?#]+)$#', $url, $match)) {
		$CI =& get_instance();
		return rtrim($CI->config->item('base_url'), '/') . '/uploads/' . $match[1];
	}
	return $url;
}
