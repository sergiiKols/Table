# 🔵 Neon: Пошаговая настройка

Детальная инструкция по настройке Neon PostgreSQL для проекта.

---

## 📋 Что будем делать:

1. ✅ Создадим аккаунт на Neon
2. ✅ Создадим проект и базу данных
3. ✅ Создадим таблицу DataItems
4. ✅ Вставим тестовые данные
5. ✅ Получим Connection String
6. ✅ Подключим Backend
7. ✅ Проверим работу

**Время:** ~4-6 минут

---

## ШАГ 1: Создание аккаунта (1 минута)

### 1.1. Откройте Neon

Перейдите по ссылке: **https://neon.tech**

### 1.2. Регистрация

На главной странице:

1. Нажмите кнопку **"Sign Up"** (вверху справа)

2. Выберите способ регистрации:
   - **GitHub** (рекомендуется) ⭐
   - Google
   - Email

### 1.3. Если выбрали GitHub:

1. Нажмите **"Continue with GitHub"**
2. GitHub откроет окно авторизации
3. Нажмите **"Authorize neon"**
4. Введите пароль GitHub (если попросит)

✅ **Готово!** Вы в Neon Console

---

## ШАГ 2: Создание проекта (1 минута)

### 2.1. Создание первого проекта

После входа сразу откроется форма создания проекта:

**"Create your first project"**

Заполните форму:

```
Project name:
    data-management-db
    
    💡 Можно любое имя
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PostgreSQL version:
    16 (latest) - рекомендуется
    
    💡 Оставьте по умолчанию
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Region:
    Europe (Frankfurt) - aws-eu-central-1
    
    💡 Выберите ближайший регион
    Для Европы: Frankfurt
    Для США: US East (Virginia)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Compute size:
    0.25 vCPU / 1 GB RAM (Free tier)
    
    ✅ Это бесплатный план
```

Нажмите зеленую кнопку **"Create project"**

### 2.2. Получение Connection String

После создания проекта **сразу** появится окно с Connection String:

```
Connection string saved to your password manager

postgresql://username:password@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

⚠️ **ОЧЕНЬ ВАЖНО:** 

**Скопируйте эту строку прямо сейчас!**

Нажмите кнопку **"Copy"** или выделите и скопируйте (Ctrl + C)

💾 **Вставьте в текстовый файл** - она понадобится дальше

💡 **Совет:** Можно получить ее позже в Settings → Connection Details

Нажмите **"Continue"**

✅ **Проект создан!** Вы попадете в Dashboard

---

## ШАГ 3: Создание таблицы (2 минуты)

### 3.1. Откройте SQL Editor

В верхнем меню найдите и нажмите:

🔹 **SQL Editor**

Или в левом меню: **Query** (иконка `</>`)

### 3.2. Вставьте SQL скрипт

В редакторе SQL вставьте этот код:

```sql
-- Создание таблицы DataItems
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

-- Индексы
CREATE INDEX "IX_DataItems_Category" ON "DataItems" ("Category");
CREATE INDEX "IX_DataItems_IsActive" ON "DataItems" ("IsActive");
CREATE INDEX "IX_DataItems_CreatedAt" ON "DataItems" ("CreatedAt" DESC);

-- Тестовые данные
INSERT INTO "DataItems" ("Name", "Description", "Category", "Value", "IsActive") 
VALUES
    ('Пример записи 1', 'Первая тестовая запись', 'Тестовая', 100.50, true),
    ('Пример записи 2', 'Вторая тестовая запись', 'Демо', 250.75, true),
    ('Пример записи 3', 'Третья запись', 'Тестовая', 50.00, false),
    ('Продукт А', 'Качественный продукт', 'Рабочая', 1500.00, true),
    ('Услуга Б', 'Профессиональная услуга', 'Рабочая', 3200.50, true);

-- Проверка
SELECT * FROM "DataItems" ORDER BY "CreatedAt" DESC;
```

### 3.3. Выполните запрос

Нажмите **"Run"** (или Ctrl + Enter)

### 3.4. Проверьте результат

Внизу должна появиться таблица с 5 записями:

| Id | Name | Category | Value | IsActive |
|----|------|----------|-------|----------|
| 5 | Услуга Б | Рабочая | 3200.50 | ✓ |
| 4 | Продукт А | Рабочая | 1500.00 | ✓ |
| ... | ... | ... | ... | ... |

✅ **Таблица создана!**

---

## ШАГ 4: Проверка в Tables (опционально)

### 4.1. Откройте Tables

В левом меню нажмите:

🔹 **Tables**

### 4.2. Найдите DataItems

В списке должна быть таблица **DataItems**

Нажмите на нее → увидите структуру и данные

✅ **Всё на месте!**

---

## ШАГ 5: Connection String (если не сохранили)

Если не скопировали Connection String на Шаге 2.2:

### 5.1. Откройте Dashboard

Нажмите на логотип Neon вверху слева

Или в меню: **Dashboard**

### 5.2. Найдите Connection Details

В разделе **"Connection Details"** справа вы увидите:

```
Connection string
postgresql://username:password@ep-name.neon.tech/neondb?sslmode=require
```

Нажмите **"Copy"**

✅ **Connection String получен!**

---

## ШАГ 6: Подключение Backend (1 минута)

### 6.1. Откройте appsettings.json

```
Backend/DataManagementSystem.API/appsettings.json
```

### 6.2. Вставьте Connection String

Замените:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "ваша_connection_string_из_neon"
  }
}
```

Пример:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "postgresql://neondb_owner:abc123@ep-cool-name-123.eu-central-1.aws.neon.tech/neondb?sslmode=require"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

💾 Сохраните (Ctrl + S)

### 6.3. Восстановите пакеты

```bash
cd Backend/DataManagementSystem.API
dotnet restore
```

✅ **Backend настроен!**

---

## ШАГ 7: Проверка (1 минута)

### 7.1. Запустите Backend

```bash
dotnet run
```

### 7.2. Откройте Swagger

```
http://localhost:5000/swagger
```

### 7.3. Тест API

GET `/api/dataitems` → Execute

Должны вернуться ваши 5 записей!

### 7.4. Запустите Frontend

```bash
cd Frontend
npm run dev
```

Откройте `http://localhost:3000`

✅ **Всё работает с Neon!**

---

## 🎉 Готово!

Проект подключен к Neon PostgreSQL!

---

## 📋 Чеклист

- [ ] Neon проект создан
- [ ] Таблица DataItems создана  
- [ ] Connection string сохранен
- [ ] Backend подключен
- [ ] API работает
- [ ] Frontend отображает данные

---

## 🔧 Troubleshooting

### "password authentication failed"
→ Проверьте connection string

### "SSL connection required"
→ Убедитесь что в конце есть `?sslmode=require`

### "could not connect"
→ Проверьте что проект Neon активен (не удален)

---

## 🆘 Поддержка

- Документация: https://neon.tech/docs
- Discord: https://discord.gg/neon

---

**Версия:** 1.0.0  
**Время:** 4-6 минут
