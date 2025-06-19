-- Вставляем два начальных проекта
INSERT INTO student_projects (title, short_description, full_description, student_name, student_photo, github_url, youtube_url, demo_url, other_links) VALUES
(
    'E-Commerce Platform',
    'Современная платформа электронной коммерции с React и Spring Boot',
    'Полнофункциональная платформа электронной коммерции, разработанная с использованием React для фронтенда и Spring Boot для бэкенда.

Основные возможности:
• Система управления пользователями и аутентификация
• Каталог товаров с фильтрацией и поиском
• Корзина покупок и система заказов
• Интеграция с платежными системами
• Панель администратора для управления контентом
• Адаптивный дизайн для мобильных устройств

Технологии: React, Spring Boot, PostgreSQL, JWT, Bootstrap',
    'Иван Петров',
    '/uploads/628066ec-7ba8-49a1-a7fd-fa8441afa04d.jpg',
    'https://github.com/ivan-petrov/ecommerce-platform',
    'https://youtube.com/watch?v=example1',
    'https://ecommerce-demo.example.com',
    'https://docs.example.com/ecommerce'
),
(
    'Task Management App',
    'Приложение для управления задачами с drag-and-drop интерфейсом',
    'Инновационное приложение для управления задачами с интуитивным drag-and-drop интерфейсом.

Функциональность:
• Создание и управление проектами
• Drag-and-drop интерфейс для перемещения задач
• Назначение задач участникам команды
• Отслеживание прогресса и дедлайнов
• Система уведомлений и комментариев
• Командное сотрудничество в реальном времени
• Экспорт отчетов и аналитика

Технологии: Vue.js, Node.js, MongoDB, Socket.io, Tailwind CSS',
    'Мария Сидорова',
    '/uploads/4e6ffd78-3d47-431c-af47-bfe0baa6de1a.jpg',
    'https://github.com/maria-sidorova/task-manager',
    'https://youtube.com/watch?v=example2',
    'https://taskmanager-demo.example.com',
    'https://docs.example.com/taskmanager'
); 