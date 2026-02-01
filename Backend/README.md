# Backend - ASP.NET Core Web API

## Обзор

Backend приложения построен на ASP.NET Core 6.0 и использует Entity Framework Core для работы с базой данных MS SQL Server.

## Структура проекта

```
DataManagementSystem.API/
├── Controllers/              # API контроллеры
│   └── DataItemsController.cs
├── Models/                   # Модели данных (Entity)
│   └── DataItem.cs
├── DTOs/                     # Data Transfer Objects
│   └── DataItemDto.cs
├── Data/                     # Database Context
│   └── ApplicationDbContext.cs
├── Repositories/             # Repository Pattern
│   ├── IDataItemRepository.cs
│   └── DataItemRepository.cs
├── Program.cs                # Точка входа и конфигурация
├── appsettings.json          # Настройки приложения
└── DataManagementSystem.API.csproj
```

## Архитектурные паттерны

### 1. Repository Pattern
Абстрагирует доступ к данным, упрощает тестирование и изменение источника данных.

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

### 2. DTO Pattern
Разделяет модели данных и API контракты, обеспечивает валидацию и безопасность.

### 3. Dependency Injection
Используется встроенный DI контейнер ASP.NET Core для управления зависимостями.

## API Endpoints

### DataItemsController

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/dataitems` | Получить все элементы |
| GET | `/api/dataitems/{id}` | Получить элемент по ID |
| GET | `/api/dataitems/filter` | Фильтрация элементов |
| POST | `/api/dataitems` | Создать новый элемент |
| PUT | `/api/dataitems/{id}` | Обновить элемент |
| DELETE | `/api/dataitems/{id}` | Удалить элемент |

## Модель данных

```csharp
public class DataItem
{
    public int Id { get; set; }                    // Первичный ключ
    public string Name { get; set; }               // Название (обязательно)
    public string? Description { get; set; }       // Описание (необязательно)
    public string Category { get; set; }           // Категория (обязательно)
    public decimal Value { get; set; }             // Числовое значение
    public bool IsActive { get; set; }             // Статус активности
    public DateTime CreatedAt { get; set; }        // Дата создания
    public DateTime? UpdatedAt { get; set; }       // Дата обновления
}
```

## Конфигурация

### appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=DataManagementDB;Trusted_Connection=true;MultipleActiveResultSets=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

### Настройка CORS

CORS настроен для разрешения запросов с Frontend:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
                       .AllowAnyHeader()
                       .AllowAnyMethod());
});
```

## Команды для работы

### Запуск приложения

```bash
dotnet run
```

### Запуск с hot reload

```bash
dotnet watch run
```

### Создание миграции

```bash
dotnet ef migrations add MigrationName
```

### Применение миграций

```bash
dotnet ef database update
```

### Откат миграции

```bash
dotnet ef database update PreviousMigrationName
```

### Удаление последней миграции

```bash
dotnet ef migrations remove
```

## Валидация данных

Валидация выполняется на двух уровнях:

### 1. Data Annotations (модель)
```csharp
[Required(ErrorMessage = "Название обязательно")]
[StringLength(200, ErrorMessage = "Максимум 200 символов")]
public string Name { get; set; }
```

### 2. Model State (контроллер)
```csharp
if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
```

## Обработка ошибок

Все контроллеры используют try-catch блоки для обработки исключений:

```csharp
try
{
    // Логика
}
catch (Exception ex)
{
    _logger.LogError(ex, "Сообщение об ошибке");
    return StatusCode(500, "Внутренняя ошибка сервера");
}
```

## Тестирование API

### Swagger UI

После запуска приложения откройте: `http://localhost:5000/swagger`

### Примеры запросов с curl

**Получить все элементы:**
```bash
curl -X GET http://localhost:5000/api/dataitems
```

**Создать новый элемент:**
```bash
curl -X POST http://localhost:5000/api/dataitems \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тестовая запись",
    "description": "Описание",
    "category": "Тест",
    "value": 100.50,
    "isActive": true
  }'
```

**Обновить элемент:**
```bash
curl -X PUT http://localhost:5000/api/dataitems/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Обновленная запись",
    "description": "Новое описание",
    "category": "Тест",
    "value": 200.00,
    "isActive": true
  }'
```

**Удалить элемент:**
```bash
curl -X DELETE http://localhost:5000/api/dataitems/1
```

## Производительность

### Оптимизации:
- Асинхронные методы (async/await)
- Индексы на часто запрашиваемых полях
- Пагинация (можно добавить)
- Кэширование (можно добавить)

## Безопасность

### Реализованные меры:
- ✅ Валидация входных данных
- ✅ Параметризованные запросы (EF Core)
- ✅ CORS политика
- ✅ Error handling без раскрытия деталей
- ✅ Логирование

### Рекомендуется добавить:
- 🔐 JWT аутентификация
- 🔐 Authorization policies
- 🔐 Rate limiting
- 🔐 HTTPS в продакшене

## Расширение функциональности

### Примеры улучшений:

1. **Пагинация:**
```csharp
public async Task<PagedResult<DataItem>> GetPagedAsync(int pageNumber, int pageSize)
{
    var items = await _context.DataItems
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    
    var total = await _context.DataItems.CountAsync();
    
    return new PagedResult<DataItem>
    {
        Items = items,
        TotalCount = total,
        PageNumber = pageNumber,
        PageSize = pageSize
    };
}
```

2. **Кэширование:**
```csharp
services.AddMemoryCache();
services.AddResponseCaching();
```

3. **Аутентификация:**
```csharp
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => { /* ... */ });
```

## Логирование

Встроенное логирование ASP.NET Core используется для отслеживания ошибок и событий:

```csharp
_logger.LogInformation("Получение всех элементов");
_logger.LogError(ex, "Ошибка при получении элемента {Id}", id);
```

## Troubleshooting

### Проблема: Миграции не применяются
**Решение:** Убедитесь, что строка подключения правильная и SQL Server запущен

### Проблема: CORS ошибки
**Решение:** Проверьте, что Frontend URL добавлен в CORS политику

### Проблема: Порт 5000 занят
**Решение:** Измените порт в `launchSettings.json` или `Program.cs`
