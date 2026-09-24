UPDATE settings SET setting_value = REPLACE(setting_value, 'http://localhost/crestora-api', 'http://localhost:8080/crestora-api');
UPDATE sections SET payload = REPLACE(payload, 'http://localhost/crestora-api', 'http://localhost:8080/crestora-api');
