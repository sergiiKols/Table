# ⚡ Быстрый деплой на Vercel

Пошаговая инструкция для деплоя Frontend на Vercel за 5 минут.

---

## 🚀 Шаги деплоя

### 1. Подготовка GitHub репозитория

```bash
# Если еще не создан репозиторий
git init
git add .
git commit -m "Initial commit: Data Management System"
git branch -M main
git remote add origin https://github.com/sergiiKols/Table.git
git push -u origin main
```

✅ Ваш код теперь на GitHub: https://github.com/sergiiKols/Table

---

### 2. Деплой на Vercel

#### Способ 1: Через веб-интерфейс (Рекомендуется)

1. **Перейдите на:** https://vercel.com
2. **Войдите через GitHub**
3. **Нажмите кнопку:** "Add New..." → "Project"
4. **Импортируйте репозиторий:** `sergiiKols/Table`
5. **Настройте проект:**

**Configure Project:**

```
Framework Preset: Vite
Root Directory: ./
Build Command: cd Frontend && npm install && npm run build
Output Directory: Frontend/dist
Install Command: cd Frontend && npm install
```

6. **Environment Variables** (добавьте позже):
```
VITE_API_BASE_URL = https://your-backend-url.com/api
```

7. **Нажмите:** "Deploy"

#### Способ 2: Через Vercel CLI

```bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в аккаунт
vercel login

# Деплой
cd Frontend
vercel

# Следуйте инструкциям в терминале
```

---

### 3. Настройка переменных окружения

После первого деплоя:

1. Перейдите в **Settings** → **Environment Variables**
2. Добавьте:

```
Name: VITE_API_BASE_URL
Value: https://your-backend-api.com/api
Environment: Production, Preview, Development
```

3. **Redeploy** проект для применения изменений

---

### 4. Временное решение (для тестирования Frontend)

Если Backend еще не задеплоен, можно использовать локальный Backend с ngrok:

```bash
# Терминал 1: Запустите Backend
cd Backend/DataManagementSystem.API
dotnet run

# Терминал 2: Запустите ngrok
ngrok http 5000

# Скопируйте ngrok URL (например: https://abc123.ngrok.io)
# Добавьте в Vercel Environment Variables:
VITE_API_BASE_URL = https://abc123.ngrok.io/api
```

⚠️ **Важно:** ngrok URL меняется при каждом запуске (бесплатная версия)

---

## 🎯 Что получится

После деплоя вы получите:

- ✅ **Production URL:** `https://your-project.vercel.app`
- ✅ **Preview URLs:** для каждого Pull Request
- ✅ **Автодеплой:** при push в main ветку
- ✅ **Analytics:** статистика посещений (опционально)

---

## 📋 Чеклист деплоя

- [ ] Код запушен на GitHub
- [ ] Vercel проект создан
- [ ] Build успешно завершен
- [ ] Сайт открывается по Vercel URL
- [ ] Environment Variables настроены
- [ ] Backend доступен (или настроен ngrok)
- [ ] API запросы работают
- [ ] CRUD операции протестированы

---

## 🔧 Полезные команды Vercel CLI

```bash
# Локальная разработка с Vercel окружением
vercel dev

# Деплой в preview (не production)
vercel

# Деплой в production
vercel --prod

# Просмотр логов
vercel logs

# Список проектов
vercel list

# Добавить environment variable
vercel env add VITE_API_BASE_URL

# Удалить проект
vercel remove
```

---

## 🐛 Частые проблемы

### Проблема: Build failed

**Ошибка:** `Cannot find module 'react'`

**Решение:** 
```bash
# Проверьте package.json в Frontend папке
cd Frontend
npm install
npm run build

# Если работает локально, проверьте Build Command в Vercel
```

### Проблема: Blank page after deploy

**Причина:** Неправильный Output Directory

**Решение:** Убедитесь что Output Directory = `Frontend/dist`

### Проблема: API не работает

**Ошибка:** CORS или Network Error

**Решение:**
1. Проверьте `VITE_API_BASE_URL` в Environment Variables
2. Убедитесь что Backend настроил CORS для Vercel домена
3. Проверьте что Backend доступен по HTTPS

### Проблема: Environment Variables не работают

**Решение:**
1. Проверьте название: должно начинаться с `VITE_`
2. После добавления variables нужен **redeploy**
3. Используйте `import.meta.env.VITE_API_BASE_URL` в коде

---

## 🎨 Настройка кастомного домена (опционально)

1. **Купите домен** (например, на Namecheap, GoDaddy)
2. **В Vercel:** Settings → Domains
3. **Добавьте домен:** `yourdomain.com`
4. **Настройте DNS** у регистратора:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```
5. **Дождитесь** распространения DNS (5-30 минут)

---

## 📊 Мониторинг и аналитика

### Vercel Analytics (опционально)

```bash
# Добавьте в Frontend/package.json
npm install @vercel/analytics
```

```jsx
// В Frontend/src/main.jsx
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
```

---

## 🔐 Безопасность

### Настройки для продакшена:

1. **Security Headers** (создайте `vercel.json`):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

2. **Environment Variables:**
   - ⚠️ Никогда не коммитьте `.env` файлы
   - ✅ Используйте Vercel Dashboard для секретов
   - ✅ Используйте `VITE_` префикс для публичных переменных

---

## 🚀 Автоматический деплой

Vercel автоматически деплоит при:

- ✅ **Push в main** → Production deploy
- ✅ **Pull Request** → Preview deploy (уникальный URL)
- ✅ **Merge PR** → Production deploy

**Настройка:**
- Settings → Git → Production Branch: `main`
- Settings → Git → Preview Branches: All branches

---

## 📚 Дополнительные ресурсы

- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [React + Vite на Vercel](https://vercel.com/guides/deploying-vite-with-vercel)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 💡 Советы

1. **Используйте Preview deploys** для тестирования перед продакшеном
2. **Настройте notifications** в Vercel для уведомлений о деплоях
3. **Включите Vercel Analytics** для отслеживания посещений
4. **Используйте Edge Functions** для serverless API (advanced)
5. **Настройте Custom Domain** для профессионального вида

---

## ✅ Следующие шаги

После деплоя Frontend на Vercel:

1. [ ] Задеплойте Backend (см. [DEPLOYMENT.md](DEPLOYMENT.md))
2. [ ] Настройте базу данных
3. [ ] Обновите `VITE_API_BASE_URL` на реальный Backend URL
4. [ ] Протестируйте все функции
5. [ ] Настройте мониторинг и логирование

---

## 🎉 Готово!

Ваш Frontend теперь доступен по адресу:
**https://your-project.vercel.app**

Для деплоя Backend см. полное руководство: [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Версия:** 1.0.0  
**Последнее обновление:** 01.02.2026
