-- ============================================
-- Скрипт создания таблиц для PostgreSQL
-- Система управления данными
-- ============================================

-- Удаление таблицы если существует (осторожно! удалит все данные)
-- DROP TABLE IF EXISTS "DataItems" CASCADE;

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

-- Комментарии к таблице и колонкам
COMMENT ON TABLE "DataItems" IS 'Таблица для хранения элементов данных';
COMMENT ON COLUMN "DataItems"."Id" IS 'Уникальный идентификатор записи';
COMMENT ON COLUMN "DataItems"."Name" IS 'Название записи (обязательное)';
COMMENT ON COLUMN "DataItems"."Description" IS 'Описание записи (необязательное)';
COMMENT ON COLUMN "DataItems"."Category" IS 'Категория записи (обязательное)';
COMMENT ON COLUMN "DataItems"."Value" IS 'Числовое значение';
COMMENT ON COLUMN "DataItems"."IsActive" IS 'Флаг активности записи';
COMMENT ON COLUMN "DataItems"."CreatedAt" IS 'Дата и время создания';
COMMENT ON COLUMN "DataItems"."UpdatedAt" IS 'Дата и время последнего обновления';

-- Создание индексов для оптимизации запросов
CREATE INDEX IF NOT EXISTS "IX_DataItems_Category" ON "DataItems" ("Category");
CREATE INDEX IF NOT EXISTS "IX_DataItems_IsActive" ON "DataItems" ("IsActive");
CREATE INDEX IF NOT EXISTS "IX_DataItems_CreatedAt" ON "DataItems" ("CreatedAt" DESC);

-- Создание составного индекса для фильтрации
CREATE INDEX IF NOT EXISTS "IX_DataItems_Category_IsActive" ON "DataItems" ("Category", "IsActive");

-- Комментарии к индексам
COMMENT ON INDEX "IX_DataItems_Category" IS 'Индекс для быстрой фильтрации по категории';
COMMENT ON INDEX "IX_DataItems_IsActive" IS 'Индекс для фильтрации по статусу активности';
COMMENT ON INDEX "IX_DataItems_CreatedAt" IS 'Индекс для сортировки по дате создания';

-- Вставка тестовых данных
INSERT INTO "DataItems" ("Name", "Description", "Category", "Value", "IsActive", "CreatedAt") 
VALUES
    ('Пример записи 1', 'Это первая тестовая запись в системе', 'Тестовая', 100.50, true, NOW()),
    ('Пример записи 2', 'Вторая тестовая запись для демонстрации', 'Демо', 250.75, true, NOW()),
    ('Пример записи 3', 'Третья запись с другой категорией', 'Тестовая', 50.00, false, NOW()),
    ('Продукт А', 'Высококачественный продукт категории А', 'Рабочая', 1500.00, true, NOW()),
    ('Услуга Б', 'Профессиональные услуги для бизнеса', 'Рабочая', 3200.50, true, NOW()),
    ('Архивная запись', 'Старая запись для архива', 'Архив', 10.00, false, NOW())
ON CONFLICT DO NOTHING;

-- Проверка созданных таблиц
SELECT 
    'DataItems' as table_name,
    COUNT(*) as row_count
FROM "DataItems";

-- Проверка структуры таблицы
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'DataItems'
ORDER BY ordinal_position;

-- Проверка индексов
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'DataItems'
ORDER BY indexname;

-- ============================================
-- Полезные запросы для работы с таблицей
-- ============================================

-- Выбрать все записи
-- SELECT * FROM "DataItems" ORDER BY "CreatedAt" DESC;

-- Выбрать активные записи
-- SELECT * FROM "DataItems" WHERE "IsActive" = true;

-- Выбрать по категории
-- SELECT * FROM "DataItems" WHERE "Category" = 'Тестовая';

-- Поиск по названию или описанию
-- SELECT * FROM "DataItems" 
-- WHERE "Name" ILIKE '%запись%' OR "Description" ILIKE '%запись%';

-- Статистика по категориям
-- SELECT 
--     "Category",
--     COUNT(*) as count,
--     SUM("Value") as total_value,
--     AVG("Value") as avg_value
-- FROM "DataItems"
-- GROUP BY "Category"
-- ORDER BY count DESC;

-- Обновление записи
-- UPDATE "DataItems" 
-- SET "UpdatedAt" = NOW(), "Name" = 'Новое название'
-- WHERE "Id" = 1;

-- Удаление записи
-- DELETE FROM "DataItems" WHERE "Id" = 1;

-- ============================================
-- Завершено!
-- ============================================
