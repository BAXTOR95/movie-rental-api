import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (access, refresh) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        access: access,
        refresh: refresh
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authUserLoadedSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_USER_LOADED_SUCCESS,
        payload: payload
    };
};

export const authUserLoadedFail = () => {
    return {
        type: actionTypes.AUTH_USER_LOADED_FAIL,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
};