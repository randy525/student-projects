-- Создаем таблицу для проектов студентов
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

-- Создаем функцию для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Создаем триггер для таблицы student_projects
CREATE TRIGGER update_student_projects_updated_at 
    BEFORE UPDATE ON student_projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 