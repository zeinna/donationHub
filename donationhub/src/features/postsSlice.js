import { createSlice } from '@reduxjs/toolkit';

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

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      return state.filter(post => post.id !== action.payload);
    },
    claimPost: (state, action) => {
      const index = state.findIndex(post => post.id === action.payload.postId);
      if (index !== -1) {
        state[index].available = false;
        state[index].claimedBy = action.payload.userId;
      }
    },
  },
});

export const { addPost, updatePost, deletePost, claimPost } = postsSlice.actions;
export default postsSlice.reducer;