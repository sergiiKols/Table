-- ============================================
-- Скрипт для Supabase
-- Выполните этот скрипт в Supabase SQL Editor
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

-- ============================================
-- Настройка Row Level Security (RLS)
-- ============================================

-- Отключение RLS для простоты (для разработки)
-- В продакшене рекомендуется настроить политики доступа
ALTER TABLE "DataItems" DISABLE ROW LEVEL SECURITY;

-- Если нужно включить RLS, создайте политики:
/*
ALTER TABLE "DataItems" ENABLE ROW LEVEL SECURITY;

-- Политика для чтения (разрешить всем)
CREATE POLICY "Allow public read access"
ON "DataItems"
FOR SELECT
USING (true);

-- Политика для вставки (разрешить всем)
CREATE POLICY "Allow public insert access"
ON "DataItems"
FOR INSERT
WITH CHECK (true);

-- Политика для обновления (разрешить всем)
CREATE POLICY "Allow public update access"
ON "DataItems"
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Политика для удаления (разрешить всем)
CREATE POLICY "Allow public delete access"
ON "DataItems"
FOR DELETE
USING (true);
*/

-- ============================================
-- Проверка
-- ============================================

-- Проверка данных
SELECT * FROM "DataItems" ORDER BY "CreatedAt" DESC;

-- Проверка количества записей
SELECT COUNT(*) as total_records FROM "DataItems";

-- ============================================
-- Готово! Таблица создана в Supabase
-- ============================================
