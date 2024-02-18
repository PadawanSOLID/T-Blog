import { createSlice } from "@reduxjs/toolkit";
import '../../apis/user';
import { getProfileAPI, loginAPI } from "../../apis/user";
const userStore = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token_key') || '',
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('token_key', action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
            console.log(state.userInfo);
        },
        clearUserInfo(state) {
            state.token = '';
            state.userInfo = {};
            localStorage.clear('token_key');
        }
    }
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

const userReducer = userStore.reducer

const fetchLogin = loginForm => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm);
        console.log(res);
        dispatch(setToken(res))
    }
}

const fetchUserInfo = () => {
    return async (dispatch) => {
        try {
            const res = await getProfileAPI();
            dispatch(setUserInfo(res))
        }
        catch {

            dispatch(setUserInfo({ name: 'Error' }))
        }

    }
}

export { fetchLogin, setToken, fetchUserInfo, clearUserInfo }

export default userReducer