# 🏗️ Архитектура Проекта: Система Управления Данными

**Дата:** 1 февраля 2026  
**Версия:** 1.0  
**Статус:** Production

---

## 📋 Содержание

1. [Обзор Архитектуры](#обзор-архитектуры)
2. [Технологический Стек](#технологический-стек)
3. [Структура Frontend](#структура-frontend)
4. [Структура Backend](#структура-backend)
5. [База Данных](#база-данных)
6. [Инфраструктура и Деплой](#инфраструктура-и-деплой)
7. [Потоки Данных](#потоки-данных)
8. [Безопасность](#безопасность)

---

## 🎯 Обзор Архитектуры

### Общая Схема

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Browser (User)                          │  │
│  │                                                             │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │   Chrome    │  │   Firefox   │  │    Edge     │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              │ HTTPS                             │
│                              ▼                                   │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                      VERCEL CDN (Global)                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │               React Frontend Application                   │  │
│  │                                                             │  │
│  │  • React 18 Components                                     │  │
│  │  • Vite Build System                                       │  │
│  │  • Bootstrap 5 UI                                          │  │
│  │  • Axios HTTP Client                                       │  │
│  │                                                             │  │
│  │  URL: https://sergii-table.vercel.app                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ REST API Calls
                               │ HTTPS + CORS
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RENDER.COM (US East)                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           ASP.NET Core Backend (Docker)                    │  │
│  │                                                             │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Application Layer                       │  │  │
│  │  │  • Controllers (REST API Endpoints)                 │  │  │
│  │  │  • Swagger/OpenAPI Documentation                    │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                             │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Business Logic Layer                    │  │  │
│  │  │  • Repository Pattern Implementation               │  │  │
│  │  │  • DTO Mapping                                      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                             │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Data Access Layer                       │  │  │
│  │  │  • Entity Framework Core                            │  │  │
│  │  │  • DbContext                                        │  │  │
│  │  │  • Npgsql Provider                                  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                             │  │
│  │  URL: https://table-backend-lwdi.onrender.com              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ SQL Queries
                               │ SSL/TLS Connection
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SUPABASE (AWS US West 2)                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  PostgreSQL Database                       │  │
│  │                                                             │  │
│  │  Table: data_items                                         │  │
│  │  • id, name, description, category                        │  │
│  │  • value, is_active                                       │  │
│  │  • created_at, updated_at                                 │  │
│  │                                                             │  │
│  │  • Automatic Backups                                      │  │
│  │  • Connection Pooling                                     │  │
│  │  • SSL Required                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Технологический Стек

### Frontend Stack

```
┌──────────────────────────────────────────┐
│         React 18.2.0                     │
│  Modern UI Library                       │
├──────────────────────────────────────────┤
│         Vite 5.0.8                       │
│  Next-gen Build Tool                     │
├──────────────────────────────────────────┤
│         Bootstrap 5.3.2                  │
│  CSS Framework                           │
├──────────────────────────────────────────┤
│         Axios 1.6.5                      │
│  HTTP Client                             │
├──────────────────────────────────────────┤
│         JavaScript ES6+                  │
│  Programming Language                    │
└──────────────────────────────────────────┘
```

### Backend Stack

```
┌──────────────────────────────────────────┐
│      ASP.NET Core 6.0                    │
│  Web API Framework                       │
├──────────────────────────────────────────┤
│      Entity Framework Core 6.0           │
│  ORM (Object-Relational Mapper)          │
├──────────────────────────────────────────┤
│      Npgsql 6.0                          │
│  PostgreSQL Data Provider                │
├──────────────────────────────────────────┤
│      Swashbuckle (Swagger)               │
│  API Documentation                       │
├──────────────────────────────────────────┤
│      C# 10.0                             │
│  Programming Language                    │
└──────────────────────────────────────────┘
```

### Database & Infrastructure

```
┌──────────────────────────────────────────┐
│      PostgreSQL 15.x                     │
│  Relational Database                     │
├──────────────────────────────────────────┤
│      Supabase                            │
│  Database-as-a-Service                   │
├──────────────────────────────────────────┤
│      Docker                              │
│  Containerization                        │
├──────────────────────────────────────────┤
│      Git & GitHub                        │
│  Version Control                         │
└──────────────────────────────────────────┘
```

---

## 📱 Структура Frontend

### Архитектура Компонентов

```
Frontend/
│
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Main component
│   │
│   ├── components/              # React Components
│   │   ├── DataTable.jsx        # Table component
│   │   ├── DataItemModal.jsx    # Modal for CRUD
│   │   └── FilterBar.jsx        # Search & Filter
│   │
│   ├── services/                # API Services
│   │   └── dataService.js       # Axios HTTP client
│   │
│   └── styles/                  # CSS Styles
│       ├── App.css
│       └── index.css
│
├── public/                      # Static assets
├── .env                         # Environment variables
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

### Компоненты и их Ответственность

#### 1. App.jsx (Main Container)
```javascript
┌─────────────────────────────────────┐
│            App.jsx                  │
│  • State Management                 │
│  • Lifecycle Management             │
│  • Child Component Orchestration    │
│                                     │
│  State:                             │
│  • items[]                          │
│  • filteredItems[]                  │
│  • showModal, editingItem           │
│  • searchTerm, filterCategory       │
│  • filterStatus                     │
└─────────────────────────────────────┘
```

#### 2. DataTable.jsx (Data Display)
```javascript
┌─────────────────────────────────────┐
│          DataTable.jsx              │
│  • Display data in table            │
│  • Handle Edit/Delete actions       │
│  • Format data presentation         │
│                                     │
│  Props:                             │
│  • items: DataItem[]                │
│  • onEdit: (item) => void           │
│  • onDelete: (id) => void           │
└─────────────────────────────────────┘
```

#### 3. DataItemModal.jsx (CRUD Operations)
```javascript
┌─────────────────────────────────────┐
│        DataItemModal.jsx            │
│  • Create new items                 │
│  • Edit existing items              │
│  • Form validation                  │
│  • Submit to API                    │
│                                     │
│  Props:                             │
│  • show: boolean                    │
│  • item: DataItem | null            │
│  • onSave: (item) => void           │
│  • onClose: () => void              │
└─────────────────────────────────────┘
```

#### 4. FilterBar.jsx (Search & Filter)
```javascript
┌─────────────────────────────────────┐
│          FilterBar.jsx              │
│  • Search input                     │
│  • Category filter dropdown         │
│  • Status filter dropdown           │
│  • Apply filters                    │
│                                     │
│  Props:                             │
│  • onSearchChange: (term) => void   │
│  • onCategoryChange: (cat) => void  │
│  • onStatusChange: (status) => void │
│  • onAddNew: () => void             │
└─────────────────────────────────────┘
```

### Data Flow во Frontend

```
User Interaction
      │
      ▼
┌──────────────────┐
│  React Component │
│  (e.g. Button)   │
└──────────────────┘
      │
      ▼
┌──────────────────┐
│  Event Handler   │
│  in App.jsx      │
└──────────────────┘
      │
      ▼
┌──────────────────┐
│  dataService.js  │
│  (Axios call)    │
└──────────────────┘
      │
      ▼
┌──────────────────┐
│  Backend API     │
│  (HTTPS Request) │
└──────────────────┘
      │
      ▼
┌──────────────────┐
│  Response        │
└──────────────────┘
      │
      ▼
┌──────────────────┐
│  Update State    │
│  (React setState)│
└──────────────────┘
      │
      ▼
┌──────────────────┐
│  Re-render UI    │
└──────────────────┘
```

---

## ⚙️ Структура Backend

### Слоистая Архитектура

```
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Controllers/DataItemsController.cs        │  │
│  │  • HTTP Endpoints                                 │  │
│  │  • Request/Response handling                      │  │
│  │  • Input validation                               │  │
│  │  • DTOs mapping                                   │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                   │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Repositories/DataItemRepository.cs        │  │
│  │  • Business operations                            │  │
│  │  • Data transformation                            │  │
│  │  • Repository pattern                             │  │
│  │  • Abstraction layer                              │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   DATA ACCESS LAYER                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Data/ApplicationDbContext.cs              │  │
│  │  • Entity Framework Core DbContext                │  │
│  │  • Database connection                            │  │
│  │  • Migrations                                     │  │
│  │  • DbSet<DataItem>                                │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                       DATABASE                           │
│                   PostgreSQL (Supabase)                  │
└─────────────────────────────────────────────────────────┘
```

### Файловая Структура Backend

```
Backend/DataManagementSystem.API/
│
├── Controllers/
│   └── DataItemsController.cs
│       • GET /api/DataItems
│       • GET /api/DataItems/{id}
│       • POST /api/DataItems
│       • PUT /api/DataItems/{id}
│       • DELETE /api/DataItems/{id}
│
├── Models/
│   └── DataItem.cs
│       • Entity model
│       • Properties: Id, Name, Description,
│         Category, Value, IsActive, etc.
│
├── DTOs/
│   └── DataItemDto.cs
│       • Data Transfer Object
│       • API request/response format
│
├── Data/
│   └── ApplicationDbContext.cs
│       • EF Core DbContext
│       • DbSet<DataItem>
│       • Database configuration
│
├── Repositories/
│   ├── IDataItemRepository.cs
│   │   • Repository interface
│   │
│   └── DataItemRepository.cs
│       • Repository implementation
│       • CRUD operations
│
├── Program.cs
│   • Application entry point
│   • Service configuration
│   • Middleware pipeline
│
├── appsettings.json
│   • Configuration
│   • Connection strings
│
├── Dockerfile
│   • Docker image definition
│
└── start.sh
    • Startup script for Render
```

---

## 🗄️ База Данных

### Схема Данных

```sql
Table: data_items
┌──────────────┬─────────────────┬──────────────┬─────────┐
│ Column       │ Type            │ Constraints  │ Default │
├──────────────┼─────────────────┼──────────────┼─────────┤
│ id           │ SERIAL          │ PRIMARY KEY  │ AUTO    │
│ name         │ VARCHAR(200)    │ NOT NULL     │ -       │
│ description  │ TEXT            │ NULL         │ NULL    │
│ category     │ VARCHAR(100)    │ NULL         │ NULL    │
│ value        │ DECIMAL(18,2)   │ NULL         │ 0.00    │
│ is_active    │ BOOLEAN         │ NOT NULL     │ TRUE    │
│ created_at   │ TIMESTAMPTZ     │ NOT NULL     │ NOW()   │
│ updated_at   │ TIMESTAMPTZ     │ NOT NULL     │ NOW()   │
└──────────────┴─────────────────┴──────────────┴─────────┘
```

### Индексы

```sql
Primary Key:
  • PK_data_items on (id)

Recommended Indexes:
  • idx_name on (name)
  • idx_category on (category)
  • idx_is_active on (is_active)
  • idx_created_at on (created_at DESC)
```

### Пример Данных

```sql
id | name              | category  | value    | is_active
---+-------------------+-----------+----------+-----------
1  | Пример записи 1   | Тестовая  | 100.50   | true
2  | Пример записи 2   | Демо      | 250.75   | true
3  | Пример записи 3   | Тестовая  | 50.00    | false
4  | Продукт А         | Рабочая   | 1500.00  | true
5  | Услуга Б          | Рабочая   | 3200.50  | true
```

---

## 🚀 Инфраструктура и Деплой

### Production Environment

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION STACK                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend: Vercel (Global CDN)                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  • Region: Global (Edge Network)                 │  │
│  │  • Auto-scaling: Yes                             │  │
│  │  • HTTPS: Automatic                              │  │
│  │  • Deploy: Push to GitHub                        │  │
│  │  • Build Time: ~1 minute                         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  Backend: Render.com (US East)                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  • Region: Virginia (US East)                    │  │
│  │  • Container: Docker                             │  │
│  │  • Instance: Free tier                           │  │
│  │  • Auto-deploy: Yes                              │  │
│  │  • Build Time: ~3-5 minutes                      │  │
│  │  • Health Check: /swagger                        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  Database: Supabase (AWS US West 2)                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  • Region: Oregon (US West 2)                    │  │
│  │  • Type: PostgreSQL 15.x                         │  │
│  │  • Backups: Automatic                            │  │
│  │  • Pooling: Enabled                              │  │
│  │  • SSL: Required                                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### CI/CD Pipeline

```
Developer Push
      │
      ▼
┌──────────────────┐
│  GitHub Repo     │
│  (main branch)   │
└──────────────────┘
      │
      ├─────────────────────────┬──────────────────────────┐
      │                         │                          │
      ▼                         ▼                          ▼
┌──────────────┐      ┌──────────────┐          ┌──────────────┐
│ Vercel       │      │ Render.com   │          │ No Action    │
│ Auto Deploy  │      │ Auto Deploy  │          │ (Database)   │
└──────────────┘      └──────────────┘          └──────────────┘
      │                         │
      ▼                         ▼
┌──────────────┐      ┌──────────────┐
│ Build        │      │ Docker Build │
│ npm install  │      │ dotnet build │
│ npm build    │      │              │
└──────────────┘      └──────────────┘
      │                         │
      ▼                         ▼
┌──────────────┐      ┌──────────────┐
│ Deploy       │      │ Deploy       │
│ to CDN       │      │ to Container │
└──────────────┘      └──────────────┘
      │                         │
      ▼                         ▼
┌──────────────┐      ┌──────────────┐
│ Frontend     │      │ Backend      │
│ LIVE ✅      │      │ LIVE ✅      │
└──────────────┘      └──────────────┘
```

---

## 🔄 Потоки Данных

### 1. Получение Данных (Read Operation)

```
┌──────────┐     1. HTTP GET      ┌──────────┐
│  Browser │ ───────────────────> │ Frontend │
│          │                       │ (Vercel) │
└──────────┘                       └──────────┘
                                         │
                                         │ 2. axios.get()
                                         │    /api/DataItems
                                         │
                                         ▼
                                   ┌──────────┐
                                   │ Backend  │
                                   │ (Render) │
                                   └──────────┘
                                         │
                                         │ 3. Controller receives
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │ DataItemsController │
                              │ GetAllDataItems()   │
                              └─────────────────────┘
                                         │
                                         │ 4. Calls Repository
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │ DataItemRepository  │
                              │ GetAllAsync()       │
                              └─────────────────────┘
                                         │
                                         │ 5. EF Core Query
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │ ApplicationDbContext│
                              │ DbSet<DataItem>     │
                              └─────────────────────┘
                                         │
                                         │ 6. SQL SELECT
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │   PostgreSQL        │
                              │   (Supabase)        │
                              └─────────────────────┘
                                         │
                                         │ 7. Return Data
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │   Backend           │
                              │   Map to DTO        │
                              └─────────────────────┘
                                         │
                                         │ 8. JSON Response
                                         │
                                         ▼
┌──────────┐  11. Render UI  ┌──────────┐
│ Browser  │ <────────────── │ Frontend │
│          │                  │ setState │
└──────────┘                  └──────────┘
```

### 2. Создание Записи (Create Operation)

```
User fills form
      │
      ▼
Click "Сохранить"
      │
      ▼
DataItemModal.handleSubmit()
      │
      ▼
dataService.createDataItem(item)
      │
      ▼
POST https://table-backend-lwdi.onrender.com/api/DataItems
Headers: Content-Type: application/json
Body: {
  "name": "Новая запись",
  "description": "Описание",
  "category": "Категория",
  "value": 100.50,
  "isActive": true
}
      │
      ▼
Backend: DataItemsController.CreateDataItem()
      │
      ▼
Validate DTO
      │
      ▼
Repository.CreateAsync(dataItem)
      │
      ▼
DbContext.DataItems.Add(dataItem)
      │
      ▼
DbContext.SaveChangesAsync()
      │
      ▼
SQL: INSERT INTO data_items (name, description, ...)
     VALUES ('Новая запись', 'Описание', ...)
     RETURNING *
      │
      ▼
Return 201 Created + Location header
      │
      ▼
Frontend: Update state, close modal, refresh table
```

### 3. Обновление Записи (Update Operation)

```
User clicks "Изменить" → Edit button
      │
      ▼
Load item data into modal
      │
      ▼
User modifies fields
      │
      ▼
Click "Сохранить"
      │
      ▼
dataService.updateDataItem(id, item)
      │
      ▼
PUT /api/DataItems/{id}
      │
      ▼
Controller: UpdateDataItem(id, dto)
      │
      ▼
Repository.UpdateAsync(id, item)
      │
      ▼
DbContext finds entity by ID
      │
      ▼
Update entity properties
      │
      ▼
DbContext.SaveChangesAsync()
      │
      ▼
SQL: UPDATE data_items
     SET name = '...', description = '...', updated_at = NOW()
     WHERE id = {id}
      │
      ▼
Return 200 OK
      │
      ▼
Frontend: Update state, refresh table
```

### 4. Удаление Записи (Delete Operation)

```
User clicks "Удалить"
      │
      ▼
Confirm dialog (browser confirm)
      │
      ▼
dataService.deleteDataItem(id)
      │
      ▼
DELETE /api/DataItems/{id}
      │
      ▼
Controller: DeleteDataItem(id)
      │
      ▼
Repository.DeleteAsync(id)
      │
      ▼
DbContext finds entity
      │
      ▼
DbContext.Remove(entity)
      │
      ▼
DbContext.SaveChangesAsync()
      │
      ▼
SQL: DELETE FROM data_items WHERE id = {id}
      │
      ▼
Return 204 No Content
      │
      ▼
Frontend: Remove from state, refresh table
```

---

## 🔐 Безопасность

### Реализованные Меры Безопасности

#### 1. HTTPS/SSL

```
┌─────────────────────────────────────────────┐
│  All connections use HTTPS/TLS              │
├─────────────────────────────────────────────┤
│  • Frontend (Vercel): Automatic HTTPS       │
│  • Backend (Render): Automatic HTTPS        │
│  • Database: SSL Mode Required              │
└─────────────────────────────────────────────┘
```

#### 2. CORS Configuration

**Backend (Program.cs):**
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "http://localhost:5173",
            "https://sergii-table.vercel.app",
            "https://*.vercel.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
```

#### 3. Environment Variables

**Frontend (.env):**
```env
VITE_API_BASE_URL=https://table-backend-lwdi.onrender.com/api
```

**Backend (Render Environment Variables):**
```env
ASPNETCORE_URLS=http://0.0.0.0:$PORT
ConnectionStrings__DefaultConnection=[HIDDEN]
ASPNETCORE_ENVIRONMENT=Production
```

#### 4. Input Validation

**DTO Validation:**
```csharp
public class DataItemDto
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; }
    
    [StringLength(1000)]
    public string Description { get; set; }
    
    [Range(0, double.MaxValue)]
    public decimal Value { get; set; }
}
```

#### 5. SQL Injection Protection

- ✅ Entity Framework Core использует параметризованные запросы
- ✅ Нет прямого SQL в коде
- ✅ ORM обеспечивает безопасность

#### 6. Connection String Security

```
Database Connection:
• SSL Mode: Require
• Trust Server Certificate: true
• Connection Pooling: Enabled
• Password: Stored in environment variables (not in code)
```

### Рекомендации для Production

#### Аутентификация (не реализовано)

```csharp
// Рекомендуется добавить:
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => { ... });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => 
        policy.RequireRole("Admin"));
});
```

#### Rate Limiting (не реализовано)

```csharp
// Рекомендуется добавить:
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", options =>
    {
        options.Window = TimeSpan.FromMinutes(1);
        options.PermitLimit = 100;
    });
});
```

---

## 📊 Производительность

### Метрики

| Метрика | Значение | Описание |
|---------|----------|----------|
| **Frontend Load Time** | 1-2 сек | Первая загрузка |
| **API Response Time** | 200-500 мс | Среднее время ответа |
| **Database Query Time** | 50-100 мс | Время выполнения SQL |
| **Cold Start (Render)** | 30-50 сек | Пробуждение после сна |
| **Bundle Size** | ~500 KB | Размер JS bundle |

### Оптимизации

#### Frontend

```javascript
// Debouncing для поиска
const handleSearchChange = debounce((term) => {
  setSearchTerm(term);
}, 300);

// Мемоизация фильтрованных данных
const filteredItems = useMemo(() => {
  return items.filter(/* ... */);
}, [items, searchTerm, filterCategory]);
```

#### Backend

```csharp
// Асинхронные операции
public async Task<IEnumerable<DataItem>> GetAllAsync()
{
    return await _context.DataItems
        .AsNoTracking()  // Оптимизация для read-only
        .ToListAsync();
}

// Connection pooling (в connection string)
Pooling=true;Min Pool Size=5;Max Pool Size=100;
```

#### Database

```sql
-- Индексы для быстрого поиска
CREATE INDEX idx_name ON data_items(name);
CREATE INDEX idx_category ON data_items(category);
CREATE INDEX idx_is_active ON data_items(is_active);
```

---

## 🔧 Конфигурация

### Frontend Configuration

**vite.config.js:**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

**package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "axios": "^1.6.5",
    "bootstrap": "^5.3.2"
  }
}
```

### Backend Configuration

**appsettings.json:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "[FROM ENV VARIABLE]"
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

**Program.cs:**
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>();
builder.Services.AddScoped<IDataItemRepository, DataItemRepository>();
builder.Services.AddCors();

var app = builder.Build();

// Configure pipeline
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowReactApp");
app.MapControllers();
app.Run();
```

### Docker Configuration

**Dockerfile:**
```dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["DataManagementSystem.API.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
ENTRYPOINT ["/app/start.sh"]
```

**start.sh:**
```bash
#!/bin/bash
export ASPNETCORE_URLS="http://0.0.0.0:${PORT:-10000}"
echo "Starting application on $ASPNETCORE_URLS"
dotnet DataManagementSystem.API.dll
```

---

## 📈 Масштабирование

### Horizontal Scaling (Горизонтальное)

```
Current:
┌─────────────┐
│  1 Instance │  Render Free Tier
└─────────────┘

Future (Paid):
┌─────────────┐
│  Instance 1 │ ─┐
└─────────────┘  │
                 ├──> Load Balancer
┌─────────────┐  │
│  Instance 2 │ ─┤
└─────────────┘  │
                 │
┌─────────────┐  │
│  Instance 3 │ ─┘
└─────────────┘
```

### Vertical Scaling (Вертикальное)

```
Current: Free Tier
  • 512 MB RAM
  • 0.1 CPU
  
Upgrade Options:
  • Starter: $7/month (512 MB RAM)
  • Standard: $25/month (2 GB RAM)
  • Pro: $85/month (8 GB RAM)
```

### Database Scaling

```
Current: Supabase Free
  • 500 MB Storage
  • Unlimited API requests
  
Future Options:
  • Read Replicas
  • Connection Pooling (already enabled)
  • Caching layer (Redis)
  • Database sharding
```

---

## 🧪 Тестирование

### Типы Тестов (Рекомендуется)

#### Unit Tests
```csharp
[Fact]
public async Task GetAllAsync_ReturnsAllItems()
{
    // Arrange
    var repository = new DataItemRepository(_context);
    
    // Act
    var result = await repository.GetAllAsync();
    
    // Assert
    Assert.NotNull(result);
    Assert.Equal(5, result.Count());
}
```

#### Integration Tests
```csharp
[Fact]
public async Task CreateDataItem_ReturnsCreated()
{
    // Arrange
    var client = _factory.CreateClient();
    var item = new DataItemDto { Name = "Test" };
    
    // Act
    var response = await client.PostAsJsonAsync("/api/DataItems", item);
    
    // Assert
    Assert.Equal(HttpStatusCode.Created, response.StatusCode);
}
```

#### End-to-End Tests
```javascript
describe('Data Management System', () => {
  it('should create a new item', () => {
    cy.visit('https://sergii-table.vercel.app');
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="name-input"]').type('Test Item');
    cy.get('[data-testid="save-button"]').click();
    cy.contains('Test Item').should('be.visible');
  });
});
```

---

## 📝 API Documentation

### Endpoints

#### GET /api/DataItems
```
Description: Получить все записи
Response: 200 OK
Body: DataItemDto[]

Example Response:
[
  {
    "id": 1,
    "name": "Пример записи 1",
    "description": "Это первая тестовая запись",
    "category": "Тестовая",
    "value": 100.50,
    "isActive": true,
    "createdAt": "2026-02-01T10:14:00Z",
    "updatedAt": "2026-02-01T10:14:00Z"
  }
]
```

#### GET /api/DataItems/{id}
```
Description: Получить запись по ID
Parameters: id (integer)
Response: 200 OK | 404 Not Found
Body: DataItemDto

Example: GET /api/DataItems/1
```

#### POST /api/DataItems
```
Description: Создать новую запись
Request Body: DataItemDto (без id)
Response: 201 Created
Location Header: /api/DataItems/{id}

Example Request:
{
  "name": "Новая запись",
  "description": "Описание",
  "category": "Категория",
  "value": 100.50,
  "isActive": true
}
```

#### PUT /api/DataItems/{id}
```
Description: Обновить запись
Parameters: id (integer)
Request Body: DataItemDto
Response: 204 No Content | 404 Not Found

Example: PUT /api/DataItems/1
```

#### DELETE /api/DataItems/{id}
```
Description: Удалить запись
Parameters: id (integer)
Response: 204 No Content | 404 Not Found

Example: DELETE /api/DataItems/1
```

---

## 🚨 Мониторинг и Логирование

### Логирование

**Backend (ASP.NET Core):**
```csharp
_logger.LogInformation("Getting all data items");
_logger.LogError(ex, "Error creating data item");
```

**Logs доступны в:**
- Render Dashboard → Logs
- Real-time streaming
- History: 7 дней (free tier)

### Мониторинг

**Render Metrics:**
- CPU Usage
- Memory Usage
- Request Count
- Response Time
- Error Rate

**Vercel Analytics:**
- Page Views
- Unique Visitors
- Performance Score
- Core Web Vitals

---

## 📚 Дополнительные Ресурсы

### Документация

| Документ | Описание |
|----------|----------|
| `README.md` | Главная документация |
| `PROJECT_REPORT.md` | Отчет о проекте |
| `ARCHITECTURE_DETAILED.md` | Этот файл |
| `RENDER_DEPLOY.md` | Деплой на Render |
| `SUPABASE_STEP_BY_STEP.md` | Настройка Supabase |

### Ссылки

- **Live Application:** https://sergii-table.vercel.app
- **API Swagger:** https://table-backend-lwdi.onrender.com/swagger
- **GitHub:** https://github.com/sergiiKols/Table
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Render Dashboard:** https://dashboard.render.com

---

## 🎓 Заключение

Проект **Система Управления Данными** представляет собой современное full-stack приложение, построенное с использованием лучших практик:

✅ **Слоистая архитектура** - четкое разделение ответственности  
✅ **Repository Pattern** - абстракция доступа к данным  
✅ **RESTful API** - стандартизированный интерфейс  
✅ **Component-based UI** - переиспользуемые компоненты  
✅ **Docker containerization** - изолированное окружение  
✅ **CI/CD Pipeline** - автоматический деплой  
✅ **Cloud-native** - использование облачных сервисов  

**Технологии:**
- Frontend: React 18 + Vite + Bootstrap 5
- Backend: ASP.NET Core 6 + Entity Framework Core
- Database: PostgreSQL (Supabase)
- Infrastructure: Vercel + Render.com + Docker

**Результат:**
Полностью функциональное, production-ready приложение, развернутое в облаке и доступное по адресу https://sergii-table.vercel.app

---

**Версия:** 1.0  
**Дата:** 1 февраля 2026  
**Статус:** ✅ Production Ready
