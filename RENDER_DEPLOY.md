# 🎨 Деплой Backend на Render.com

Пошаговая инструкция по развертыванию ASP.NET Core Backend на Render.com.

---

## ✅ Преимущества Render.com:

- ✅ **Полностью бесплатно** (Free tier)
- ✅ **Не требует карты**
- ✅ Поддержка .NET
- ✅ Автоматический деплой из GitHub
- ✅ HTTPS из коробки
- ✅ Легкая настройка

**Минус:** База засыпает после 15 минут неактивности (просыпается за ~30 секунд)

---

## 🚀 Пошаговая инструкция

### ШАГ 1: Регистрация (1 минута)

1. **Перейдите на:** https://render.com
2. **Нажмите:** "Get Started for Free"
3. **Войдите через GitHub** (рекомендуется)
4. **Авторизуйте** Render для доступа к репозиториям

✅ Вы в Dashboard Render!

---

### ШАГ 2: Создание Web Service (1 минута)

1. **Нажмите:** "New +" (синяя кнопка вверху справа)
2. **Выберите:** "Web Service"
3. **Connect repository:** Найдите **sergiiKols/Table**
4. **Нажмите:** "Connect"

---

### ШАГ 3: Настройка проекта (2 минуты)

Заполните форму:

```
Name:
    table-backend
    (или любое имя)

Region:
    Oregon (US West) - или ближайший
    
Branch:
    main

Root Directory:
    Backend/DataManagementSystem.API
    
    ⚠️ ВАЖНО! Укажите путь к API проекту

Runtime:
    .NET
    
Build Command:
    dotnet publish -c Release -o out
    
Start Command:
    cd out && dotnet DataManagementSystem.API.dll
```

---

### ШАГ 4: Выбор плана

Прокрутите вниз до **"Instance Type"**:

Выберите: **Free** (0$/month)

---

### ШАГ 5: Environment Variables (важно!)

Раскройте секцию **"Environment Variables"**

Добавьте переменные:

**1. ASPNETCORE_URLS**
```
Key: ASPNETCORE_URLS
Value: http://0.0.0.0:$PORT
```

**2. ConnectionStrings__DefaultConnection**
```
Key: ConnectionStrings__DefaultConnection
Value: User Id=postgres.juvrhaxwpifpzyndfwti;Password=1267778366Sk;Server=aws-0-us-west-2.pooler.supabase.com;Port=5432;Database=postgres;Pooling=true;SSL Mode=Require;Trust Server Certificate=true
```

**3. ASPNETCORE_ENVIRONMENT**
```
Key: ASPNETCORE_ENVIRONMENT
Value: Production
```

---

### ШАГ 6: Create Web Service

Нажмите кнопку **"Create Web Service"** внизу

---

### ШАГ 7: Ожидание деплоя (3-5 минут)

Вы попадете на страницу деплоя. Будет показан лог сборки.

⏳ Подождите пока статус не станет **"Live"** (зеленый)

---

### ШАГ 8: Получите URL

После успешного деплоя вы увидите URL вашего Backend:

```
https://table-backend.onrender.com
```

Скопируйте этот URL!

---

### ШАГ 9: Проверьте API

Откройте в браузере:
```
https://table-backend.onrender.com/swagger
```

Попробуйте GET /api/dataitems - должны увидеть данные!

---

## 🔄 Обновление Frontend (Vercel)

### После успешного деплоя Backend:

1. **Перейдите в Vercel Dashboard**
2. **Откройте проект:** sergii-table
3. **Settings → Environment Variables**
4. **Добавьте/Обновите:**
   ```
   Name: VITE_API_BASE_URL
   Value: https://table-backend.onrender.com/api
   ```
5. **Redeploy:** Deployments → Latest → Redeploy

---

## ✅ Готово!

После этого ваш Frontend на Vercel будет работать с Backend на Render! 🎉

---

## 🐛 Troubleshooting

### Build failed

**Ошибка:** Не найден .NET

**Решение:** Проверьте что Root Directory = `Backend/DataManagementSystem.API`

### Application error

**Ошибка:** Не запускается

**Решение:** Проверьте Environment Variables, особенно `ASPNETCORE_URLS`

### CORS errors на Frontend

**Решение:** Нужно обновить CORS в Backend `Program.cs` - добавьте Render и Vercel URLs

---

**Версия:** 1.0.0  
**Время деплоя:** ~5-7 минут
