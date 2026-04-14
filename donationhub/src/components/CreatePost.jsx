import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../features/postsSlice';
import './CreatePost.css';

const CreatePost = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    category: 'Vegetables',
    location: '',
    distance: 5,
    description: '',
    quantity: '',
  });

  if (!user || user.role !== 'donor') {
    return <div className="unauthorized">Only donors can create posts. Please login as donor.</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title: form.title,
      donorName: user.name,
      donorId: user.id,
      location: form.location,
      distance: parseInt(form.distance),
      createdAt: new Date().toISOString(),
      description: form.description,
      category: form.category,
      quantity: form.quantity,
      available: true,
      claimedBy: null,
    };
    dispatch(addPost(newPost));
    alert('Post created successfully!');
    navigate('/posts');
  };

  return (
    <div className="create-container">
      <div className="form-card">
        <h1>Create Donation Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option>Vegetables</option>
              <option>Clothes</option>
              <option>Electronics</option>
              <option>Books</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Distance (km)</label>
            <input name="distance" type="number" value={form.distance} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Quantity (e.g., 10 kg, 5 items)</label>
            <input name="quantity" value={form.quantity} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" value={form.description} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="submit-btn">Publish Donation</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;