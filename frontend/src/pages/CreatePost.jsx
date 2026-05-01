import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Toast from '../components/Toast';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverImage: '',
    tags: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [];
      
      const payload = {
        ...formData,
        tags: tagsArray
      };

      await api.post('/', payload);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Create New Post</h2>
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
      {success && <Toast message="Post published successfully!" type="success" onClose={() => setSuccess(false)} />}
      
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input 
            type="text" 
            name="title" 
            className="form-control" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Author</label>
          <input 
            type="text" 
            name="author" 
            placeholder="Anonymous"
            className="form-control" 
            value={formData.author} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cover Image URL</label>
          <input 
            type="url" 
            name="coverImage" 
            className="form-control" 
            value={formData.coverImage} 
            onChange={handleChange} 
          />
          {formData.coverImage && (
            <img src={formData.coverImage} alt="Preview" style={{ width: '100px', marginTop: '10px', borderRadius: '4px' }} />
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Tags (comma separated)</label>
          <input 
            type="text" 
            name="tags" 
            placeholder="technology, programming, react"
            className="form-control" 
            value={formData.tags} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content *</label>
          <textarea 
            name="content" 
            className="form-control" 
            value={formData.content} 
            onChange={handleChange} 
            required
          ></textarea>
          <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
            {formData.content.length} characters
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem' }}>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;