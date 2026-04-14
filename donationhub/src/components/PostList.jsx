import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './PostList.css';

const PostList = () => {
  const { posts } = useApp();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = posts.filter(post => {
    if (category !== 'all' && post.category !== category) return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="postlist-container">
      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
        </select>
      </div>
      <div className="posts-grid">
        {filtered.map(post => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p className="post-meta">By {post.donorName} • {post.location} ({post.distance} km)</p>
            <p className="post-description">{post.description.substring(0, 100)}...</p>
            <div className="post-footer">
              <span className={`status ${post.available ? 'available' : 'claimed'}`}>
                {post.available ? 'Available' : 'Claimed'}
              </span>
              <Link to={`/post/${post.id}`} className="view-link">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;