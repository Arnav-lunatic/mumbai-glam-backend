import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserValues: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;
        },
        
        clearUserValues: (state) => {
			state.user = null;
			state.loading = false;
        }
	},
});

// Action creators are generated for each case reducer function
export const { setUserValues, clearUserValues } = userSlice.actions;

export default userSlice.reducer;
