# 🚀 Руководство по развертыванию

Подробная инструкция по развертыванию проекта в продакшен.

---

## 📋 Содержание

- [Frontend на Vercel](#frontend-на-vercel)
- [Backend варианты](#backend-варианты)
- [База данных](#база-данных)
- [Переменные окружения](#переменные-окружения)
- [CI/CD Pipeline](#cicd-pipeline)

---

## 🎨 Frontend на Vercel

### Шаг 1: Подготовка репозитория

1. **Запушьте код на GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/sergiiKols/Table.git
git push -u origin main
```

### Шаг 2: Деплой на Vercel

1. **Перейдите на [vercel.com](https://vercel.com)**
2. **Войдите через GitHub**
3. **Нажмите "New Project"**
4. **Импортируйте репозиторий:** `sergiiKols/Table`

### Шаг 3: Настройка проекта в Vercel

**Build Settings:**

| Параметр | Значение |
|----------|----------|
| Framework Preset | Vite |
| Build Command | `cd Frontend && npm install && npm run build` |
| Output Directory | `Frontend/dist` |
| Install Command | `cd Frontend && npm install` |

**Root Directory:**
- Оставьте пустым или укажите `./`

### Шаг 4: Environment Variables

Добавьте переменные окружения в Vercel Dashboard:

**Settings → Environment Variables:**

```
VITE_API_BASE_URL = https://your-backend-url.com/api
```

⚠️ **Важно:** Замените `your-backend-url.com` на реальный URL вашего Backend после его деплоя.

### Шаг 5: Deploy

1. Нажмите **"Deploy"**
2. Дождитесь завершения сборки (2-3 минуты)
3. Получите URL: `https://your-project.vercel.app`

### ✅ Frontend готов!

Ваш Frontend теперь доступен по адресу Vercel.

---

## 💻 Backend варианты

### Вариант 1: Azure App Service (Рекомендуется)

**Преимущества:**
- ✅ Лучшая интеграция с ASP.NET Core
- ✅ Azure SQL Database
- ✅ Автоматическое масштабирование
- ✅ Бесплатный tier для начала

**Инструкция:**

1. **Создайте Azure App Service:**
   ```bash
   az webapp create --name your-app-name --resource-group your-rg --plan your-plan --runtime "DOTNET|6.0"
   ```

2. **Настройте GitHub Actions** (см. раздел CI/CD)

3. **Настройте строку подключения к БД** в Azure Portal

4. **Деплой:**
   ```bash
   cd Backend/DataManagementSystem.API
   dotnet publish -c Release -o ./publish
   az webapp deploy --resource-group your-rg --name your-app-name --src-path ./publish
   ```

**Connection String в Azure:**
```
Settings → Configuration → Connection strings:
Name: DefaultConnection
Value: Server=tcp:your-server.database.windows.net,1433;Database=DataManagementDB;User ID=username;Password=password;
Type: SQLServer
```

### Вариант 2: Railway.app (Бесплатный)

**Преимущества:**
- ✅ Бесплатный tier
- ✅ Поддержка .NET
- ✅ Встроенная PostgreSQL
- ✅ Простой деплой

**Инструкция:**

1. Перейдите на [railway.app](https://railway.app)
2. Войдите через GitHub
3. Нажмите "New Project" → "Deploy from GitHub repo"
4. Выберите репозиторий `sergiiKols/Table`
5. Выберите `Backend/DataManagementSystem.API` как root
6. Railway автоматически определит .NET проект

**Переменные окружения:**
```
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=your-postgres-connection-string
```

### Вариант 3: Render.com (Бесплатный)

**Преимущества:**
- ✅ Бесплатный tier
- ✅ PostgreSQL включена
- ✅ Auto-deploy из GitHub

**Инструкция:**

1. Перейдите на [render.com](https://render.com)
2. Создайте новый **Web Service**
3. Подключите GitHub репозиторий
4. Настройки:
   - **Build Command:** `cd Backend/DataManagementSystem.API && dotnet publish -c Release -o out`
   - **Start Command:** `cd Backend/DataManagementSystem.API/out && dotnet DataManagementSystem.API.dll`

### Вариант 4: Локальный сервер (Разработка)

Для разработки можно оставить Backend локально:

1. Запустите Backend локально: `start-backend.bat`
2. Frontend на Vercel настроен на `VITE_API_BASE_URL`
3. Используйте ngrok для публичного доступа:
   ```bash
   ngrok http 5000
   ```

⚠️ **Внимание:** Это только для разработки!

---

## 💾 База данных

### Вариант 1: Azure SQL Database

**Создание:**
```bash
az sql server create --name your-sql-server --resource-group your-rg --location eastus --admin-user adminuser --admin-password YourPassword123!

az sql db create --resource-group your-rg --server your-sql-server --name DataManagementDB --service-objective Basic
```

**Connection String:**
```
Server=tcp:your-sql-server.database.windows.net,1433;Database=DataManagementDB;User ID=adminuser;Password=YourPassword123!;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

**Миграции:**
```bash
dotnet ef database update --connection "your-connection-string"
```

### Вариант 2: Supabase (PostgreSQL - Бесплатно)

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Получите Connection String
4. Измените Backend на PostgreSQL:

```bash
# Замените в .csproj:
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="6.0.25" />
# На:
<PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="6.0.25" />
```

```csharp
// В Program.cs замените:
options.UseSqlServer(...)
// На:
options.UseNpgsql(...)
```

### Вариант 3: Neon.tech (PostgreSQL - Бесплатно)

1. Перейдите на [neon.tech](https://neon.tech)
2. Создайте проект
3. Скопируйте Connection String
4. Аналогично Supabase, переключитесь на PostgreSQL

### Вариант 4: Railway PostgreSQL (Бесплатно)

При деплое на Railway автоматически создается PostgreSQL база:
1. Railway создаст БД автоматически
2. Connection String будет в переменной `DATABASE_URL`
3. Используйте её в `appsettings.json`

---

## 🔐 Переменные окружения

### Frontend (Vercel)

В Vercel Dashboard → Settings → Environment Variables:

```env
# Production
VITE_API_BASE_URL=https://your-backend.azurewebsites.net/api

# Preview/Development (опционально)
VITE_API_BASE_URL=https://your-backend-staging.azurewebsites.net/api
```

### Backend (Azure/Railway/Render)

```env
# ASP.NET Core
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:80

# Database (SQL Server)
ConnectionStrings__DefaultConnection=Server=tcp:...

# или (PostgreSQL)
ConnectionStrings__DefaultConnection=Host=...;Database=...;Username=...;Password=...

# CORS Origins
AllowedOrigins__0=https://your-project.vercel.app
AllowedOrigins__1=https://your-project-staging.vercel.app
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions для Backend (Azure)

Создайте `.github/workflows/backend-deploy.yml`:

```yaml
name: Deploy Backend to Azure

on:
  push:
    branches: [ main ]
    paths:
      - 'Backend/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '6.0.x'
    
    - name: Build
      run: |
        cd Backend/DataManagementSystem.API
        dotnet restore
        dotnet build --configuration Release
        dotnet publish -c Release -o ./publish
    
    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: your-app-name
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: Backend/DataManagementSystem.API/publish
```

### Vercel (Frontend) - Автоматический деплой

Vercel автоматически деплоит при push в `main`:
- ✅ Push в `main` → Production deploy
- ✅ Pull Request → Preview deploy
- ✅ Автоматические откаты при ошибках

---

## 📋 Чеклист деплоя

### Перед деплоем:

- [ ] Код запушен на GitHub
- [ ] `.env` файлы добавлены в `.gitignore`
- [ ] Connection strings обновлены для продакшена
- [ ] CORS настроен для Vercel URL

### Frontend (Vercel):

- [ ] Проект создан на Vercel
- [ ] Build settings настроены
- [ ] Environment variables добавлены
- [ ] Deploy завершен успешно
- [ ] Сайт открывается

### Backend:

- [ ] Сервис создан (Azure/Railway/Render)
- [ ] Connection string настроена
- [ ] Миграции применены к БД
- [ ] API доступен по HTTPS
- [ ] CORS разрешает запросы с Vercel

### База данных:

- [ ] База данных создана
- [ ] Миграции применены
- [ ] Seed данные загружены (опционально)
- [ ] Backup настроен (для продакшена)

### Финальная проверка:

- [ ] Frontend загружается
- [ ] API запросы работают
- [ ] CRUD операции работают
- [ ] Фильтрация работает
- [ ] Ошибки обрабатываются корректно

---

## 🐛 Troubleshooting

### Frontend не подключается к Backend

**Проблема:** CORS ошибки

**Решение:** Добавьте Vercel URL в CORS Backend:

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVercel",
        policy => policy.WithOrigins(
            "https://your-project.vercel.app",
            "https://*.vercel.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod());
});
```

### Backend не запускается

**Проблема:** Connection string неверная

**Решение:** Проверьте переменные окружения в панели хостинга

### Миграции не применяются

**Проблема:** База данных недоступна

**Решение:** 
```bash
# Вручную примените миграции
dotnet ef database update --connection "your-connection-string"
```

---

## 📚 Дополнительные ресурсы

- [Vercel Documentation](https://vercel.com/docs)
- [Azure App Service](https://docs.microsoft.com/azure/app-service/)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

## 🎉 Готово!

После выполнения всех шагов ваше приложение будет полностью развернуто в продакшене!

**Ваши URL:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.platform.com`

---

**Обновлено:** 01.02.2026  
**Версия:** 1.0.0
