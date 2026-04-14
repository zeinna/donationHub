import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Login from './components/login';
import Registration from './components/Registration';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import ClaimsHistory from './components/ClaimsHistory';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="posts" element={<PostList />} />
            <Route path="post/:id" element={<PostDetails />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="edit-post/:id" element={<EditPost />} />
            <Route path="claims" element={<ClaimsHistory />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);