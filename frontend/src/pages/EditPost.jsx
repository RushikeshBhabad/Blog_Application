import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Toast from '../components/Toast';
import Loader from '../components/Loader';

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverImage: '',
    tags: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/${id}`);
        const post = res.data.data;
        setFormData({
          title: post.title,
          author: post.author,
          coverImage: post.coverImage,
          tags: post.tags.join(', '),
          content: post.content
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

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
      setSubmitLoading(true);
      const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [];
      
      const payload = {
        ...formData,
        tags: tagsArray
      };

      await api.put(`/${id}`, payload);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <Loader />;
  
  if (error && !formData.title) {
     return <div className="text-center py-8"><h3>{error}</h3><button className="btn btn-primary mt-4" onClick={() => navigate('/')}>Go Home</button></div>
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Edit Post</h2>
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
      {success && <Toast message="Post updated successfully!" type="success" onClose={() => setSuccess(false)} />}
      
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

        <button type="submit" className="btn btn-primary" disabled={submitLoading} style={{ width: '100%', padding: '1rem' }}>
          {submitLoading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;