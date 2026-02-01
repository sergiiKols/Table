# 🐙 Настройка GitHub репозитория

Пошаговая инструкция для загрузки проекта на GitHub.

---

## 📋 Предварительные требования

- ✅ Аккаунт на [GitHub](https://github.com)
- ✅ Git установлен на компьютере
- ✅ Проект готов к загрузке

---

## 🚀 Шаг 1: Инициализация Git (если еще не сделано)

```bash
# Перейдите в папку проекта
cd path/to/Table

# Инициализируйте Git
git init

# Проверьте статус
git status
```

---

## 📝 Шаг 2: Подготовка файлов

### Убедитесь, что .gitignore настроен правильно

`.gitignore` уже создан в проекте и содержит:

```gitignore
# Backend
Backend/**/*.user
Backend/**/bin/
Backend/**/obj/
Backend/**/publish/

# Frontend
Frontend/node_modules/
Frontend/dist/

# Environment files
.env
.env.local
.env.*.local

# и другие...
```

### Добавьте файлы в Git

```bash
# Добавить все файлы
git add .

# Или добавить конкретные файлы/папки
git add Backend/
git add Frontend/
git add *.md
git add vercel.json
git add .gitignore

# Проверьте что будет закоммичено
git status
```

---

## 💾 Шаг 3: Первый коммит

```bash
# Создайте первый коммит
git commit -m "Initial commit: Data Management System

- Backend: ASP.NET Core 6.0 API
- Frontend: React 18 + Vite
- Full documentation
- Vercel deployment ready"

# Проверьте коммит
git log --oneline
```

---

## 🌐 Шаг 4: Создание репозитория на GitHub

### Вариант A: Через веб-интерфейс

1. **Перейдите на:** https://github.com/new
2. **Repository name:** `Table` (или другое имя)
3. **Description:** `Full-stack Data Management System with React and ASP.NET Core`
4. **Visibility:** Public (или Private по желанию)
5. **НЕ выбирайте:**
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
   
   (У нас уже есть эти файлы)

6. **Нажмите:** "Create repository"

### Вариант B: Через GitHub CLI (если установлен)

```bash
# Установите GitHub CLI: https://cli.github.com/

# Авторизуйтесь
gh auth login

# Создайте репозиторий
gh repo create Table --public --source=. --remote=origin

# Запушьте код
git push -u origin main
```

---

## 🔗 Шаг 5: Подключение локального репозитория к GitHub

После создания репозитория на GitHub:

```bash
# Добавьте remote origin (замените YOUR_USERNAME)
git remote add origin https://github.com/sergiiKols/Table.git

# Проверьте remote
git remote -v

# Переименуйте ветку в main (если нужно)
git branch -M main

# Запушьте код
git push -u origin main
```

---

## ✅ Шаг 6: Проверка

Перейдите на: https://github.com/sergiiKols/Table

Вы должны увидеть:
- ✅ Все файлы проекта
- ✅ README.md отображается на главной странице
- ✅ Структура папок Backend/ и Frontend/
- ✅ Документация (все .md файлы)

---

## 📚 Шаг 7: Настройка репозитория

### Добавьте описание и topics

1. **Нажмите "⚙️" рядом с About**
2. **Description:** `Full-stack Data Management System with React 18, ASP.NET Core 6.0, and Entity Framework`
3. **Website:** (позже добавите Vercel URL)
4. **Topics:** добавьте tags:
   - `react`
   - `aspnetcore`
   - `dotnet`
   - `entity-framework`
   - `vite`
   - `fullstack`
   - `crud`
   - `data-management`
   - `vercel`

### Настройте README badges (опционально)

Добавьте в начало README.md:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sergiiKols/Table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![.NET](https://img.shields.io/badge/.NET-6.0-512BD4)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
```

---

## 🔐 Шаг 8: Защита main ветки (опционально)

Для больших проектов:

1. **Settings** → **Branches**
2. **Add rule** → **Branch name pattern:** `main`
3. **Выберите:**
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Include administrators (опционально)

---

## 🚀 Следующие шаги

### 1. Деплой на Vercel

Следуйте инструкциям: [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

### 2. Настройка GitHub Actions

GitHub Actions уже настроен в `.github/workflows/vercel-deploy.yml`

**Для активации нужно добавить secrets:**

1. **GitHub Repository** → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret:**

```
VERCEL_TOKEN = your_vercel_token
VERCEL_ORG_ID = your_vercel_org_id
VERCEL_PROJECT_ID = your_vercel_project_id
VITE_API_BASE_URL = https://your-backend-url.com/api
```

**Как получить Vercel токены:**

```bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в аккаунт
vercel login

# Получите токен
vercel token create

# Получите project info (в папке Frontend)
cd Frontend
vercel link
cat .vercel/project.json
```

---

## 📝 Работа с Git

### Ежедневная работа:

```bash
# Проверка статуса
git status

# Добавление изменений
git add .

# Коммит
git commit -m "feat: add new feature"

# Push на GitHub
git push
```

### Создание ветки для новой функции:

```bash
# Создать и переключиться на новую ветку
git checkout -b feature/new-feature

# Внести изменения и закоммитить
git add .
git commit -m "feat: implement new feature"

# Запушить ветку
git push -u origin feature/new-feature

# На GitHub создать Pull Request
```

### Обновление из main:

```bash
# Переключиться на main
git checkout main

# Получить последние изменения
git pull origin main

# Вернуться на свою ветку
git checkout feature/new-feature

# Слить изменения из main
git merge main
```

---

## 🐛 Troubleshooting

### Проблема: "fatal: remote origin already exists"

```bash
# Удалить существующий remote
git remote remove origin

# Добавить заново
git remote add origin https://github.com/sergiiKols/Table.git
```

### Проблема: "Updates were rejected"

```bash
# Сначала получить изменения с GitHub
git pull origin main --rebase

# Затем запушить
git push origin main
```

### Проблема: Большой файл не загружается

GitHub имеет лимит 100MB на файл.

```bash
# Удалить файл из Git истории
git rm --cached path/to/large-file

# Добавить в .gitignore
echo "path/to/large-file" >> .gitignore

# Закоммитить
git commit -m "Remove large file"
```

### Проблема: Загрузились секреты (.env)

```bash
# Удалить из Git (НО ОСТАВИТЬ ЛОКАЛЬНО!)
git rm --cached Frontend/.env

# Убедитесь что .env в .gitignore
echo "Frontend/.env" >> .gitignore

# Коммит
git commit -m "Remove .env from git"

# Push
git push

# ВАЖНО: Измените все секреты/пароли в .env!
```

---

## 📋 Чеклист GitHub Setup

- [ ] Git установлен
- [ ] Проект инициализирован (`git init`)
- [ ] .gitignore настроен
- [ ] Файлы добавлены (`git add .`)
- [ ] Первый коммит создан
- [ ] Репозиторий создан на GitHub
- [ ] Remote origin добавлен
- [ ] Код запушен (`git push`)
- [ ] README отображается корректно
- [ ] Topics добавлены
- [ ] Secrets для Actions настроены (опционально)

---

## 🎉 Готово!

Ваш проект теперь на GitHub:
**https://github.com/sergiiKols/Table**

**Следующие шаги:**
1. ⭐ [Деплой на Vercel](VERCEL_DEPLOY.md)
2. 📖 [Полное руководство по деплою](DEPLOYMENT.md)
3. 🤝 [Приглашение участников](https://github.com/sergiiKols/Table/settings/access)

---

**Версия:** 1.0.0  
**Последнее обновление:** 01.02.2026
