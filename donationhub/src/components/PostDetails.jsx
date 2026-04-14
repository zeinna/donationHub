import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './PostDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const { posts, user, addClaim } = useApp();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <div className="not-found">Post not found</div>;

  const handleClaim = () => {
    if (!user) {
      alert('Please login to claim this item');
      navigate('/login');
      return;
    }
    if (user.role === 'donor') {
      alert('Donors cannot claim items, only charities/individuals can claim.');
      return;
    }
    const newClaim = {
      id: Date.now(),
      postId: post.id,
      item: post.title,
      quantity: post.quantity,
      donor: post.donorName,
      status: 'pending',
      claimDate: new Date().toISOString().split('T')[0],
      userId: user.id,
    };
    addClaim(newClaim);
    alert('Claim request sent! Awaiting donor confirmation.');
    navigate('/claims');
  };

  return (
    <div className="details-container">
      <div className="details-card">
        <h1>{post.title}</h1>
        <div className="details-meta">
          <span>📦 Category: {post.category}</span>
          <span>📍 {post.location} ({post.distance} km)</span>
          <span>👤 Donor: {post.donorName}</span>
          <span>📅 Posted: {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="details-description">{post.description}</p>
        <p className="details-quantity">Quantity: {post.quantity}</p>
        <div className="details-actions">
          {post.available ? (
            <button onClick={handleClaim} className="claim-now-btn">Claim Now</button>
          ) : (
            <span className="claimed-badge">Already Claimed</span>
          )}
          {user && user.id === post.donorId && (
            <button onClick={() => navigate(`/edit-post/${post.id}`)} className="edit-btn">Edit Post</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;