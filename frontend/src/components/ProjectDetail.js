import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsAPI } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await projectsAPI.getById(id);
      setProject(response.data);
    } catch (err) {
      setError('Failed to load project');
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
    return <div className="loading">Loading project...</div>;
  }

  if (error || !project) {
    return <div className="error-message">{error || 'Project not found'}</div>;
  }

  return (
    <div className="container">
      <div className="project-detail">
        <div className="project-detail-header">
          <h1 className="project-detail-title">{project.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {project.studentPhoto ? (
              <img 
                src={getImageUrl(project.studentPhoto)} 
                alt={`${project.studentName}`}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid white'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid white',
                  color: '#666',
                  fontSize: '12px',
                  textAlign: 'center'
                }}
              >
                No Photo
              </div>
            )}
            <p className="project-detail-student">by {project.studentName}</p>
          </div>
        </div>
        
        <div className="project-detail-content">
          <div className="project-detail-description">
            {project.fullDescription?.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < project.fullDescription.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
          
          <div className="project-links">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
              >
                📁 GitHub
              </a>
            )}
            
            {project.youtubeUrl && (
              <a 
                href={project.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
              >
                📺 YouTube
              </a>
            )}
            
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
              >
                🚀 Demo
              </a>
            )}
            
            {project.otherLinks && (
              <a 
                href={project.otherLinks} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
              >
                🔗 Other Links
              </a>
            )}
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <Link to="/" className="btn btn-primary">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 