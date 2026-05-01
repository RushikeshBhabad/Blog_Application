import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/');
      setPosts(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeleteClient = (id) => {
    setPosts(posts.filter(p => p._id !== id));
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) || 
    post.author.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div>
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
      
      <div className="search-bar">
        <h2>Latest Posts ({filteredPosts.length})</h2>
        <input 
          type="text" 
          placeholder="Search by title or author..." 
          className="form-control search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <h3>No posts yet. Be the first to write!</h3>
          <Link to="/create" className="btn btn-primary mt-4">Create Post</Link>
        </div>
      ) : (
        <div className="post-grid">
          {filteredPosts.map(post => (
            <PostCard key={post._id} post={post} onDelete={handleDeleteClient} />
          ))}
        </div>
      )}
      
      {posts.length > 0 && filteredPosts.length === 0 && (
         <div className="text-center py-8">
            <h3>No results found for "{search}"</h3>
         </div>
      )}
    </div>
  );
};

export default Home;