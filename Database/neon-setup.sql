-- ============================================
-- Скрипт для Neon
-- Выполните этот скрипт в Neon SQL Editor
-- ============================================

-- Создание таблицы DataItems
CREATE TABLE IF NOT EXISTS "DataItems" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(200) NOT NULL,
    "Description" VARCHAR(1000),
    "Category" VARCHAR(100) NOT NULL,
    "Value" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP
);

-- Создание индексов
CREATE INDEX IF NOT EXISTS "IX_DataItems_Category" ON "DataItems" ("Category");
CREATE INDEX IF NOT EXISTS "IX_DataItems_IsActive" ON "DataItems" ("IsActive");
CREATE INDEX IF NOT EXISTS "IX_DataItems_CreatedAt" ON "DataItems" ("CreatedAt" DESC);

-- Вставка тестовых данных
INSERT INTO "DataItems" ("Name", "Description", "Category", "Value", "IsActive", "CreatedAt") 
VALUES
    ('Пример записи 1', 'Это первая тестовая запись в системе', 'Тестовая', 100.50, true, NOW()),
    ('Пример записи 2', 'Вторая тестовая запись для демонстрации', 'Демо', 250.75, true, NOW()),
    ('Пример записи 3', 'Третья запись с другой категорией', 'Тестовая', 50.00, false, NOW())
ON CONFLICT DO NOTHING;

-- Проверка данных
SELECT * FROM "DataItems" ORDER BY "CreatedAt" DESC;

-- ============================================
-- Готово! Таблица создана в Neon
-- ============================================
