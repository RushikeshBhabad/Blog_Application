import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const PostCard = ({ post, onDelete }) => {
  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent link click
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/${post._id}`);
        if(onDelete) onDelete(post._id);
      } catch (error) {
        console.error("Error deleting", error);
        alert("Failed to delete post");
      }
    }
  };

  return (
    <div className="card">
      <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} className="card-img" />
        ) : (
          <div className="card-img-placeholder">
            {post.title ? post.title.charAt(0).toUpperCase() : '?'}
          </div>
        )}
      </Link>
      <div className="card-content">
        <Link to={`/post/${post._id}`} className="card-title">
          {post.title}
        </Link>
        <p className="card-excerpt">{post.excerpt}</p>
        
        <div className="card-meta">
          <span>👤 {post.author}</span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="card-meta">
          <span>⏱️ {post.readTime} min read</span>
          <span>👍 {post.likes} | 👁️ {post.views}</span>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="card-tags">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="badge">{tag}</span>
            ))}
          </div>
        )}

        <div className="card-actions justify-between">
          <Link to={`/edit/${post._id}`} className="btn btn-outline" style={{flex: 1, marginRight: '0.5rem', textAlign: 'center'}}>
            ✏️ Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger" style={{flex: 1, marginLeft: '0.5rem'}}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;