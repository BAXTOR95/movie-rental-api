import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (access, refresh, rememberMe) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        access: access,
        refresh: refresh,
        rememberMe: rememberMe
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

export const auth = (email, password, rememberMe) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        rememberMe: rememberMe
    }
};

export const authLoadUser = () => {
    return {
        type: actionTypes.AUTH_LOAD_USER
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

export const authRememberMe = (rememberMe) => {
    return {
        type: actionTypes.AUTH_REMEMBER_ME,
        rememberMe: rememberMe
    }
}