import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: "",
        usersInDataBase: [],
        token: "",
    },
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload;
        },

        registeredUsers: (state, action) => {
            state.usersInDataBase.push(action.payload);
        },

        userToken: (state, action) => {
            state.token = action.payload;
        },

        userLogout: (state) => {
            state.user = "";
            state.token = "";
        }
    }
});


export const { userLoggedIn, registeredUsers, userToken, userLogout } = userSlice.actions;

// export const selectUser = (state) => {
//     return state.user.user;
// }

export default userSlice.reducer;