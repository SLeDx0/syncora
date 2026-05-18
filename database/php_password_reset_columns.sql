-- PHP sifre sifirlama modulu artik kodlari members tablosunda degil,
-- ayri password_resets tablosunda hash'li ve sureli olarak saklar.

CREATE TABLE IF NOT EXISTS password_resets (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL,
  user_id VARCHAR(64) NULL,
  code_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_password_resets_email (email),
  INDEX idx_password_resets_user (user_id),
  INDEX idx_password_resets_active (email, expires_at, used_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
