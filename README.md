# Student Projects Repository

Веб-приложение для управления репозиторием проектов студентов с JWT аутентификацией и современным React фронтендом.

## 📋 Описание лабораторной работы

### Цель работы
Разработка полнофункционального веб-приложения для демонстрации проектов студентов с системой аутентификации и управления контентом.

### Задачи
1. Создание REST API с использованием Spring Boot
2. Реализация JWT аутентификации для администратора
3. Разработка React фронтенда с современным UI/UX
4. Интеграция системы загрузки и отображения изображений
5. Создание адаптивного дизайна для различных устройств

### Функциональные требования
- 🔐 Аутентификация администратора через JWT токены
- 📋 Отображение проектов в виде карточек с кратким описанием
- 🔍 Детальные страницы проектов с полной информацией
- 📸 Отображение фотографий студентов
- 🔗 Интеграция ссылок на GitHub, YouTube, демо-версии
- ➕ Создание новых проектов администратором
- 📱 Адаптивный дизайн для мобильных устройств

## 🚀 Инструкции по запуску проекта

### Предварительные требования
- Java 17 или выше
- Node.js 16 или выше
- npm или yarn

### Backend (Spring Boot)

1. **Перейдите в папку backend:**
```bash
cd backend
```

2. **Запустите приложение:**
```bash
# Windows
gradlew.bat bootRun

# Linux/Mac
./gradlew bootRun
```

3. **Проверьте запуск:**
- Backend будет доступен по адресу: http://localhost:8080

### Frontend (React)

1. **Перейдите в папку frontend:**
```bash
cd frontend
```

2. **Установите зависимости:**
```bash
npm install
```

3. **Запустите приложение:**
```bash
npm start
```

4. **Проверьте запуск:**
- Frontend будет доступен по адресу: http://localhost:3000

### Учетные данные для входа
- **Username:** admin
- **Password:** password

## 📚 Краткая документация к проекту

### Архитектура приложения

#### Backend (Spring Boot)
```
├── controller/          # REST API контроллеры
│   ├── AuthenticationController.java
│   ├── StudentProjectController.java
│   ├── ImageController.java
│   └── StaticResourceController.java
├── domain/              # JPA сущности
│   └── StudentProject.java
├── dto/                 # Data Transfer Objects
│   ├── request/
│   └── response/
├── repository/          # JPA репозитории
├── security/            # JWT аутентификация
├── service/             # Бизнес логика
└── config/              # Конфигурации
```

#### Frontend (React)
```
├── components/          # React компоненты
│   ├── Login.js
│   ├── ProjectList.js
│   ├── ProjectDetail.js
│   ├── CreateProject.js
│   └── Navbar.js
├── context/             # React контексты
│   └── AuthContext.js
├── services/            # API сервисы
│   └── api.js
└── App.js               # Главный компонент
```

### API Endpoints

#### Аутентификация
- `POST /auth/login` - Вход в систему
- `POST /auth/upload` - Загрузка изображений

#### Проекты
- `GET /api/projects` - Получить все проекты
- `GET /api/projects/{id}` - Получить проект по ID
- `POST /api/projects` - Создать новый проект (требует аутентификации)

#### Статические ресурсы
- `GET /uploads/{filename}` - Получить загруженное изображение

### База данных

#### Структура таблицы `student_projects`
```sql
CREATE TABLE student_projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    full_description TEXT,
    student_name VARCHAR(255) NOT NULL,
    student_photo VARCHAR(500),
    github_url VARCHAR(500),
    youtube_url VARCHAR(500),
    demo_url VARCHAR(500),
    other_links VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Технологический стекhttps://github.com/randy525/student-projects/blob/master/README.md

#### Backend
- **Spring Boot 3.4.3** - основной фреймворк
- **Spring Security** - аутентификация и авторизация
- **Spring Data JPA** - работа с базой данных
- **JWT** - JSON Web Tokens для аутентификации
- **Gradle** - система сборки
- **Flyway** - миграции базы данных

#### Frontend
- **React 18** - библиотека для создания пользовательского интерфейса
- **React Router DOM** - маршрутизация
- **Axios** - HTTP клиент для API запросов
- **CSS Grid и Flexbox** - современная верстка
- **LocalStorage** - хранение JWT токенов

## ▶️ Примеры использования проекта с приложением скриншотов
![image](https://github.com/user-attachments/assets/aba8be5d-9256-4104-a401-f539268cb461)
![image](https://github.com/user-attachments/assets/60aa7496-dd74-45e9-bf49-7841d23ef799)
![image](https://github.com/user-attachments/assets/2fc23de5-5c8b-4f42-a259-94d09ce47064)


## ❓ Ответы на контрольные вопросы

### 1. Какие технологии использованы в проекте?
**Backend:** Spring Boot, Spring Security, JPA, H2 Database, JWT, Gradle
**Frontend:** React, React Router, Axios, CSS3

### 2. Как реализована аутентификация?
Аутентификация реализована с использованием JWT (JSON Web Tokens). При успешном входе сервер возвращает JWT токен, который сохраняется в localStorage браузера и отправляется с каждым запросом в заголовке Authorization.

### 3. Как организована структура базы данных?
Используется одна таблица `student_projects` с полями для хранения всей информации о проектах: название, описания, имя студента, фотография, ссылки на ресурсы.

### 4. Как реализована загрузка изображений?
Изображения загружаются через REST API endpoint `/auth/upload`, сохраняются в папку `uploads/` на сервере и обслуживаются через `StaticResourceController`.

### 5. Какие меры безопасности реализованы?
- JWT аутентификация
- CORS конфигурация
- Валидация входных данных
- Защищенные endpoints для административных функций

### 6. Как обеспечивается адаптивность дизайна?
Использование CSS Grid, Flexbox и медиа-запросов для адаптации интерфейса под различные размеры экранов.

## 📖 Список использованных источников

### Документация и руководства
1. **Spring Boot Documentation** - https://spring.io/projects/spring-boot
2. **Spring Security Reference** - https://docs.spring.io/spring-security/reference/
3. **React Documentation** - https://react.dev/
4. **JWT.io** - https://jwt.io/
5. **MDN Web Docs** - https://developer.mozilla.org/

### Учебные материалы
6. **Spring Boot Tutorial** - Baeldung
7. **React Tutorial** - React Official Documentation
8. **JWT Authentication Tutorial** - Java Brains

### Технические ресурсы
10. **Gradle User Guide** - https://docs.gradle.org/
11. **Axios Documentation** - https://axios-http.com/
12. **CSS Grid Guide** - CSS-Tricks

## 🔧 Дополнительные важные аспекты

### Особенности реализации

#### Безопасность
- JWT токены имеют ограниченное время жизни
- Пароли не хранятся в открытом виде
- CORS настроен только для разрешенных доменов
- Валидация всех входных данных

#### Производительность
- Изображения обслуживаются как статические ресурсы
- Использование индексов в базе данных
- Оптимизированные SQL запросы через JPA

#### Масштабируемость
- Модульная архитектура
- Разделение frontend и backend
- Возможность замены базы данных
- REST API для интеграции с другими системами

#### Пользовательский опыт
- Интуитивный интерфейс
- Быстрая загрузка страниц
- Адаптивный дизайн
- Обработка ошибок с понятными сообщениями

### Возможные улучшения
1. **База данных:** Переход на PostgreSQL для продакшена
2. **Кэширование:** Добавление Redis для кэширования
3. **Логирование:** Интеграция с ELK Stack
4. **Мониторинг:** Добавление метрик и алертов
5. **Тестирование:** Покрытие unit и integration тестами
6. **CI/CD:** Автоматизация развертывания
7. **Docker:** Контейнеризация приложения

### Требования к системе
- **Минимальные:** 2GB RAM, 1 CPU core
- **Рекомендуемые:** 4GB RAM, 2 CPU cores
- **Операционная система:** Windows, Linux, macOS
- **Браузер:** Chrome, Firefox, Safari, Edge (последние версии)

### Лицензия
MIT License - свободное использование и модификация кода. 
