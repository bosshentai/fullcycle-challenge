CREATE TABLE IF NOT EXISTS accounts (
  id varchar(255) NOT NULL,
  client_id varchar(255) NOT NULL,
  balance float NOT NULL DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);