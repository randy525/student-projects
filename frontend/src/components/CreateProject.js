import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI } from '../services/api';

const CreateProject = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    studentName: '',
    studentPhoto: '',
    githubUrl: '',
    youtubeUrl: '',
    demoUrl: '',
    otherLinks: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.text();
      return result; // Возвращает URL загруженного изображения
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      let finalFormData = { ...formData };

      // Если выбран файл, загружаем его
      if (selectedFile) {
        setUploading(true);
        try {
          const uploadedImageUrl = await uploadImage(selectedFile);
          finalFormData.studentPhoto = uploadedImageUrl;
        } catch (uploadError) {
          setError('Failed to upload image. Please try again.');
          setLoading(false);
          setUploading(false);
          return;
        } finally {
          setUploading(false);
        }
      }

      await projectsAPI.create(finalFormData);
      setSuccess('Project created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        shortDescription: '',
        fullDescription: '',
        studentName: '',
        studentPhoto: '',
        githubUrl: '',
        youtubeUrl: '',
        demoUrl: '',
        otherLinks: ''
      });
      setSelectedFile(null);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Create New Project</h1>
      
      <form className="create-project-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Student Name *</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Short Description *</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="form-textarea"
            required
            placeholder="Brief description for the project card..."
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Full Description *</label>
          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            className="form-textarea"
            required
            placeholder="Detailed description of the project...

You can use multiple lines to format your description properly.

Each line will be displayed as a separate paragraph."
            style={{ minHeight: '150px' }}
          />
          <small style={{ color: '#7f8c8d', marginTop: '0.5rem', display: 'block' }}>
            You can use Enter to create new lines. Each line will be displayed as a separate paragraph.
          </small>
        </div>
        
        <div className="form-group">
          <label className="form-label">Student Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
            style={{ padding: '0.5rem' }}
          />
          {selectedFile && (
            <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f0f0f0', borderRadius: '4px' }}>
              <small>Selected file: {selectedFile.name}</small>
            </div>
          )}
          <small style={{ color: '#7f8c8d', marginTop: '0.5rem', display: 'block' }}>
            Upload a photo of the student. This will be displayed as a circular avatar next to the student name.
          </small>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="https://github.com/username/repo"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">YouTube URL</label>
            <input
              type="url"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Demo URL</label>
            <input
              type="url"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="https://demo.example.com"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Other Links</label>
            <input
              type="url"
              name="otherLinks"
              value={formData.otherLinks}
              onChange={handleChange}
              className="form-input"
              placeholder="https://other-link.com"
            />
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading || uploading}
          >
            {uploading ? 'Uploading...' : loading ? 'Creating...' : 'Create Project'}
          </button>
          
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject; 