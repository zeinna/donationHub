import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './EditPost.css';

const EditPost = () => {
  const { id } = useParams();
  const { posts, updatePost, user } = useApp();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));
  const [form, setForm] = useState({});

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        category: post.category,
        location: post.location,
        distance: post.distance,
        description: post.description,
        quantity: post.quantity,
      });
    }
  }, [post]);

  if (!post) return <div>Post not found</div>;
  if (!user || user.id !== post.donorId) return <div>Unauthorized to edit this post</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = { ...post, ...form, distance: parseInt(form.distance) };
    updatePost(updated);
    alert('Post updated');
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="edit-container">
      <div className="form-card">
        <h1>Edit Donation Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title || ''} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category || ''} onChange={handleChange}>
              <option>Vegetables</option>
              <option>Clothes</option>
              <option>Electronics</option>
              <option>Books</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={form.location || ''} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Distance (km)</label>
            <input name="distance" type="number" value={form.distance || ''} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input name="quantity" value={form.quantity || ''} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" value={form.description || ''} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="update-btn">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;