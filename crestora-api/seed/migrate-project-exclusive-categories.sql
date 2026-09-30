-- Run once on live DB (safe to re-run: skips if column exists).
USE crestora_db;

SET @db = DATABASE();

SET @sql = IF(
  (SELECT COUNT(*) FROM information_schema.COLUMNS
   WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'projects' AND COLUMN_NAME = 'is_exclusive') = 0,
  'ALTER TABLE projects ADD COLUMN is_exclusive TINYINT NOT NULL DEFAULT 0 AFTER is_popular',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = IF(
  (SELECT COUNT(*) FROM information_schema.COLUMNS
   WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'projects' AND COLUMN_NAME = 'categories_json') = 0,
  'ALTER TABLE projects ADD COLUMN categories_json TEXT NULL AFTER category',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE projects
SET is_exclusive = 1
WHERE is_exclusive = 0 AND (is_featured = 1 OR is_popular = 1);

UPDATE projects
SET categories_json = JSON_ARRAY(category)
WHERE (categories_json IS NULL OR categories_json = '' OR categories_json = '[]')
  AND category IS NOT NULL AND category != '';
