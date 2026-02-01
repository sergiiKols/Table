# 📁 Database Scripts

SQL скрипты для создания таблиц в PostgreSQL (Supabase/Neon).

---

## 📋 Файлы

| Файл | Описание |
|------|----------|
| `create-tables-postgresql.sql` | Полный скрипт с комментариями и проверками |
| `supabase-setup.sql` | Скрипт для Supabase (с RLS настройками) |
| `neon-setup.sql` | Скрипт для Neon |

---

## 🚀 Быстрый старт

### Для Supabase

1. Откройте **Supabase Dashboard** → **SQL Editor**
2. Скопируйте содержимое `supabase-setup.sql`
3. Вставьте в редактор
4. Нажмите **Run** (Ctrl + Enter)
5. Проверьте **Table Editor** → видите таблицу **DataItems**

### Для Neon

1. Откройте **Neon Console** → **SQL Editor**
2. Скопируйте содержимое `neon-setup.sql`
3. Вставьте в редактор
4. Нажмите **Run**
5. Проверьте таблицу: `SELECT * FROM "DataItems";`

### Через Entity Framework Migrations

```bash
cd Backend/DataManagementSystem.API

# Удалите старые миграции (если есть)
rm -rf Migrations  # или Remove-Item -Recurse Migrations

# Создайте новую миграцию
dotnet ef migrations add InitialCreate_PostgreSQL

# Примените к базе
dotnet ef database update
```

---

## 📊 Структура таблицы DataItems

| Колонка | Тип | Описание |
|---------|-----|----------|
| `Id` | SERIAL (INT) | Первичный ключ, автоинкремент |
| `Name` | VARCHAR(200) | Название записи (обязательное) |
| `Description` | VARCHAR(1000) | Описание (необязательное) |
| `Category` | VARCHAR(100) | Категория (обязательное) |
| `Value` | DECIMAL(18,2) | Числовое значение |
| `IsActive` | BOOLEAN | Флаг активности |
| `CreatedAt` | TIMESTAMP | Дата создания (автоматически) |
| `UpdatedAt` | TIMESTAMP | Дата обновления (nullable) |

**Индексы:**
- `IX_DataItems_Category` - на поле Category
- `IX_DataItems_IsActive` - на поле IsActive
- `IX_DataItems_CreatedAt` - на поле CreatedAt (DESC)

---

## 🔍 Полезные SQL запросы

### Проверка структуры таблицы

```sql
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'DataItems'
ORDER BY ordinal_position;
```

### Проверка индексов

```sql
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'DataItems';
```

### Проверка данных

```sql
SELECT * FROM "DataItems" ORDER BY "CreatedAt" DESC;
```

### Статистика по категориям

```sql
SELECT 
    "Category",
    COUNT(*) as count,
    SUM("Value") as total_value,
    AVG("Value") as avg_value
FROM "DataItems"
GROUP BY "Category";
```

### Поиск записей

```sql
SELECT * FROM "DataItems" 
WHERE "Name" ILIKE '%тест%' 
   OR "Description" ILIKE '%тест%';
```

---

## 🔧 Troubleshooting

### Таблица уже существует

```sql
-- Удалить таблицу (ОСТОРОЖНО! Удалит все данные)
DROP TABLE IF EXISTS "DataItems" CASCADE;

-- Затем создайте заново
-- (выполните скрипт из файла)
```

### Проблемы с регистром

PostgreSQL чувствителен к регистру в кавычках:

```sql
-- ✅ Правильно
SELECT * FROM "DataItems";

-- ❌ Неправильно (если таблица создана с кавычками)
SELECT * FROM dataitems;
```

### Сброс последовательности ID

```sql
-- Если нужно сбросить автоинкремент
SELECT setval(pg_get_serial_sequence('"DataItems"', 'Id'), 
              COALESCE((SELECT MAX("Id") FROM "DataItems"), 1), 
              false);
```

---

## 📚 Дополнительная информация

См. полное руководство: [POSTGRESQL_SETUP.md](../POSTGRESQL_SETUP.md)

---

**Версия:** 1.0.0
