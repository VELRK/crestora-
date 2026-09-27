-- Link enquiries and site visits to a project (run once on live/local DB).
-- Safe to re-run: skip any statement that errors with "Duplicate column name".

USE crestora_db;

ALTER TABLE enquiries
  ADD COLUMN project_code VARCHAR(64) NOT NULL DEFAULT '' AFTER project_name;

ALTER TABLE site_visits
  ADD COLUMN project_code VARCHAR(64) NOT NULL DEFAULT '' AFTER project_name;
