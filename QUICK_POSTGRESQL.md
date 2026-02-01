# ⚡ Быстрая настройка PostgreSQL

Самый быстрый способ настроить PostgreSQL для проекта.

---

## 🎯 Выбор: Supabase или Neon?

| Платформа | Плюсы | Минусы |
|-----------|-------|--------|
| **Supabase** | + Встроенный API<br>+ Auth из коробки<br>+ Storage | - База засыпает |
| **Neon** | + Не засыпает<br>+ Branching БД<br>+ Быстрее | - Только БД |

**Рекомендация:** Начните с **Supabase** для полного стека возможностей.

---

## 🚀 Supabase за 3 минуты

### 1. Создайте проект (1 минута)

1. Перейдите: https://supabase.com
2. Sign up через GitHub
3. New Project:
   - Name: `data-management-db`
   - Password: `ВашПароль123!`
   - Region: Europe Central
   - Free tier
4. Create

### 2. Создайте таблицу (1 минута)

1. SQL Editor (слева)
2. New Query
3. Скопируйте и вставьте:

```sql
CREATE TABLE "DataItems" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(200) NOT NULL,
    "Description" VARCHAR(1000),
    "Category" VARCHAR(100) NOT NULL,
    "Value" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP
);

CREATE INDEX "IX_DataItems_Category" ON "DataItems" ("Category");
CREATE INDEX "IX_DataItems_IsActive" ON "DataItems" ("IsActive");
CREATE INDEX "IX_DataItems_CreatedAt" ON "DataItems" ("CreatedAt" DESC);

INSERT INTO "DataItems" ("Name", "Description", "Category", "Value", "IsActive") VALUES
('Пример записи 1', 'Первая запись', 'Тестовая', 100.50, true),
('Пример записи 2', 'Вторая запись', 'Демо', 250.75, true),
('Пример записи 3', 'Третья запись', 'Тестовая', 50.00, false);

ALTER TABLE "DataItems" DISABLE ROW LEVEL SECURITY;

SELECT * FROM "DataItems";
```

4. Run (Ctrl + Enter)
5. Проверьте: Table Editor → должна быть таблица **DataItems**

### 3. Подключите Backend (1 минута)

1. Project Settings → Database → Connection string
2. Скопируйте **Connection pooling** строку:

```
postgresql://postgres.xxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

3. Вставьте в `Backend/.../appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "ваша_строка_подключения"
  }
}
```

4. Запустите Backend:

```bash
cd Backend/DataManagementSystem.API
dotnet run
```

5. Откройте: http://localhost:5000/swagger
6. Попробуйте GET /api/dataitems

✅ **Готово!** Backend работает с PostgreSQL!

---

## 🔵 Neon за 3 минуты

### 1. Создайте проект (1 минута)

1. Перейдите: https://neon.tech
2. Sign up через GitHub
3. Create Project:
   - Name: `data-management-db`
   - Region: Europe (Frankfurt)
   - PostgreSQL 16
4. Create

### 2. Скопируйте Connection String

Сразу после создания увидите:

```
postgresql://user:pass@ep-name-123.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

**Сохраните эту строку!**

### 3. Создайте таблицу

1. SQL Editor в Neon Console
2. Вставьте:

```sql
CREATE TABLE "DataItems" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(200) NOT NULL,
    "Description" VARCHAR(1000),
    "Category" VARCHAR(100) NOT NULL,
    "Value" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP
);

CREATE INDEX "IX_DataItems_Category" ON "DataItems" ("Category");
CREATE INDEX "IX_DataItems_IsActive" ON "DataItems" ("IsActive");

INSERT INTO "DataItems" ("Name", "Description", "Category", "Value", "IsActive") VALUES
('Пример 1', 'Первая запись', 'Тестовая', 100, true),
('Пример 2', 'Вторая запись', 'Демо', 250, true);

SELECT * FROM "DataItems";
```

3. Run

### 4. Подключите Backend

В `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "postgresql://user:pass@ep-name.neon.tech/neondb?sslmode=require"
  }
}
```

Запустите Backend → Готово!

---

## ✅ Проверка

### Backend работает?

```bash
dotnet run
# Откройте http://localhost:5000/swagger
# GET /api/dataitems → должны вернуться записи
```

### Frontend подключен?

```bash
cd Frontend
npm run dev
# Откройте http://localhost:3000
# Должны увидеть записи в таблице
```

---

## 🐛 Проблемы?

### "password authentication failed"
→ Проверьте пароль в connection string

### "SSL connection is required"
→ Добавьте в конец: `;SSL Mode=Require`

### "could not connect to server"
→ Проверьте firewall и что host правильный

### Таблица не найдена
→ Выполните SQL скрипт снова

---

## 📚 Подробная инструкция

См. полное руководство: [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md)

---

**Версия:** 1.0.0  
**Время настройки:** ~3-5 минут
