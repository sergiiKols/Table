# 📁 Структура проекта

Детальное описание структуры файлов и папок проекта.

## 🌳 Дерево проекта

```
DataManagementSystem/
│
├── 📄 START_HERE.md                      ⭐ НАЧНИТЕ С ЭТОГО ФАЙЛА!
├── 📄 README.md                          📖 Полная документация
├── 📄 QUICKSTART.md                      🚀 Быстрый старт (5 минут)
├── 📄 ARCHITECTURE.md                    🏗️ Архитектура системы
├── 📄 FEATURES.md                        ✨ Описание всех функций
├── 📄 PROJECT_OVERVIEW.md                📊 Обзор проекта
├── 📄 STRUCTURE.md                       📁 Этот файл
├── 📄 TODO.md                            📝 Планы развития
├── 📄 CONTRIBUTING.md                    🤝 Руководство для контрибьюторов
├── 📄 CHANGELOG.md                       📝 История изменений
├── 📄 .gitignore                         🚫 Git ignore правила
│
├── 🚀 setup-database.bat                 🛠️ Скрипт настройки БД
├── 🚀 start-backend.bat                  ▶️ Скрипт запуска Backend
├── 🚀 start-frontend.bat                 ▶️ Скрипт запуска Frontend
│
├── 📁 Backend/                           💻 Backend приложение
│   │
│   ├── 📄 README.md                      📖 Backend документация
│   ├── 📄 DataManagementSystem.sln       🎯 Visual Studio Solution
│   │
│   └── 📁 DataManagementSystem.API/      🌐 ASP.NET Core API проект
│       │
│       ├── 📄 Program.cs                 🎯 Точка входа приложения
│       ├── 📄 appsettings.json           ⚙️ Конфигурация приложения
│       ├── 📄 appsettings.Development.json ⚙️ Dev конфигурация
│       ├── 📄 DataManagementSystem.API.csproj 📦 Файл проекта
│       │
│       ├── 📁 Controllers/               🎮 API контроллеры
│       │   └── 📄 DataItemsController.cs  🎮 CRUD endpoints
│       │
│       ├── 📁 Models/                    📊 Модели данных (Entities)
│       │   └── 📄 DataItem.cs            📊 Основная модель
│       │
│       ├── 📁 DTOs/                      📦 Data Transfer Objects
│       │   └── 📄 DataItemDto.cs         📦 DTO для API
│       │       ├── CreateDataItemDto      ➕ Для создания
│       │       ├── UpdateDataItemDto      ✏️ Для обновления
│       │       └── DataItemResponseDto    📤 Для ответа
│       │
│       ├── 📁 Data/                      💾 Контекст базы данных
│       │   └── 📄 ApplicationDbContext.cs 💾 EF Core DbContext
│       │
│       ├── 📁 Repositories/              🗄️ Repository Pattern
│       │   ├── 📄 IDataItemRepository.cs  🗄️ Интерфейс
│       │   └── 📄 DataItemRepository.cs   🗄️ Реализация
│       │
│       └── 📁 Properties/                ⚙️ Настройки проекта
│           └── 📄 launchSettings.json    ⚙️ Настройки запуска
│
└── 📁 Frontend/                          🎨 Frontend приложение
    │
    ├── 📄 README.md                      📖 Frontend документация
    ├── 📄 package.json                   📦 NPM зависимости и скрипты
    ├── 📄 vite.config.js                 ⚙️ Конфигурация Vite
    ├── 📄 index.html                     🌐 HTML шаблон
    │
    └── 📁 src/                           💻 Исходный код
        │
        ├── 📄 main.jsx                   🎯 Точка входа React
        ├── 📄 App.jsx                    🎯 Главный компонент
        ├── 📄 App.css                    🎨 Стили App
        ├── 📄 index.css                  🎨 Глобальные стили
        │
        ├── 📁 components/                🧩 React компоненты
        │   ├── 📄 DataTable.jsx          📋 Таблица данных
        │   ├── 📄 DataItemModal.jsx      🪟 Модальное окно
        │   └── 📄 FilterBar.jsx          🔍 Панель фильтрации
        │
        └── 📁 services/                  🔌 Сервисы
            └── 📄 dataService.js         🔌 HTTP клиент (Axios)
```

---

## 📚 Описание папок

### 🗂️ Корневая папка

Содержит документацию, конфигурационные файлы и скрипты запуска.

**Основные файлы:**
- `START_HERE.md` - **Начните с этого файла!**
- `README.md` - Полная документация проекта
- `QUICKSTART.md` - Руководство по быстрому запуску
- Скрипты `.bat` - Автоматизация запуска

---

### 📁 Backend/

Серверная часть приложения на ASP.NET Core.

#### 📁 Backend/DataManagementSystem.API/

Основной проект API.

##### 📁 Controllers/
**Назначение:** API контроллеры для обработки HTTP запросов

**Файлы:**
- `DataItemsController.cs` - Контроллер с 6 endpoints:
  - GET `/api/dataitems` - Получить все
  - GET `/api/dataitems/{id}` - Получить по ID
  - GET `/api/dataitems/filter` - Фильтрация
  - POST `/api/dataitems` - Создать
  - PUT `/api/dataitems/{id}` - Обновить
  - DELETE `/api/dataitems/{id}` - Удалить

##### 📁 Models/
**Назначение:** Модели данных (Entities) для Entity Framework

**Файлы:**
- `DataItem.cs` - Основная модель с полями:
  - Id, Name, Description, Category
  - Value, IsActive, CreatedAt, UpdatedAt

##### 📁 DTOs/
**Назначение:** Data Transfer Objects для API

**Файлы:**
- `DataItemDto.cs` содержит:
  - `CreateDataItemDto` - Для создания записи
  - `UpdateDataItemDto` - Для обновления записи
  - `DataItemResponseDto` - Для ответа клиенту

##### 📁 Data/
**Назначение:** Контекст базы данных Entity Framework

**Файлы:**
- `ApplicationDbContext.cs` - DbContext с:
  - Конфигурацией моделей
  - Индексами
  - Seed данными

##### 📁 Repositories/
**Назначение:** Repository Pattern для абстракции данных

**Файлы:**
- `IDataItemRepository.cs` - Интерфейс репозитория
- `DataItemRepository.cs` - Реализация с методами:
  - GetAllAsync()
  - GetByIdAsync()
  - GetFilteredAsync()
  - CreateAsync()
  - UpdateAsync()
  - DeleteAsync()

##### 📁 Properties/
**Назначение:** Настройки проекта

**Файлы:**
- `launchSettings.json` - Настройки запуска (порты, окружение)

---

### 📁 Frontend/

Клиентская часть приложения на React.

#### 📁 Frontend/src/

Исходный код React приложения.

##### 📁 components/
**Назначение:** React компоненты UI

**Файлы:**
- `DataTable.jsx` - Таблица с данными:
  - Отображение записей
  - Форматирование дат и чисел
  - Кнопки действий
  - Состояния: загрузка, пустое, ошибка

- `DataItemModal.jsx` - Модальное окно:
  - Форма создания/редактирования
  - Валидация полей
  - Управление состоянием формы

- `FilterBar.jsx` - Панель фильтрации:
  - Поиск по тексту
  - Фильтр по категории
  - Фильтр по статусу
  - Кнопки управления

##### 📁 services/
**Назначение:** Сервисы для взаимодействия с API

**Файлы:**
- `dataService.js` - HTTP клиент:
  - Axios настройка
  - Методы для всех API endpoints
  - Обработка ошибок

---

## 📊 Статистика файлов

### Backend
| Тип | Количество | Назначение |
|-----|-----------|-----------|
| Controllers | 1 | API endpoints |
| Models | 1 | Entities |
| DTOs | 1 файл (3 класса) | API контракты |
| Repositories | 2 | Data access |
| Contexts | 1 | EF Core DbContext |
| Config | 3 | Настройки |

**Итого Backend:** ~10 файлов

### Frontend
| Тип | Количество | Назначение |
|-----|-----------|-----------|
| Components | 3 | UI компоненты |
| Services | 1 | API клиент |
| Main files | 4 | App, main, CSS |
| Config | 3 | package.json, vite, html |

**Итого Frontend:** ~11 файлов

### Документация
| Файл | Строки | Назначение |
|------|--------|-----------|
| README.md | ~500 | Полная документация |
| QUICKSTART.md | ~250 | Быстрый старт |
| ARCHITECTURE.md | ~400 | Архитектура |
| FEATURES.md | ~600 | Описание функций |
| PROJECT_OVERVIEW.md | ~400 | Обзор проекта |
| TODO.md | ~200 | Планы развития |
| CONTRIBUTING.md | ~300 | Для разработчиков |
| CHANGELOG.md | ~150 | История |
| START_HERE.md | ~150 | Стартовая страница |

**Итого документация:** ~2950 строк в 9 файлах

---

## 🎯 Ключевые файлы для изучения

### Начинающим:

1. **START_HERE.md** - Начните здесь!
2. **QUICKSTART.md** - Быстрый запуск
3. **Frontend/src/App.jsx** - Главная логика Frontend
4. **Backend/.../Controllers/DataItemsController.cs** - API endpoints

### Для понимания архитектуры:

1. **ARCHITECTURE.md** - Полное описание архитектуры
2. **Backend/.../Repositories/** - Repository Pattern
3. **Backend/.../Models/** - Модели данных
4. **Frontend/src/services/dataService.js** - API клиент

### Для разработчиков:

1. **CONTRIBUTING.md** - Как участвовать
2. **TODO.md** - Что можно добавить
3. **Backend/README.md** - Backend детали
4. **Frontend/README.md** - Frontend детали

---

## 🔧 Конфигурационные файлы

### Backend
- `appsettings.json` - Основные настройки (БД, логирование)
- `appsettings.Development.json` - Dev настройки
- `launchSettings.json` - Настройки запуска (порты)
- `DataManagementSystem.API.csproj` - Зависимости проекта

### Frontend
- `package.json` - NPM зависимости и скрипты
- `vite.config.js` - Настройки Vite (порт, плагины)
- `index.html` - HTML шаблон

### Общие
- `.gitignore` - Игнорируемые файлы для Git

---

## 📦 Зависимости

### Backend (NuGet)
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="6.0.25" />
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="6.0.25" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="6.0.25" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="6.0.25" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
```

### Frontend (NPM)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.2",
    "bootstrap": "^5.3.2",
    "react-bootstrap": "^2.9.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```

---

## 🗂️ Папки, создаваемые автоматически

### Backend
- `bin/` - Скомпилированные файлы
- `obj/` - Промежуточные файлы сборки
- `Migrations/` - EF Core миграции (после выполнения команд)

### Frontend
- `node_modules/` - NPM пакеты (после npm install)
- `dist/` - Production сборка (после npm run build)

**Примечание:** Эти папки добавлены в `.gitignore`

---

## 📂 Рекомендации по расширению

### Добавление новой функции Backend:

1. Создайте модель в `Models/`
2. Добавьте DbSet в `ApplicationDbContext`
3. Создайте DTOs в `DTOs/`
4. Создайте репозиторий в `Repositories/`
5. Создайте контроллер в `Controllers/`
6. Создайте миграцию: `dotnet ef migrations add ...`

### Добавление нового компонента Frontend:

1. Создайте файл в `src/components/`
2. Импортируйте в `App.jsx`
3. Добавьте стили в CSS файлы
4. При необходимости создайте сервис в `services/`

---

## 🎨 Соглашения по именованию

### Backend (C#)
- **PascalCase** для классов, методов, свойств
- **camelCase** для параметров, локальных переменных
- **I** префикс для интерфейсов (`IDataItemRepository`)
- **Dto** суффикс для DTO классов

### Frontend (JavaScript/React)
- **PascalCase** для компонентов React
- **camelCase** для функций, переменных
- **.jsx** расширение для React компонентов
- **.js** расширение для сервисов

---

**Документ обновлен:** 01.02.2026  
**Версия системы:** 1.0.0
