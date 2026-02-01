# 🟢 Supabase: Пошаговая настройка

Детальная инструкция по настройке Supabase для проекта. Каждый шаг с пояснениями.

---

## 📋 Что будем делать:

1. ✅ Создадим аккаунт на Supabase
2. ✅ Создадим проект и базу данных
3. ✅ Создадим таблицу DataItems
4. ✅ Вставим тестовые данные
5. ✅ Получим Connection String
6. ✅ Подключим Backend
7. ✅ Проверим работу

**Время:** ~5-7 минут

---

## ШАГ 1: Создание аккаунта (1 минута)

### 1.1. Откройте Supabase

Перейдите по ссылке: **https://supabase.com**

### 1.2. Регистрация

На главной странице:

1. Нажмите кнопку **"Start your project"** (зеленая кнопка вверху справа)
   
   Или прокрутите вниз и нажмите **"Start for free"**

2. Выберите способ регистрации:
   - **GitHub** (рекомендуется) ⭐
   - Google
   - Email

### 1.3. Если выбрали GitHub:

1. Нажмите **"Continue with GitHub"**
2. GitHub откроет окно авторизации
3. Нажмите **"Authorize supabase"**
4. Введите пароль GitHub (если попросит)

✅ **Готово!** Вы в Supabase Dashboard

---

## ШАГ 2: Создание проекта (2 минуты)

### 2.1. Создание организации (если первый раз)

При первом входе увидите:

**"Create a new organization"**

1. Organization name: `Ваше имя` или `Personal`
2. Plan: **Free** (уже выбран)
3. Нажмите **"Create organization"**

### 2.2. Создание проекта

Вы попадете на страницу **"All projects"**

1. Нажмите зеленую кнопку **"New project"** (справа вверху)

2. **Заполните форму:**

```
Organization: Personal (или ваша организация)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: 
    data-management-db
    
    💡 Можно любое имя, но без пробелов
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Database Password:
    ВашПароль123!
    
    ⚠️ ВАЖНО: Запишите этот пароль!
    Он понадобится для подключения Backend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Region:
    Europe (Central) - Frankfurt
    
    💡 Выберите ближайший к вам регион
    Для Европы: Europe (Central)
    Для США: US (East)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pricing Plan:
    Free (0$/month) - уже выбран
    
    ✅ 500 MB Database
    ✅ 50,000 monthly active users
```

3. Нажмите зеленую кнопку **"Create new project"**

### 2.3. Ожидание

Появится экран **"Setting up project..."**

⏳ Подождите 2-3 минуты (пока база данных создается)

☕ Можно выпить кофе

✅ **Готово!** Когда увидите Dashboard с графиками

---

## ШАГ 3: Создание таблицы (2 минуты)

### 3.1. Откройте SQL Editor

В левом меню найдите и нажмите:

🔹 **SQL Editor** (иконка с символом `</>`)

Вы попадете на страницу SQL редактора.

### 3.2. Создайте новый запрос

1. Нажмите кнопку **"+ New query"** (слева вверху)
   
   Или прямо в центре **"New query"**

2. Откроется пустой редактор SQL

### 3.3. Скопируйте и вставьте SQL

Скопируйте **весь** этот код и вставьте в редактор:

```sql
-- ============================================
-- Создание таблицы DataItems
-- ============================================

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

-- Создание индексов для быстрых запросов
CREATE INDEX "IX_DataItems_Category" ON "DataItems" ("Category");
CREATE INDEX "IX_DataItems_IsActive" ON "DataItems" ("IsActive");
CREATE INDEX "IX_DataItems_CreatedAt" ON "DataItems" ("CreatedAt" DESC);

-- Вставка тестовых данных
INSERT INTO "DataItems" ("Name", "Description", "Category", "Value", "IsActive", "CreatedAt") 
VALUES
    ('Пример записи 1', 'Это первая тестовая запись в системе', 'Тестовая', 100.50, true, NOW()),
    ('Пример записи 2', 'Вторая тестовая запись для демонстрации', 'Демо', 250.75, true, NOW()),
    ('Пример записи 3', 'Третья запись с другой категорией', 'Тестовая', 50.00, false, NOW()),
    ('Продукт А', 'Высококачественный продукт категории А', 'Рабочая', 1500.00, true, NOW()),
    ('Услуга Б', 'Профессиональные услуги для бизнеса', 'Рабочая', 3200.50, true, NOW())
ON CONFLICT DO NOTHING;

-- Отключение Row Level Security для упрощения
ALTER TABLE "DataItems" DISABLE ROW LEVEL SECURITY;

-- Проверка: показать все записи
SELECT * FROM "DataItems" ORDER BY "CreatedAt" DESC;
```

### 3.4. Выполните запрос

1. Нажмите кнопку **"Run"** (справа внизу)
   
   Или нажмите **Ctrl + Enter** (Cmd + Enter на Mac)

2. Подождите 2-3 секунды

### 3.5. Проверьте результат

Внизу в разделе **"Results"** должно появиться:

```
✅ Success. No rows returned
✅ Success. No rows returned
✅ Success. No rows returned
✅ 5 rows affected
✅ Success. No rows returned
```

А в конце таблица с 5 записями:

| Id | Name | Description | Category | Value | IsActive |
|----|------|-------------|----------|-------|----------|
| 1  | Пример записи 1 | ... | Тестовая | 100.50 | ✓ |
| 2  | Пример записи 2 | ... | Демо | 250.75 | ✓ |
| ... | ... | ... | ... | ... | ... |

✅ **Отлично!** Таблица создана с данными

---

## ШАГ 4: Проверка таблицы (1 минута)

### 4.1. Откройте Table Editor

В левом меню нажмите:

🔹 **Table Editor** (иконка таблицы)

### 4.2. Найдите таблицу DataItems

В списке таблиц слева вы должны увидеть:

- `DataItems` ✅

Нажмите на нее.

### 4.3. Просмотрите данные

Справа откроется таблица с вашими 5 записями:

- Можно кликнуть на любую строку для редактирования
- Можно добавить новую запись кнопкой **"Insert row"**
- Можно удалить строку

💡 **Совет:** Добавьте еще 1-2 записи вручную для тестирования

✅ **Таблица работает!**

---

## ШАГ 5: Получение Connection String (1 минута)

Теперь нужно получить строку подключения для Backend.

### 5.1. Откройте настройки проекта

В левом меню внизу нажмите:

⚙️ **Settings** (иконка шестеренки)

### 5.2. Перейдите в Database

В боковом меню Settings найдите и нажмите:

🔹 **Database**

### 5.3. Найдите Connection string

Прокрутите вниз до раздела **"Connection string"**

Вы увидите несколько вариантов:
- URI
- Connection pooling (Transaction mode)
- Connection pooling (Session mode)

### 5.4. Скопируйте Connection Pooling (рекомендуется)

1. Выберите вкладку **"Connection pooling"**
2. Mode: выберите **"Transaction"** (по умолчанию)
3. Нажмите на иконку **копирования** (📋) справа от строки

Строка будет выглядеть так:

```
postgresql://postgres.xxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

4. **Замените `[YOUR-PASSWORD]`** на ваш пароль из Шага 2.2

Например, если ваш пароль `ВашПароль123!`, то:

```
postgresql://postgres.xxxxxxxxxxx:ВашПароль123!@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

⚠️ **ВАЖНО:** Если в пароле есть специальные символы (`!`, `@`, `#`), их нужно закодировать:
- `!` → `%21`
- `@` → `%40`
- `#` → `%23`

Пример: `ВашПароль123!` → `ВашПароль123%21`

5. **Сохраните эту строку** в текстовый файл (понадобится дальше)

✅ **Connection String получен!**

---

## ШАГ 6: Подключение Backend (2 минуты)

### 6.1. Откройте проект в редакторе

Откройте проект в VS Code или другом редакторе:

```bash
cd path/to/Table
code .
```

### 6.2. Обновите appsettings.json

Откройте файл:
```
Backend/DataManagementSystem.API/appsettings.json
```

**Найдите раздел:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;..."
  }
}
```

**Замените на:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "postgresql://postgres.xxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
  }
}
```

Где вместо всей строки вставьте вашу Connection String из Шага 5.4

**Итоговый файл:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "postgresql://postgres.abcdefghijk:ВашПароль123%21@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
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

💾 **Сохраните файл** (Ctrl + S)

### 6.3. Восстановите пакеты

Откройте терминал в VS Code (Ctrl + `) или командную строку:

```bash
cd Backend/DataManagementSystem.API
dotnet restore
```

Подождите пока пакеты установятся (~30 секунд)

✅ **Backend настроен!**

---

## ШАГ 7: Проверка работы (2 минуты)

### 7.1. Запустите Backend

В терминале:

```bash
dotnet run
```

Должно появиться:

```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started.
```

✅ **Backend запущен!**

### 7.2. Откройте Swagger

Откройте браузер и перейдите:

```
http://localhost:5000/swagger
```

Вы должны увидеть Swagger UI с API документацией.

### 7.3. Протестируйте API

1. Найдите в списке **GET /api/dataitems**
2. Нажмите на него (развернется)
3. Нажмите кнопку **"Try it out"**
4. Нажмите синюю кнопку **"Execute"**

**Результат:**

Должен появиться **Response body** с вашими данными:

```json
[
  {
    "id": 1,
    "name": "Пример записи 1",
    "description": "Это первая тестовая запись в системе",
    "category": "Тестовая",
    "value": 100.50,
    "isActive": true,
    "createdAt": "2024-02-01T10:00:00",
    "updatedAt": null
  },
  ...
]
```

И **Response Code: 200**

✅ **API работает с Supabase!**

### 7.4. Запустите Frontend

Откройте **новый терминал** (не закрывая Backend):

```bash
cd Frontend
npm install   # если еще не устанавливали
npm run dev
```

Откройте: `http://localhost:3000`

Вы должны увидеть:
- ✅ Таблицу с данными из Supabase
- ✅ Кнопки действий работают
- ✅ Можно добавлять/редактировать/удалять записи

✅ **Весь стек работает!**

---

## 🎉 ПОЗДРАВЛЯЕМ!

Ваш проект полностью подключен к Supabase PostgreSQL!

---

## 📋 Чеклист завершения

Проверьте что всё работает:

- [ ] Supabase проект создан
- [ ] Таблица DataItems создана
- [ ] Тестовые данные вставлены
- [ ] Connection string получен
- [ ] Backend запускается без ошибок
- [ ] Swagger показывает данные
- [ ] Frontend отображает таблицу
- [ ] CRUD операции работают

---

## 🔧 Если что-то не работает

### Backend не запускается

**Ошибка:** `password authentication failed`

**Решение:** 
- Проверьте пароль в connection string
- Убедитесь что специальные символы закодированы

**Ошибка:** `SSL connection is required`

**Решение:** 
Добавьте в конец connection string: `;SSL Mode=Require;Trust Server Certificate=true`

### Swagger не показывает данные

**Ошибка:** `could not connect to server`

**Решение:**
- Проверьте что connection string правильный
- Проверьте firewall
- Убедитесь что Supabase проект активен

### Frontend не показывает данные

**Решение:**
- Убедитесь что Backend запущен
- Проверьте консоль браузера (F12)
- Проверьте Network tab - есть ли ошибки API

---

## 📚 Дополнительные возможности Supabase

### Row Level Security (RLS)

Для продакшена настройте политики доступа:

1. Table Editor → DataItems
2. Нажмите на таблицу → RLS
3. Enable RLS
4. Add Policy

### Supabase Auth

Добавьте аутентификацию пользователей:

1. Authentication → Settings
2. Enable providers (Email, Google, GitHub)
3. Используйте Supabase JS в Frontend

### Realtime

Получайте обновления в реальном времени:

```javascript
const subscription = supabase
  .from('DataItems')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()
```

### Storage

Храните файлы и изображения:

1. Storage → Create bucket
2. Upload files
3. Get public URLs

---

## 🆘 Поддержка

**Официальная документация:**
- https://supabase.com/docs

**Supabase Discord:**
- https://discord.supabase.com

**GitHub Issues:**
- Если нашли баг в Supabase

---

## 🎯 Следующие шаги

✅ Supabase настроен → Что дальше?

1. **Деплой Frontend на Vercel:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)
2. **Деплой Backend на Railway:** [DEPLOYMENT.md](DEPLOYMENT.md)
3. **Загрузка на GitHub:** [GITHUB_SETUP.md](GITHUB_SETUP.md)

---

**Версия:** 1.0.0  
**Последнее обновление:** 01.02.2026  
**Время выполнения:** 5-7 минут
