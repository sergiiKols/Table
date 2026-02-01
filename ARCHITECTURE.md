# Архитектура системы управления данными

## Общая схема

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                          │
│                    React Application                         │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    WEB SERVER                                │
│                  ASP.NET Core API                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Presentation Layer (Controllers)                     │   │
│  │  - DataItemsController                                │   │
│  │  - Routing, HTTP methods, Response formatting         │   │
│  └───────────────────┬──────────────────────────────────┘   │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic Layer (Services)                      │   │
│  │  - Validation                                         │   │
│  │  - Business rules                                     │   │
│  │  - DTOs mapping                                       │   │
│  └───────────────────┬──────────────────────────────────┘   │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Data Access Layer (Repositories)                     │   │
│  │  - IDataItemRepository                                │   │
│  │  - DataItemRepository                                 │   │
│  │  - Entity Framework Core                              │   │
│  └───────────────────┬──────────────────────────────────┘   │
└────────────────────────┼────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE SERVER                            │
│                   MS SQL Server                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Tables:                                              │   │
│  │  - DataItems (Id, Name, Description, Category, ...)  │   │
│  │  - __EFMigrationsHistory                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Слои приложения

### 1. Presentation Layer (Уровень представления)

#### Frontend (React)
- **Ответственность:** Отображение UI, обработка пользовательского ввода
- **Компоненты:**
  - `App.jsx` - главный компонент, координатор
  - `DataTable.jsx` - отображение таблицы
  - `DataItemModal.jsx` - формы создания/редактирования
  - `FilterBar.jsx` - панель фильтрации

#### Backend (Controllers)
- **Ответственность:** Обработка HTTP запросов, маршрутизация
- **Компоненты:**
  - `DataItemsController` - REST API endpoints

### 2. Business Logic Layer (Уровень бизнес-логики)

- **Ответственность:** Валидация, бизнес-правила, преобразование данных
- **Компоненты:**
  - DTOs (CreateDataItemDto, UpdateDataItemDto)
  - Model validation attributes
  - Business rules enforcement

### 3. Data Access Layer (Уровень доступа к данным)

- **Ответственность:** Работа с базой данных, абстракция данных
- **Компоненты:**
  - `IDataItemRepository` - интерфейс репозитория
  - `DataItemRepository` - реализация репозитория
  - `ApplicationDbContext` - контекст Entity Framework
  - `DataItem` - модель сущности

### 4. Database Layer (Уровень базы данных)

- **Ответственность:** Хранение данных
- **Технология:** MS SQL Server / LocalDB
- **Управление:** Entity Framework Core Migrations

## Паттерны проектирования

### 1. Repository Pattern

**Цель:** Абстрагировать доступ к данным

```csharp
public interface IDataItemRepository
{
    Task<IEnumerable<DataItem>> GetAllAsync();
    Task<DataItem?> GetByIdAsync(int id);
    Task<DataItem> CreateAsync(DataItem item);
    Task<DataItem?> UpdateAsync(int id, DataItem item);
    Task<bool> DeleteAsync(int id);
}
```

**Преимущества:**
- Легкое тестирование (можно замокать)
- Изменение источника данных без изменения бизнес-логики
- Централизация логики доступа к данным

### 2. Data Transfer Object (DTO) Pattern

**Цель:** Разделить внутренние модели и API контракты

```csharp
// Для создания
public class CreateDataItemDto { ... }

// Для обновления
public class UpdateDataItemDto { ... }

// Для ответа
public class DataItemResponseDto { ... }
```

**Преимущества:**
- Контроль над тем, какие данные отправляются клиенту
- Валидация на уровне API
- Версионирование API без изменения моделей

### 3. Dependency Injection

**Цель:** Уменьшить связность компонентов

```csharp
// Регистрация
builder.Services.AddScoped<IDataItemRepository, DataItemRepository>();

// Использование
public class DataItemsController : ControllerBase
{
    private readonly IDataItemRepository _repository;
    
    public DataItemsController(IDataItemRepository repository)
    {
        _repository = repository;
    }
}
```

**Преимущества:**
- Легкое тестирование
- Гибкость в изменении реализаций
- Управление жизненным циклом объектов

## Потоки данных

### Сценарий 1: Загрузка данных

```
User Action → Frontend Component → dataService.getAll()
    ↓
HTTP GET /api/dataitems
    ↓
DataItemsController.GetAll()
    ↓
IDataItemRepository.GetAllAsync()
    ↓
Entity Framework Core → SQL Query
    ↓
Database → Returns Data
    ↓
Repository → Returns List<DataItem>
    ↓
Controller → Maps to List<DataItemResponseDto>
    ↓
HTTP 200 OK + JSON Response
    ↓
Frontend → Updates State → Re-renders Table
```

### Сценарий 2: Создание записи

```
User fills form → Clicks "Save" → Validation
    ↓
dataService.create(formData)
    ↓
HTTP POST /api/dataitems + JSON Body
    ↓
DataItemsController.Create(CreateDataItemDto)
    ↓
Model Validation → If Invalid: return 400 BadRequest
    ↓
Maps DTO to DataItem Entity
    ↓
IDataItemRepository.CreateAsync(item)
    ↓
Entity Framework Core → INSERT SQL
    ↓
Database → Returns new record with ID
    ↓
Repository → Returns created DataItem
    ↓
Controller → Maps to DataItemResponseDto
    ↓
HTTP 201 Created + Location Header + JSON Response
    ↓
Frontend → Closes Modal → Reloads Data
```

### Сценарий 3: Фильтрация данных

```
User sets filters → Clicks "Apply"
    ↓
dataService.getFiltered(category, isActive, searchTerm)
    ↓
HTTP GET /api/dataitems/filter?category=X&isActive=true
    ↓
DataItemsController.GetFiltered(params)
    ↓
IDataItemRepository.GetFilteredAsync(...)
    ↓
Entity Framework Core → Builds SQL with WHERE clauses
    ↓
Database → Returns filtered data
    ↓
Repository → Returns List<DataItem>
    ↓
Controller → Maps to List<DataItemResponseDto>
    ↓
HTTP 200 OK + JSON Response
    ↓
Frontend → Updates State → Re-renders Table with filtered data
```

## Безопасность

### Уровень Frontend
- Валидация форм перед отправкой
- Обработка ошибок HTTP
- XSS защита (React автоматически экранирует)

### Уровень Backend
- Model validation (Data Annotations)
- CORS политика
- Параметризованные запросы (EF Core)
- Error handling без раскрытия деталей
- Логирование

### Уровень Database
- Restricted user permissions
- SQL Injection защита через EF Core
- Backup & Recovery strategy

## Масштабируемость

### Горизонтальное масштабирование
- Stateless API (можно добавить несколько инстансов)
- Load balancer для распределения нагрузки
- CDN для статических файлов Frontend

### Вертикальное масштабирование
- Оптимизация запросов к БД
- Индексы на часто запрашиваемых полях
- Кэширование (можно добавить Redis)

### Будущие улучшения
- Message queue для асинхронных операций
- Микросервисная архитектура
- Кэширование ответов API
- Database replication

## Тестирование

### Frontend
- Unit тесты компонентов (Jest + React Testing Library)
- Integration тесты API вызовов
- E2E тесты (Cypress/Playwright)

### Backend
- Unit тесты репозиториев
- Integration тесты контроллеров
- API тесты (xUnit + WebApplicationFactory)

## Производительность

### Оптимизации
- Асинхронные операции (async/await)
- Индексы в базе данных
- Минимизация данных в DTO
- Compression для HTTP responses
- Lazy loading для Entity Framework

### Мониторинг
- Application Insights (Azure)
- Logging (Serilog)
- Performance counters
- Database query profiling

## Развертывание

### Backend
- Docker container
- Azure App Service
- IIS на Windows Server

### Frontend
- Static hosting (Netlify, Vercel)
- Azure Static Web Apps
- CDN integration

### Database
- Azure SQL Database
- SQL Server on VM
- Database migrations через EF Core
