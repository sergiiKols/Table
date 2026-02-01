# ✅ Чеклист деплоя на Vercel

Используйте этот чеклист для успешного деплоя проекта на Vercel.

---

## 📋 Перед деплоем

### Git и GitHub

- [ ] Git инициализирован (`git init`)
- [ ] Все файлы добавлены (`git add .`)
- [ ] Первый коммит создан (`git commit -m "..."`)
- [ ] Репозиторий создан на GitHub
- [ ] Remote добавлен (`git remote add origin ...`)
- [ ] Код запушен (`git push -u origin main`)
- [ ] Репозиторий доступен: https://github.com/sergiiKols/Table

### Проверка файлов

- [ ] `vercel.json` создан
- [ ] `.vercelignore` создан
- [ ] `Frontend/.env.example` создан
- [ ] `Frontend/.env.production` создан
- [ ] `.env` файлы в `.gitignore`
- [ ] `dataService.js` использует переменные окружения
- [ ] GitHub Actions workflow создан

---

## 🚀 Деплой на Vercel

### Шаг 1: Создание проекта

- [ ] Открыт сайт: https://vercel.com
- [ ] Вход выполнен через GitHub
- [ ] Нажата кнопка "New Project"
- [ ] Импортирован репозиторий: `sergiiKols/Table`

### Шаг 2: Настройка проекта

**Build Settings:**

- [ ] Framework Preset: `Vite`
- [ ] Build Command: `cd Frontend && npm install && npm run build`
- [ ] Output Directory: `Frontend/dist`
- [ ] Install Command: `cd Frontend && npm install`
- [ ] Root Directory: `./` (оставить пустым)

### Шаг 3: Environment Variables

**На первом деплое пропустите, добавите позже**

- [ ] Пропущен раздел Environment Variables
- [ ] Нажата кнопка "Deploy"

### Шаг 4: Ожидание деплоя

- [ ] Сборка началась
- [ ] Сборка завершилась успешно (обычно 2-3 минуты)
- [ ] Получен URL: `https://your-project.vercel.app`
- [ ] Сайт открывается

---

## ⚙️ После первого деплоя

### Настройка Environment Variables

1. **Перейдите:** Settings → Environment Variables
2. **Добавьте переменную:**

```
Name: VITE_API_BASE_URL
Value: https://your-backend-url.com/api
Environments: ✅ Production ✅ Preview ✅ Development
```

3. **Save**

### Временное решение (для тестирования)

Если Backend еще не задеплоен:

**Вариант A: Локальный Backend + ngrok**

- [ ] Backend запущен локально: `start-backend.bat`
- [ ] ngrok запущен: `ngrok http 5000`
- [ ] ngrok URL скопирован: `https://abc123.ngrok.io`
- [ ] В Vercel добавлен: `VITE_API_BASE_URL=https://abc123.ngrok.io/api`
- [ ] Redeploy выполнен

**Вариант B: Mock данные (временно)**

- [ ] Создан файл с mock данными
- [ ] Frontend работает без Backend
- [ ] Готов к подключению реального Backend

### Redeploy после добавления переменных

- [ ] Перейдите: Deployments → Latest → ⋯ → Redeploy
- [ ] Выберите: "Use existing Build Cache"
- [ ] Подтвердите: Redeploy
- [ ] Новый деплой завершен

---

## 🔧 Настройка Backend

### Выбор платформы

**Выберите одну из опций:**

- [ ] **Azure App Service** (рекомендуется для .NET)
  - См. [DEPLOYMENT.md](DEPLOYMENT.md#вариант-1-azure-app-service)
  
- [ ] **Railway.app** (бесплатно)
  - См. [DEPLOYMENT.md](DEPLOYMENT.md#вариант-2-railwayapp)
  
- [ ] **Render.com** (бесплатно)
  - См. [DEPLOYMENT.md](DEPLOYMENT.md#вариант-3-rendercom)

### После деплоя Backend

- [ ] Backend доступен по HTTPS
- [ ] API возвращает данные
- [ ] CORS настроен для Vercel URL
- [ ] Connection string настроен
- [ ] Миграции применены к БД

### Обновление Frontend

- [ ] Backend URL скопирован
- [ ] В Vercel обновлен `VITE_API_BASE_URL`
- [ ] Redeploy выполнен
- [ ] Frontend подключается к Backend

---

## 💾 База данных

### Выбор БД

**Выберите одну из опций:**

- [ ] **Azure SQL Database** (для SQL Server)
- [ ] **Supabase** (PostgreSQL, бесплатно)
- [ ] **Neon.tech** (PostgreSQL, бесплатно)
- [ ] **Railway PostgreSQL** (бесплатно)

### Настройка

- [ ] База данных создана
- [ ] Connection string получен
- [ ] Connection string добавлен в Backend env vars
- [ ] Миграции применены: `dotnet ef database update`
- [ ] Seed данные загружены (опционально)

---

## ✅ Финальная проверка

### Frontend (Vercel)

- [ ] Сайт открывается: `https://your-project.vercel.app`
- [ ] UI загружается корректно
- [ ] Нет ошибок в консоли браузера
- [ ] Адаптивность работает (проверьте на мобильном)

### API подключение

- [ ] API запросы выполняются
- [ ] Данные загружаются в таблицу
- [ ] Нет CORS ошибок
- [ ] Loading states работают

### CRUD операции

- [ ] **Просмотр:** Таблица отображает данные
- [ ] **Создание:** Можно добавить новую запись
- [ ] **Редактирование:** Можно изменить запись
- [ ] **Удаление:** Можно удалить запись
- [ ] **Фильтрация:** Фильтры работают
- [ ] **Поиск:** Поиск работает

### Валидация и ошибки

- [ ] Валидация форм работает
- [ ] Ошибки отображаются корректно
- [ ] Network errors обрабатываются
- [ ] Timeout errors обрабатываются

---

## 🎨 Дополнительные настройки (опционально)

### Custom Domain

- [ ] Домен куплен
- [ ] В Vercel: Settings → Domains
- [ ] Домен добавлен
- [ ] DNS настроен у регистратора
- [ ] SSL сертификат активирован

### GitHub Integration

- [ ] Auto-deploy из main ветки включен
- [ ] Preview deploys для PR включены
- [ ] Notifications настроены

### Monitoring

- [ ] Vercel Analytics включен (опционально)
- [ ] Error tracking настроен (Sentry, опционально)
- [ ] Logging настроен

---

## 🐛 Troubleshooting

Если что-то не работает, проверьте:

### Build Failed

- [ ] Проверьте Build Logs в Vercel
- [ ] Убедитесь что `package.json` корректен
- [ ] Локально запустите: `npm run build`
- [ ] Проверьте Node.js версию

### Blank Page

- [ ] Проверьте Output Directory: `Frontend/dist`
- [ ] Проверьте Console в браузере
- [ ] Проверьте Network tab

### API не работает

- [ ] Проверьте `VITE_API_BASE_URL` в Environment Variables
- [ ] Проверьте что Backend доступен
- [ ] Проверьте CORS настройки Backend
- [ ] Проверьте Network tab в браузере

### CORS Errors

- [ ] Добавьте Vercel URL в CORS Backend:
  ```csharp
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

---

## 📚 Полезные ссылки

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Your Project:** `https://your-project.vercel.app`
- **GitHub Repo:** https://github.com/sergiiKols/Table

---

## 🎉 Готово!

Когда все пункты отмечены ✅, ваш проект полностью развернут и работает!

**Поздравляем! 🎊**

---

## 📊 Следующие шаги

После успешного деплоя:

- [ ] Поделитесь ссылкой с друзьями
- [ ] Добавьте скриншоты в README
- [ ] Создайте демо-видео
- [ ] Напишите статью о проекте
- [ ] Добавьте проект в портфолио
- [ ] Поставьте ⭐ на GitHub!

---

**Версия:** 1.0.0  
**Последнее обновление:** 01.02.2026
