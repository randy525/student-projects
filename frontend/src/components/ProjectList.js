import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения правильного URL изображения
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    
    // Если это локальный путь (начинается с /uploads/), используем новый контроллер
    if (imageUrl.startsWith('/uploads/')) {
      return `http://localhost:8080/static${imageUrl}`;
    }
    
    // Если это внешний URL, возвращаем как есть
    return imageUrl;
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Student Projects</h1>
      
      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
          <h3>No projects available</h3>
          <p>Projects will appear here once they are created by an admin.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <h3 className="project-title">{project.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {project.studentPhoto ? (
                    <img 
                      src={getImageUrl(project.studentPhoto)} 
                      alt={`${project.studentName}`}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div 
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        fontSize: '10px',
                        textAlign: 'center'
                      }}
                    >
                      No Photo
                    </div>
                  )}
                  <p className="project-student">by {project.studentName}</p>
                </div>
              </div>
              <div className="project-description">
                {project.shortDescription}
              </div>
              <div className="project-actions">
                <Link to={`/project/${project.id}`} className="btn btn-primary">
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList; 