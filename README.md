# 🗄️ Система Управления Данными

Полнофункциональное веб-приложение для управления данными с трехслойной архитектурой.

## 📋 Содержание

- [Обзор](#обзор)
- [Архитектура](#архитектура)
- [Технологический стек](#технологический-стек)
- [Требования](#требования)
- [Установка и запуск](#установка-и-запуск)
- [Структура проекта](#структура-проекта)
- [API документация](#api-документация)
- [Функциональность](#функциональность)

## 🎯 Обзор

Система управления данными - это современное веб-приложение, построенное на базе ASP.NET Core и React.js. Приложение предоставляет удобный интерфейс для управления записями с полным набором CRUD операций (Create, Read, Update, Delete).

### Ключевые возможности:

- ✅ Просмотр данных в табличном виде с сортировкой
- ✅ Добавление новых записей через модальное окно
- ✅ Редактирование существующих записей
- ✅ Удаление записей с подтверждением
- ✅ Фильтрация по категории и статусу
- ✅ Поиск по названию и описанию
- ✅ Валидация данных на фронтенде и бэкенде
- ✅ Адаптивный дизайн для всех устройств

## 🏗️ Архитектура

Проект использует трехслойную архитектуру:

```
┌─────────────────────────────────┐
│   Уровень представления         │
│   (Frontend - React.js)         │
│   - Компоненты UI               │
│   - Управление состоянием       │
│   - HTTP клиент (Axios)         │
└─────────────────────────────────┘
              ↓ HTTP/REST API
┌─────────────────────────────────┐
│   Уровень бизнес-логики        │
│   (Backend - ASP.NET Core)      │
│   - API контроллеры             │
│   - Валидация данных            │
│   - Бизнес-логика               │
└─────────────────────────────────┘
              ↓ Entity Framework
┌─────────────────────────────────┐
│   Уровень данных                │
│   (Data Layer)                  │
│   - Repository Pattern          │
│   - Entity Framework Core       │
│   - MS SQL Server               │
└─────────────────────────────────┘
```

## 💻 Технологический стек

### Backend
- **ASP.NET Core 6.0** - веб-фреймворк
- **Entity Framework Core 6.0** - ORM для работы с БД
- **MS SQL Server / LocalDB** - база данных
- **Swagger** - документация API

### Frontend
- **React 18** - UI библиотека
- **Vite** - сборщик и dev-сервер
- **React Bootstrap** - UI компоненты
- **Axios** - HTTP клиент
- **Bootstrap 5** - стилизация

## 📦 Требования

Перед началом работы убедитесь, что установлены:

- **.NET 6.0 SDK** или выше - [Скачать](https://dotnet.microsoft.com/download)
- **Node.js 18+** и **npm** - [Скачать](https://nodejs.org/)
- **MS SQL Server** или **LocalDB** - [Скачать](https://www.microsoft.com/sql-server)
- **Visual Studio 2022** или **VS Code** (опционально)

## 🚀 Установка и запуск

### 🌐 Деплой на Vercel (Production)

**Быстрый деплой Frontend на Vercel:**

1. Форкните репозиторий: https://github.com/sergiiKols/Table
2. Перейдите на [vercel.com](https://vercel.com)
3. Импортируйте репозиторий
4. Следуйте инструкциям: [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

**Полное руководство по деплою:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

### 💻 Локальная разработка

### 1. Клонирование репозитория

```bash
git clone https://github.com/sergiiKols/Table.git
cd Table
```

### 2. Настройка Backend

#### 2.1. Перейдите в папку Backend

```bash
cd Backend/DataManagementSystem.API
```

#### 2.2. Восстановите зависимости

```bash
dotnet restore
```

#### 2.3. Настройте строку подключения

Проект настроен для **PostgreSQL** (Supabase/Neon).

Откройте файл `appsettings.json` и измените строку подключения:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "postgresql://user:password@host:5432/database"
  }
}
```

📖 **Подробная инструкция:** [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md)

💡 **Для локальной разработки** можно использовать Docker PostgreSQL или вернуться к SQL Server (см. комментарии в коде)

#### 2.4. Создайте базу данных

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

#### 2.5. Запустите Backend

```bash
dotnet run
```

Backend будет доступен по адресу: `http://localhost:5000`
Swagger UI: `http://localhost:5000/swagger`

### 3. Настройка Frontend

#### 3.1. Откройте новый терминал и перейдите в папку Frontend

```bash
cd Frontend
```

#### 3.2. Установите зависимости

```bash
npm install
```

#### 3.3. Настройте API URL (если необходимо)

Откройте `src/services/dataService.js` и проверьте URL:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

#### 3.4. Запустите Frontend

```bash
npm run dev
```

Frontend будет доступен по адресу: `http://localhost:3000`

### 4. Готово! 🎉

Откройте браузер и перейдите по адресу `http://localhost:3000`

## 📁 Структура проекта

```
DataManagementSystem/
├── Backend/
│   └── DataManagementSystem.API/
│       ├── Controllers/          # API контроллеры
│       │   └── DataItemsController.cs
│       ├── Models/               # Модели данных
│       │   └── DataItem.cs
│       ├── DTOs/                 # Data Transfer Objects
│       │   └── DataItemDto.cs
│       ├── Data/                 # Контекст БД
│       │   └── ApplicationDbContext.cs
│       ├── Repositories/         # Репозитории
│       │   ├── IDataItemRepository.cs
│       │   └── DataItemRepository.cs
│       ├── Program.cs            # Точка входа
│       ├── appsettings.json      # Конфигурация
│       └── DataManagementSystem.API.csproj
│
├── Frontend/
│   ├── src/
│   │   ├── components/           # React компоненты
│   │   │   ├── DataTable.jsx
│   │   │   ├── DataItemModal.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── services/             # API сервисы
│   │   │   └── dataService.js
│   │   ├── App.jsx               # Главный компонент
│   │   ├── App.css
│   │   ├── main.jsx              # Точка входа
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 📚 API документация

### Endpoints

#### GET `/api/dataitems`
Получить все элементы данных

**Ответ:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Пример записи",
    "description": "Описание",
    "category": "Тестовая",
    "value": 100.50,
    "isActive": true,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": null
  }
]
```

#### GET `/api/dataitems/{id}`
Получить элемент по ID

**Параметры:**
- `id` (int) - ID элемента

**Ответ:** `200 OK` или `404 Not Found`

#### GET `/api/dataitems/filter`
Получить отфильтрованные элементы

**Query параметры:**
- `category` (string, optional) - Категория
- `isActive` (bool, optional) - Статус активности
- `searchTerm` (string, optional) - Поисковый запрос

**Ответ:** `200 OK`

#### POST `/api/dataitems`
Создать новый элемент

**Тело запроса:**
```json
{
  "name": "Новая запись",
  "description": "Описание",
  "category": "Тестовая",
  "value": 100.00,
  "isActive": true
}
```

**Ответ:** `201 Created`

#### PUT `/api/dataitems/{id}`
Обновить существующий элемент

**Параметры:**
- `id` (int) - ID элемента

**Тело запроса:** аналогично POST

**Ответ:** `200 OK` или `404 Not Found`

#### DELETE `/api/dataitems/{id}`
Удалить элемент

**Параметры:**
- `id` (int) - ID элемента

**Ответ:** `204 No Content` или `404 Not Found`

## ✨ Функциональность

### Основные операции

#### Просмотр данных
- Табличное отображение всех записей
- Автоматическая сортировка по дате создания
- Форматирование дат и валют
- Индикаторы статуса (активен/неактивен)

#### Добавление записи
1. Нажмите кнопку "➕ Добавить"
2. Заполните форму в модальном окне
3. Нажмите "Сохранить"

#### Редактирование записи
**Способ 1:** Дважды кликните по строке в таблице
**Способ 2:** Нажмите кнопку "✏️ Изменить" в строке

#### Удаление записи
1. Нажмите кнопку "🗑️ Удалить" в строке
2. Подтвердите удаление в диалоговом окне

#### Фильтрация и поиск
- **Поиск:** Введите текст для поиска по названию и описанию
- **Категория:** Выберите категорию из выпадающего списка
- **Статус:** Фильтр по активным/неактивным записям
- Нажмите "Применить" или Enter для применения фильтров
- Нажмите "Сбросить" для очистки всех фильтров

### Валидация данных

#### Поля формы:
- **Название*** - обязательное, максимум 200 символов
- **Описание** - необязательное, максимум 1000 символов
- **Категория*** - обязательное, максимум 100 символов
- **Значение*** - обязательное, должно быть ≥ 0
- **Активен** - переключатель, по умолчанию включен

## 🔧 Разработка

### Запуск в режиме разработки

**Backend с hot reload:**
```bash
cd Backend/DataManagementSystem.API
dotnet watch run
```

**Frontend с hot reload:**
```bash
cd Frontend
npm run dev
```

### Создание миграций

```bash
cd Backend/DataManagementSystem.API
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Сборка для продакшена

**Backend:**
```bash
cd Backend/DataManagementSystem.API
dotnet publish -c Release -o ./publish
```

**Frontend:**
```bash
cd Frontend
npm run build
```

## 🛡️ Безопасность

- ✅ Валидация всех входных данных
- ✅ Параметризованные SQL запросы (защита от SQL injection)
- ✅ CORS настроен для безопасного взаимодействия
- ✅ Model validation на уровне API
- ✅ Error handling и логирование

## 🐛 Решение проблем

### Backend не запускается
- Проверьте, установлен ли .NET 6.0 SDK
- Убедитесь, что порт 5000 не занят
- Проверьте строку подключения к БД

### Frontend не запускается
- Проверьте, установлен ли Node.js 18+
- Выполните `npm install` заново
- Убедитесь, что порт 3000 не занят

### Ошибка подключения к БД
- Убедитесь, что SQL Server запущен
- Проверьте строку подключения в `appsettings.json`
- Выполните миграции: `dotnet ef database update`

### Ошибка CORS
- Проверьте, что Frontend URL указан в `Program.cs` в настройках CORS
- Убедитесь, что Backend запущен до Frontend

## 📄 Лицензия

Этот проект создан в образовательных целях.

## 👨‍💻 Автор

Система управления данными - учебный проект для демонстрации трехслойной архитектуры веб-приложения.

---

## 🎓 Дополнительные материалы

### Полезные ссылки:
- [Документация ASP.NET Core](https://docs.microsoft.com/aspnet/core)
- [Документация React](https://react.dev)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [Bootstrap](https://getbootstrap.com)

### Следующие шаги для расширения:
- 🔐 Добавить аутентификацию и авторизацию (JWT)
- 📊 Добавить дашборд с графиками и статистикой
- 📤 Экспорт данных в Excel/CSV
- 📥 Импорт данных из файлов
- 🔔 Уведомления пользователей
- 📱 Мобильное приложение
- 🌍 Мультиязычность (i18n)
- 🎨 Темная тема

---

**Приятной работы с системой! 🚀**
