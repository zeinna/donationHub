import { createSlice } from '@reduxjs/toolkit';

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

const claimsSlice = createSlice({
  name: 'claims',
  initialState: initialClaims,
  reducers: {
    addClaim: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addClaim } = claimsSlice.actions;
export default claimsSlice.reducer;