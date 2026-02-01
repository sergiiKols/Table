# 🗄️ Система Управления Данными

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sergiiKols/Table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![.NET](https://img.shields.io/badge/.NET-6.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)](https://getbootstrap.com/)

> **Full-stack веб-приложение** для управления данными с трехслойной архитектурой. Построено на современных технологиях: React 18, ASP.NET Core 6.0, Entity Framework Core.

[🌐 Live Demo](#) | [📖 Документация](README.md) | [🚀 Быстрый деплой](VERCEL_DEPLOY.md)

---

## ✨ Возможности

- ✅ **CRUD операции** - Создание, чтение, обновление, удаление записей
- ✅ **Фильтрация и поиск** - Мощная система фильтрации данных
- ✅ **Валидация данных** - На фронтенде и бэкенде
- ✅ **Адаптивный дизайн** - Работает на всех устройствах
- ✅ **Modern UI** - Красивый интерфейс на Bootstrap 5
- ✅ **RESTful API** - Полноценный REST API с Swagger документацией
- ✅ **Repository Pattern** - Чистая архитектура с разделением слоев

---

## 🖼️ Скриншоты

<div align="center">

### Главная страница с данными
![Main View](https://via.placeholder.com/800x450/667eea/ffffff?text=Main+View)

### Добавление новой записи
![Add Modal](https://via.placeholder.com/800x450/764ba2/ffffff?text=Add+Modal)

### Фильтрация данных
![Filter](https://via.placeholder.com/800x450/f093fb/ffffff?text=Filter+View)

</div>

> 💡 **Совет:** Добавьте реальные скриншоты вашего приложения, заменив placeholder URLs

---

## 🚀 Быстрый старт

### Вариант 1: Деплой на Vercel (1 клик)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sergiiKols/Table)

1. Нажмите кнопку выше
2. Авторизуйтесь на Vercel через GitHub
3. Дождитесь завершения деплоя
4. Ваш сайт готов! 🎉

📖 **Подробная инструкция:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

### Вариант 2: Локальная разработка

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/sergiiKols/Table.git
cd Table

# 2. Запустите Backend
cd Backend/DataManagementSystem.API
dotnet restore
dotnet ef database update
dotnet run

# 3. Запустите Frontend (в новом терминале)
cd Frontend
npm install
npm run dev

# 4. Откройте http://localhost:3000
```

📖 **Подробная инструкция:** [QUICKSTART.md](QUICKSTART.md)

---

## 💻 Технологический стек

### Frontend
- **React 18** - UI библиотека
- **Vite** - Быстрый сборщик
- **React Bootstrap** - UI компоненты
- **Axios** - HTTP клиент

### Backend
- **ASP.NET Core 6.0** - Web API
- **Entity Framework Core** - ORM
- **MS SQL Server** - База данных
- **Swagger** - API документация

### DevOps
- **Vercel** - Frontend хостинг
- **GitHub Actions** - CI/CD
- **Azure/Railway** - Backend хостинг (опционально)

---

## 📁 Структура проекта

```
Table/
├── 📂 Backend/                    # ASP.NET Core API
│   └── DataManagementSystem.API/
│       ├── Controllers/           # REST API endpoints
│       ├── Models/                # Data models
│       ├── DTOs/                  # Data Transfer Objects
│       ├── Data/                  # DbContext
│       └── Repositories/          # Repository pattern
│
├── 📂 Frontend/                   # React Application
│   └── src/
│       ├── components/            # React components
│       │   ├── DataTable.jsx
│       │   ├── DataItemModal.jsx
│       │   └── FilterBar.jsx
│       ├── services/              # API client
│       └── App.jsx                # Main component
│
├── 📄 vercel.json                 # Vercel configuration
├── 📄 VERCEL_DEPLOY.md           # Vercel deployment guide
├── 📄 DEPLOYMENT.md              # Full deployment guide
└── 📄 README.md                  # This file
```

---

## 🏗️ Архитектура

```
┌─────────────────────────────────┐
│   Frontend (React + Vite)       │
│   - UI Components               │
│   - State Management            │
└─────────────┬───────────────────┘
              │ HTTP/REST API
┌─────────────▼───────────────────┐
│   Backend (ASP.NET Core)        │
│   - API Controllers             │
│   - Business Logic              │
│   - Validation                  │
└─────────────┬───────────────────┘
              │ Entity Framework
┌─────────────▼───────────────────┐
│   Database (SQL Server)         │
│   - Data Storage                │
│   - Relationships               │
└─────────────────────────────────┘
```

**Паттерны проектирования:**
- 🎯 **Repository Pattern** - Абстракция доступа к данным
- 📦 **DTO Pattern** - Разделение моделей и API контрактов
- 💉 **Dependency Injection** - Управление зависимостями
- 🎨 **MVC Pattern** - Разделение представления и логики

📖 **Подробнее:** [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 📚 Документация

| Документ | Описание |
|----------|----------|
| [START_HERE.md](START_HERE.md) | ⭐ Начните отсюда! |
| [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) | 🚀 Деплой на Vercel (5 минут) |
| [GITHUB_SETUP.md](GITHUB_SETUP.md) | 🐙 Настройка GitHub |
| [DEPLOYMENT.md](DEPLOYMENT.md) | 📦 Полное руководство по деплою |
| [QUICKSTART.md](QUICKSTART.md) | ⚡ Быстрый старт локально |
| [FEATURES.md](FEATURES.md) | ✨ Описание всех функций |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 🏗️ Архитектура системы |
| [TODO.md](TODO.md) | 📝 Планы развития |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 🤝 Руководство для разработчиков |

---

## 🎯 Основные функции

### Управление данными
- ➕ **Добавление** записей через модальное окно
- ✏️ **Редактирование** записей (двойной клик или кнопка)
- 🗑️ **Удаление** записей с подтверждением
- 👁️ **Просмотр** всех записей в таблице

### Фильтрация и поиск
- 🔍 **Поиск** по названию и описанию
- 🏷️ **Фильтр** по категории
- ✅ **Фильтр** по статусу (активен/неактивен)
- 🔄 **Комбинация** нескольких фильтров

### UI/UX
- 📱 **Адаптивный** дизайн для всех устройств
- 🎨 **Современный** UI с градиентами
- ⚡ **Быстрая** валидация форм
- 🔄 **Loading** состояния
- ⚠️ **Error** handling

📖 **Подробнее:** [FEATURES.md](FEATURES.md)

---

## 🛠️ Разработка

### Требования

- **.NET 6.0 SDK** или выше
- **Node.js 18+** и npm
- **MS SQL Server** или LocalDB

### Установка зависимостей

```bash
# Backend
cd Backend/DataManagementSystem.API
dotnet restore

# Frontend
cd Frontend
npm install
```

### Запуск в режиме разработки

```bash
# Backend (hot reload)
cd Backend/DataManagementSystem.API
dotnet watch run

# Frontend (hot reload)
cd Frontend
npm run dev
```

### Сборка для продакшена

```bash
# Backend
cd Backend/DataManagementSystem.API
dotnet publish -c Release -o ./publish

# Frontend
cd Frontend
npm run build
```

---

## 🔐 Переменные окружения

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (appsettings.json)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=DataManagementDB;Trusted_Connection=true"
  }
}
```

---

## 🚀 Деплой

### Frontend на Vercel

Автоматический деплой настроен через GitHub Actions.

**Ручной деплой:**
```bash
cd Frontend
npm run build
vercel --prod
```

📖 **Инструкция:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

### Backend

**Варианты хостинга:**
- ☁️ **Azure App Service** - Рекомендуется для ASP.NET
- 🚂 **Railway.app** - Бесплатный tier с .NET поддержкой
- 🎨 **Render.com** - Бесплатный tier с PostgreSQL

📖 **Инструкция:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🤝 Участие в проекте

Мы приветствуем ваш вклад! 

1. 🍴 Форкните репозиторий
2. 🌿 Создайте ветку для фичи (`git checkout -b feature/AmazingFeature`)
3. 💾 Закоммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Запушьте ветку (`git push origin feature/AmazingFeature`)
5. 🔃 Откройте Pull Request

📖 **Руководство:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📝 Лицензия

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Автор

**Sergii Kols**

- GitHub: [@sergiiKols](https://github.com/sergiiKols)
- Repository: [Table](https://github.com/sergiiKols/Table)

---

## 🌟 Звезды

Если проект был полезен, поставьте ⭐ звезду!

---

## 🙏 Благодарности

- [React](https://reactjs.org/)
- [ASP.NET Core](https://docs.microsoft.com/aspnet/core)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [Vercel](https://vercel.com/)

---

## 📊 Статистика

- **Код:** ~2500+ строк
- **Документация:** ~3500+ строк
- **Компоненты React:** 3 основных
- **API Endpoints:** 6 endpoints
- **Паттерны:** Repository, DTO, DI, MVC

---

<div align="center">

**Создано с ❤️ для изучения Full-Stack разработки**

[⬆ Вернуться к началу](#-система-управления-данными)

</div>
