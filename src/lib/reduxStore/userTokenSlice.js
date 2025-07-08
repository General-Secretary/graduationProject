import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchUserToken = createAsyncThunk("user/fetchUserToken", async () => {
    const res = await fetch("/api/auth/getToken");
    const data = await res.json();
    console.log("Fetched user token from API:", data.token);
    return data.token || null;
});

const userTokenSlice = createSlice({
    name: "token",
    initialState: { token: null }, 
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        clearUserToken: (state) => {
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserToken.fulfilled, (state, action) => {
            state.token = action.payload;
        });
    },
});

export const { setUserToken, clearUserToken } = userTokenSlice.actions;
export default userTokenSlice.reducer;
