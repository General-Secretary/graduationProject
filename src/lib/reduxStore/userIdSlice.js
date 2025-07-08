import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchUserId = createAsyncThunk("user/fetchUserId", async () => {
    const res = await fetch("/api/auth/getToken");
    const data = await res.json();
    console.log("Fetched user id from API:", data.id);
    return data.id || null;
});

const userIdSlice = createSlice({
    name: "id",
    initialState: { id: null }, 
    reducers: {
        setUserid: (state, action) => {
            state.id = action.payload;
        },
        clearUserid: (state) => {
            state.id = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserId.fulfilled, (state, action) => {
            state.id = action.payload;
        });
    },
});

export const { setUserid, clearUserid } = userIdSlice.actions;
export default userIdSlice.reducer;
