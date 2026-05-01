import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/${id}`);
        setPost(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await api.patch(`/${id}/like`);
      setPost({ ...post, likes: res.data.data });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/${id}`);
        navigate('/');
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-8"><h2>{error}</h2><Link to="/" className="btn btn-primary mt-4">← Back to Home</Link></div>;
  if (!post) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
        ← Back to Home
      </Link>
      
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="post-banner" />
      )}
      
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="card-meta" style={{ fontSize: '1rem' }}>
          <div>
            <span>👤 {post.author}</span>
            <span style={{ margin: '0 1rem' }}>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
            <span>⏱️ {post.readTime} min read</span>
          </div>
          <div>
            <span>👍 {post.likes}</span>
            <span style={{ margin: '0 0.5rem' }}>|</span>
            <span>👁️ {post.views}</span>
          </div>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="card-tags" style={{ marginTop: '1rem' }}>
            {post.tags.map((tag, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.875rem' }}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="post-body">
        {post.content}
      </div>

      <div className="card-actions gap-4" style={{ paddingTop: '2rem', marginTop: '2rem' }}>
        <button onClick={handleLike} className="btn btn-primary">
          👍 Like ({post.likes})
        </button>
        <Link to={`/edit/${post._id}`} className="btn btn-outline" style={{ marginLeft: 'auto' }}>
          ✏️ Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ViewPost;