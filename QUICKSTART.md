# 🚀 Быстрый старт

Это руководство поможет вам запустить проект за 5 минут!

## ✅ Проверка требований

Убедитесь, что установлено:
- ✅ .NET 6.0 SDK или выше
- ✅ Node.js 18+ и npm
- ✅ MS SQL Server или LocalDB

### Проверка версий:

```bash
# Проверка .NET
dotnet --version

# Проверка Node.js
node --version

# Проверка npm
npm --version
```

## 🎯 Запуск за 3 шага

### Шаг 1: Запуск Backend

```bash
# Перейти в папку Backend
cd Backend/DataManagementSystem.API

# Восстановить зависимости
dotnet restore

# Создать базу данных
dotnet ef migrations add InitialCreate
dotnet ef database update

# Запустить Backend
dotnet run
```

✅ Backend запущен на: `http://localhost:5000`
📖 Swagger UI: `http://localhost:5000/swagger`

### Шаг 2: Запуск Frontend

**Откройте НОВЫЙ терминал:**

```bash
# Перейти в папку Frontend
cd Frontend

# Установить зависимости
npm install

# Запустить Frontend
npm run dev
```

✅ Frontend запущен на: `http://localhost:3000`

### Шаг 3: Открыть приложение

Откройте браузер и перейдите: **http://localhost:3000**

🎉 **Готово!** Приложение работает!

---

## 📝 Что дальше?

### Попробуйте основные функции:

1. **➕ Добавить запись**
   - Нажмите кнопку "Добавить"
   - Заполните форму
   - Сохраните

2. **✏️ Редактировать запись**
   - Дважды кликните по любой строке
   - Или нажмите кнопку "Изменить"

3. **🔍 Фильтрация**
   - Введите текст в поиск
   - Выберите категорию
   - Нажмите "Применить"

4. **🗑️ Удалить запись**
   - Нажмите "Удалить" в строке
   - Подтвердите действие

---

## 🛠️ Полезные команды

### Backend команды:

```bash
# Запуск с автоперезагрузкой
dotnet watch run

# Создание новой миграции
dotnet ef migrations add MigrationName

# Просмотр списка миграций
dotnet ef migrations list

# Откат базы данных
dotnet ef database update PreviousMigrationName
```

### Frontend команды:

```bash
# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр production сборки
npm run preview
```

---

## ❗ Решение проблем

### Проблема: "dotnet: command not found"
➡️ Установите .NET SDK: https://dotnet.microsoft.com/download

### Проблема: "npm: command not found"
➡️ Установите Node.js: https://nodejs.org/

### Проблема: Backend не запускается
```bash
# Проверьте, свободен ли порт 5000
netstat -an | findstr :5000

# Если занят, измените порт в Program.cs или используйте:
dotnet run --urls "http://localhost:5001"
```

### Проблема: Frontend не подключается к Backend
1. Убедитесь, что Backend запущен
2. Проверьте URL в `Frontend/src/services/dataService.js`
3. Проверьте CORS настройки в `Backend/.../Program.cs`

### Проблема: Ошибка подключения к БД
```bash
# Проверьте строку подключения в appsettings.json
# Для LocalDB используйте:
"Server=(localdb)\\mssqllocaldb;Database=DataManagementDB;Trusted_Connection=true"

# Проверьте, запущен ли SQL Server
```

---

## 📚 Дополнительная документация

- 📖 [README.md](README.md) - Полная документация
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) - Архитектура системы
- 💾 [Backend/README.md](Backend/README.md) - Backend документация
- 🎨 [Frontend/README.md](Frontend/README.md) - Frontend документация

---

## 🎓 Дополнительные ресурсы

- [ASP.NET Core документация](https://docs.microsoft.com/aspnet/core)
- [React документация](https://react.dev)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [Vite документация](https://vitejs.dev)

---

**Приятной работы! 🚀**
