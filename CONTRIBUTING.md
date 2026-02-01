# 🤝 Руководство по участию в проекте

Спасибо за интерес к проекту! Мы приветствуем любой вклад в развитие системы.

## 📋 Как можно помочь

- 🐛 Сообщать об ошибках
- 💡 Предлагать новые функции
- 📝 Улучшать документацию
- 💻 Писать код
- 🧪 Добавлять тесты
- 🎨 Улучшать UI/UX

## 🚀 Начало работы

### 1. Форкните репозиторий

Нажмите кнопку "Fork" в правом верхнем углу

### 2. Клонируйте ваш форк

```bash
git clone https://github.com/YOUR-USERNAME/DataManagementSystem.git
cd DataManagementSystem
```

### 3. Создайте ветку для изменений

```bash
git checkout -b feature/my-new-feature
# или
git checkout -b fix/bug-description
```

### 4. Внесите изменения

Следуйте нашим стандартам кода (см. ниже)

### 5. Зафиксируйте изменения

```bash
git add .
git commit -m "feat: add new feature"
```

### 6. Отправьте изменения

```bash
git push origin feature/my-new-feature
```

### 7. Создайте Pull Request

Перейдите на GitHub и создайте Pull Request

## 📏 Стандарты кода

### Backend (C#)

- Следуйте [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- Используйте async/await для асинхронных операций
- Добавляйте XML комментарии к публичным методам
- Пишите юнит-тесты для новой функциональности

```csharp
/// <summary>
/// Получает элемент по идентификатору
/// </summary>
/// <param name="id">Идентификатор элемента</param>
/// <returns>Элемент данных или null</returns>
public async Task<DataItem?> GetByIdAsync(int id)
{
    return await _context.DataItems.FindAsync(id);
}
```

### Frontend (JavaScript/React)

- Используйте функциональные компоненты и хуки
- Следуйте [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Используйте осмысленные имена переменных
- Добавляйте PropTypes или TypeScript типы

```javascript
// Хороший пример
const DataTable = ({ items, loading, onEdit, onDelete }) => {
  if (loading) return <Spinner />;
  
  return (
    <Table>
      {items.map(item => (
        <TableRow key={item.id} item={item} />
      ))}
    </Table>
  );
};

// Плохой пример
const dt = ({ i, l, e, d }) => { ... }
```

## 📝 Commit Messages

Используйте [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - новая функция
- `fix:` - исправление ошибки
- `docs:` - изменения в документации
- `style:` - форматирование кода
- `refactor:` - рефакторинг кода
- `test:` - добавление тестов
- `chore:` - обновление зависимостей и т.д.

### Примеры:

```
feat: add export to Excel functionality
fix: resolve CORS error on production
docs: update installation instructions
style: format code according to style guide
refactor: extract validation logic to separate service
test: add unit tests for DataItemRepository
chore: update Entity Framework to version 7
```

## 🐛 Сообщения об ошибках

При создании issue укажите:

1. **Описание проблемы** - что произошло
2. **Ожидаемое поведение** - что должно было произойти
3. **Шаги воспроизведения** - как повторить ошибку
4. **Окружение** - ОС, браузер, версии
5. **Скриншоты** - если применимо

### Шаблон:

```markdown
## Описание
Краткое описание проблемы

## Шаги воспроизведения
1. Перейти на страницу X
2. Нажать кнопку Y
3. Увидеть ошибку Z

## Ожидаемое поведение
Должно произойти X

## Текущее поведение
Происходит Y

## Окружение
- ОС: Windows 11
- Браузер: Chrome 120
- .NET: 6.0.25
- Node.js: 18.17.0

## Скриншоты
[Прикрепите скриншоты]
```

## 💡 Предложения функций

При создании feature request укажите:

1. **Проблема** - какую проблему решает функция
2. **Решение** - как функция работает
3. **Альтернативы** - рассматривали ли другие варианты
4. **Дополнительный контекст** - примеры, mockups

## ✅ Чеклист перед Pull Request

- [ ] Код соответствует стилю проекта
- [ ] Добавлены/обновлены тесты
- [ ] Все тесты проходят
- [ ] Обновлена документация
- [ ] Commit messages следуют конвенции
- [ ] Нет конфликтов с main веткой
- [ ] Код review самого себя выполнен

## 🧪 Запуск тестов

### Backend тесты

```bash
cd Backend/DataManagementSystem.API.Tests
dotnet test
```

### Frontend тесты

```bash
cd Frontend
npm test
```

## 📚 Дополнительные ресурсы

- [README.md](README.md) - Основная документация
- [ARCHITECTURE.md](ARCHITECTURE.md) - Архитектура системы
- [TODO.md](TODO.md) - Список запланированных улучшений

## ❓ Вопросы?

Если у вас есть вопросы, создайте issue с тегом `question`

---

**Спасибо за ваш вклад! 🎉**
