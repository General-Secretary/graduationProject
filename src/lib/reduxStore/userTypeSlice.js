import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchUserRole = createAsyncThunk("user/fetchUserRole", async () => {
    const res = await fetch("/api/auth/getToken");
    const data = await res.json();
    console.log("Fetched user role from API:", data.role);
    return data.role || null;
});

const userTypeSlice = createSlice({
    name: "user",
    initialState: { role: null }, 
    reducers: {
        setUserRole: (state, action) => {
            state.role = action.payload;
        },
        clearUserRole: (state) => {
            state.role = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserRole.fulfilled, (state, action) => {
            state.role = action.payload;
        });
    },
});

export const { setUserRole, clearUserRole } = userTypeSlice.actions;
export default userTypeSlice.reducer;
