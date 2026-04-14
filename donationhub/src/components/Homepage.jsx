import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Homepage.css';

const Homepage = () => {
  const posts = useSelector((state) => state.posts);
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="homepage-container">
      <div className="hero">
        <h1>Welcome to DonationHub</h1>
        <p>Connecting donors with charities and people in need</p>
        <Link to="/posts" className="cta-button">Browse Donations</Link>
      </div>
      <div className="featured-section">
        <h2>Recent Donations</h2>
        <div className="featured-grid">
          {recentPosts.map(post => (
            <div key={post.id} className="featured-card">
              <h3>{post.title}</h3>
              <p>{post.description.substring(0, 80)}...</p>
              <Link to={`/post/${post.id}`}>View Details →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;