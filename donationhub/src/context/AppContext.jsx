import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

// Mock initial posts
const initialPosts = [
  {
    id: 1,
    title: "Fresh Vegetables & Fruits Basket",
    donorName: "Mohamed Ali",
    donorId: 101,
    location: "Nasr City",
    distance: 5,
    createdAt: "2025-04-13T10:00:00Z",
    description: "Fresh organic vegetables and seasonal fruits, ready for pickup",
    category: "Vegetables",
    quantity: "75 kg",
    available: true,
    claimedBy: null,
  },
  {
    id: 2,
    title: "Winter Clothes Collection - Adults & Kids",
    donorName: "Fatima Ahmed",
    donorId: 102,
    location: "Maadi",
    distance: 8,
    createdAt: "2025-04-13T08:00:00Z",
    description: "Winter jackets, sweaters, sizes S-XXL, excellent condition",
    category: "Clothes",
    quantity: "120 pieces",
    available: true,
    claimedBy: null,
  },
  {
    id: 3,
    title: "Children's Educational Toys & Books",
    donorName: "Karim Hassan",
    donorId: 103,
    location: "Heliopolis",
    distance: 3,
    createdAt: "2025-04-12T15:00:00Z",
    description: "Educational toys for ages 3-12, Arabic and English books",
    category: "Books",
    quantity: "45 items",
    available: true,
    claimedBy: null,
  },
  {
    id: 4,
    title: "Used Laptops & Tablets",
    donorName: "Layla Mahmoud",
    donorId: 104,
    location: "Dokki",
    distance: 12,
    createdAt: "2025-04-10T09:00:00Z",
    description: "Working laptops and tablets, suitable for online learning",
    category: "Electronics",
    quantity: "8 devices",
    available: false,
    claimedBy: 201, // already claimed by some user
  },
];

// Mock claims history
const initialClaims = [
  {
    id: 1,
    postId: 4,
    item: "Used Laptops & Tablets",
    quantity: "1 device",
    donor: "Layla Mahmoud",
    status: "confirmed",
    claimDate: "2025-04-11",
  },
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem('donation_posts');
    return stored ? JSON.parse(stored) : initialPosts;
  });
  const [claims, setClaims] = useState(() => {
    const stored = localStorage.getItem('user_claims');
    return stored ? JSON.parse(stored) : initialClaims;
  });

  // Save to localStorage whenever posts or claims change
  useEffect(() => {
    localStorage.setItem('donation_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('user_claims', JSON.stringify(claims));
  }, [claims]);

  const login = (userData) => {
    setUser(userData);
    // If user is a charity, we might filter claims to only theirs; but for demo we store all claims per user
    // For simplicity, we store claims array for each user? We'll just use global claims and filter by userId later.
    // We'll add userId to each claim. Adjust later.
  };

  const logout = () => {
    setUser(null);
  };

  const addPost = (newPost) => {
    setPosts(prev => [{ ...newPost, id: Date.now() }, ...prev]);
  };

  const updatePost = (updatedPost) => {
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const addClaim = (claim) => {
    setClaims(prev => [claim, ...prev]);
    // Also update the post to mark as claimed or partially claimed
    setPosts(prev => prev.map(p => 
      p.id === claim.postId ? { ...p, available: false, claimedBy: claim.userId } : p
    ));
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      posts, addPost, updatePost, deletePost,
      claims, addClaim,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);