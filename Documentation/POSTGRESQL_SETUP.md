# 🐘 Настройка PostgreSQL (Supabase/Neon)

Полное руководство по переходу с MS SQL Server на PostgreSQL и настройке Supabase или Neon.

---

## 📋 Содержание

- [Выбор платформы](#выбор-платформы)
- [Настройка Supabase](#настройка-supabase)
- [Настройка Neon](#настройка-neon)
- [Изменение Backend для PostgreSQL](#изменение-backend-для-postgresql)
- [Создание таблиц](#создание-таблиц)
- [Миграция данных](#миграция-данных)
- [Connection String](#connection-string)

---

## 🎯 Выбор платформы

### Supabase (Рекомендуется)

**Преимущества:**
- ✅ Бесплатный tier: 500 MB database, 50,000 monthly active users
- ✅ Встроенный API (REST + GraphQL)
- ✅ Real-time subscriptions
- ✅ Authentication из коробки
- ✅ Storage для файлов
- ✅ Веб-интерфейс для управления БД

**Недостатки:**
- ⚠️ База засыпает после неактивности (на бесплатном плане)

### Neon

**Преимущества:**
- ✅ Бесплатный tier: 3 GB storage, безлимит compute hours
- ✅ Serverless архитектура
- ✅ Branching баз данных (для dev/staging)
- ✅ Автоматическое масштабирование
- ✅ База не засыпает

**Недостатки:**
- ⚠️ Только база данных (без дополнительных сервисов)

---

## 🚀 Настройка Supabase

### Шаг 1: Создание проекта

1. **Перейдите на:** https://supabase.com
2. **Sign up** через GitHub
3. **New Project:**
   - Name: `data-management-db`
   - Database Password: `ваш_безопасный_пароль_123!`
   - Region: `Europe (Central)` или ближайший
   - Pricing Plan: `Free`
4. **Create new project** (займет 2-3 минуты)

### Шаг 2: Получение Connection String

1. **Project Settings** (⚙️ внизу слева)
2. **Database** → **Connection string**
3. **Connection pooling** (рекомендуется):

```
postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

**Замените:**
- `[YOUR-PASSWORD]` → ваш пароль из Шага 1

### Шаг 3: Настройка Security

1. **Authentication** → **Policies**
2. Пока отключите RLS (Row Level Security) для упрощения:
   - Table Editor → DataItems → RLS Disabled

---

## 🔵 Настройка Neon

### Шаг 1: Создание проекта

1. **Перейдите на:** https://neon.tech
2. **Sign up** через GitHub
3. **Create a project:**
   - Project name: `data-management-db`
   - Region: `Europe (Frankfurt)` или ближайший
   - PostgreSQL version: `16` (latest)
4. **Create project**

### Шаг 2: Получение Connection String

После создания проекта вы увидите:

```
postgresql://username:password@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

**Сохраните эту строку!**

### Шаг 3: Создание базы данных

В Neon Console:

```sql
CREATE DATABASE datamanagement;
```

Или используйте дефолтную базу `neondb`.

---

## 🔧 Изменение Backend для PostgreSQL

### Шаг 1: Обновите .csproj

Откройте `Backend/DataManagementSystem.API/DataManagementSystem.API.csproj`:

**Удалите:**
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="6.0.25" />
```

**Добавьте:**
```xml
<PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="6.0.22" />
```

**Итоговый файл:**
```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="6.0.25" />
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="6.0.22" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="6.0.25">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="6.0.25">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>

</Project>
```

### Шаг 2: Обновите Program.cs

Откройте `Backend/DataManagementSystem.API/Program.cs`:

**Замените:**
```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

**На:**
```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

**Итоговый Program.cs:**
```csharp
using DataManagementSystem.API.Data;
using DataManagementSystem.API.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext with PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Repository
builder.Services.AddScoped<IDataItemRepository, DataItemRepository>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
```

### Шаг 3: Обновите appsettings.json

Откройте `Backend/DataManagementSystem.API/appsettings.json`:

**Замените Connection String:**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=your-host.supabase.com;Port=6543;Database=postgres;Username=postgres.xxxx;Password=your_password;SSL Mode=Require;Trust Server Certificate=true"
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

**Или используйте полную строку из Supabase/Neon:**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "postgresql://postgres.xxxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
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

### Шаг 4: Обновите ApplicationDbContext.cs

Откройте `Backend/DataManagementSystem.API/Data/ApplicationDbContext.cs`:

**Замените:**
```csharp
entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
```

**На:**
```csharp
entity.Property(e => e.CreatedAt).HasDefaultValueSql("NOW()");
```

**Итоговый OnModelCreating метод:**
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    // Конфигурация таблицы DataItems
    modelBuilder.Entity<DataItem>(entity =>
    {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
        entity.Property(e => e.Description).HasMaxLength(1000);
        entity.Property(e => e.Category).IsRequired().HasMaxLength(100);
        entity.Property(e => e.Value).HasColumnType("decimal(18,2)");
        entity.Property(e => e.CreatedAt).HasDefaultValueSql("NOW()"); // PostgreSQL функция

        // Создание индексов для оптимизации поиска
        entity.HasIndex(e => e.Category);
        entity.HasIndex(e => e.IsActive);
        entity.HasIndex(e => e.CreatedAt);
    });

    // Seed данные для тестирования
    modelBuilder.Entity<DataItem>().HasData(
        new DataItem
        {
            Id = 1,
            Name = "Пример записи 1",
            Description = "Это первая тестовая запись в системе",
            Category = "Тестовая",
            Value = 100.50m,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        },
        new DataItem
        {
            Id = 2,
            Name = "Пример записи 2",
            Description = "Вторая тестовая запись для демонстрации",
            Category = "Демо",
            Value = 250.75m,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        },
        new DataItem
        {
            Id = 3,
            Name = "Пример записи 3",
            Description = "Третья запись с другой категорией",
            Category = "Тестовая",
            Value = 50.00m,
            IsActive = false,
            CreatedAt = DateTime.UtcNow
        }
    );
}
```

### Шаг 5: Восстановите пакеты

```bash
cd Backend/DataManagementSystem.API
dotnet restore
```

---

## 📊 Создание таблиц

### Способ 1: Entity Framework Migrations (Рекомендуется)

```bash
cd Backend/DataManagementSystem.API

# Удалите старые миграции (если есть)
Remove-Item -Recurse -Force Migrations

# Создайте новую миграцию для PostgreSQL
dotnet ef migrations add InitialCreate_PostgreSQL

# Примените миграцию к базе данных
dotnet ef database update
```

**Проверка:**
```bash
# Проверьте что миграция применилась
dotnet ef migrations list
```

### Способ 2: Ручное создание через SQL (Supabase)

1. **Откройте Supabase Dashboard**
2. **SQL Editor** (слева в меню)
3. **New Query**
4. **Вставьте SQL:**

```sql
-- Создание таблицы DataItems
CREATE TABLE IF NOT EXISTS "DataItems" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(200) NOT NULL,
    "Description" VARCHAR(1000),
    "Category" VARCHAR(100) NOT NULL,
    "Value" DECIMAL(18,2) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP
);

-- Создание индексов
CREATE INDEX "IX_DataItems_Category" ON "DataItems" ("Category");
CREATE INDEX "IX_DataItems_IsActive" ON "DataItems" ("IsActive");
CREATE INDEX "IX_DataItems_CreatedAt" ON "DataItems" ("CreatedAt");

-- Вставка тестовых данных
INSERT INTO "DataItems" ("Name", "Description", "Category", "Value", "IsActive", "CreatedAt") VALUES
('Пример записи 1', 'Это первая тестовая запись в системе', 'Тестовая', 100.50, true, NOW()),
('Пример записи 2', 'Вторая тестовая запись для демонстрации', 'Демо', 250.75, true, NOW()),
('Пример записи 3', 'Третья запись с другой категорией', 'Тестовая', 50.00, false, NOW());

-- Проверка
SELECT * FROM "DataItems";
```

5. **Run** (Ctrl + Enter)

### Способ 3: Ручное создание через SQL (Neon)

1. **Откройте Neon Console**
2. **SQL Editor**
3. **Вставьте тот же SQL** (как для Supabase выше)
4. **Run**

---

## 🔍 Проверка таблиц

### Через Supabase Dashboard

1. **Table Editor** (слева в меню)
2. Вы должны увидеть таблицу **DataItems**
3. Кликните на нее → должны быть 3 записи

### Через SQL

```sql
-- Проверка структуры таблицы
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'DataItems';

-- Проверка данных
SELECT * FROM "DataItems";

-- Проверка индексов
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'DataItems';
```

### Через Backend

```bash
cd Backend/DataManagementSystem.API
dotnet run
```

Откройте: http://localhost:5000/swagger

Попробуйте endpoint: **GET /api/dataitems**

---

## 🔄 Миграция данных (если были данные в SQL Server)

### Экспорт из SQL Server

```sql
-- В SQL Server Management Studio
SELECT * FROM DataItems
FOR JSON PATH
```

Сохраните результат в файл `data.json`

### Импорт в PostgreSQL

Создайте скрипт `import-data.sql`:

```sql
INSERT INTO "DataItems" ("Name", "Description", "Category", "Value", "IsActive", "CreatedAt")
VALUES 
    ('Запись 1', 'Описание 1', 'Категория 1', 100.00, true, NOW()),
    ('Запись 2', 'Описание 2', 'Категория 2', 200.00, true, NOW());
    -- добавьте остальные записи
```

Выполните в Supabase SQL Editor или через psql.

---

## 🔗 Connection String форматы

### Supabase (Connection Pooling)

```
postgresql://postgres.xxxxxxxxxxxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

### Supabase (Direct Connection)

```
postgresql://postgres.xxxxxxxxxxxx:password@db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

### Neon

```
postgresql://username:password@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### Формат для appsettings.json

**Вариант 1 (полная строка):**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "postgresql://postgres.xxxx:pass@host:6543/postgres"
  }
}
```

**Вариант 2 (компоненты):**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=host.supabase.com;Port=6543;Database=postgres;Username=postgres.xxxx;Password=pass;SSL Mode=Require"
  }
}
```

---

## 🐛 Troubleshooting

### Ошибка: "password authentication failed"

**Решение:** Проверьте пароль в connection string

### Ошибка: "SSL connection is required"

**Решение:** Добавьте в connection string:
```
;SSL Mode=Require;Trust Server Certificate=true
```

### Ошибка: "could not connect to server"

**Решение:** 
- Проверьте что IP разрешен в Supabase (по умолчанию разрешены все)
- Проверьте firewall

### Ошибка: "relation DataItems does not exist"

**Решение:** 
- Таблица не создана. Выполните миграции или SQL скрипт
- Проверьте регистр: PostgreSQL чувствителен к регистру в кавычках

### Таблицы создаются в lowercase

**Решение:** В ApplicationDbContext используйте:
```csharp
modelBuilder.Entity<DataItem>().ToTable("DataItems");
```

---

## 📋 Чеклист PostgreSQL Setup

- [ ] Supabase или Neon проект создан
- [ ] Connection string получен
- [ ] Backend .csproj обновлен (Npgsql пакет)
- [ ] Program.cs обновлен (UseNpgsql)
- [ ] ApplicationDbContext обновлен (NOW() вместо GETUTCDATE())
- [ ] appsettings.json обновлен (новый connection string)
- [ ] `dotnet restore` выполнен
- [ ] Миграции созданы и применены
- [ ] Таблицы созданы в БД
- [ ] Тестовые данные вставлены
- [ ] Backend запускается без ошибок
- [ ] Swagger показывает данные из PostgreSQL
- [ ] Frontend подключается к Backend

---

## 🎉 Готово!

Ваш Backend теперь работает с PostgreSQL на Supabase/Neon!

**Следующие шаги:**
- Задеплойте Backend на Railway/Render
- Обновите `VITE_API_BASE_URL` в Vercel
- Протестируйте все CRUD операции

---

**Версия:** 1.0.0  
**Последнее обновление:** 01.02.2026
