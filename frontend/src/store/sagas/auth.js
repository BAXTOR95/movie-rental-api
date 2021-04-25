import { put, call } from 'redux-saga/effects';

import axios from '../../axios-db';
import * as actions from '../actions/index';
import { getSnackbarData } from '../../shared/utility';

export function* logoutSaga(action) {
    yield call([ localStorage, 'removeItem' ], 'access');
    yield call([ localStorage, 'removeItem' ], 'refresh');
    yield call([ localStorage, 'removeItem' ], 'rememberMe');
    yield put(actions.logoutSucceed());
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        email: action.email,
        password: action.password,
    });
    const url = '/auth/jwt/create/';

    try {
        let response = yield axios.post(url, body, config)
        yield localStorage.setItem('access', response.data.access);
        yield localStorage.setItem('refresh', response.data.refresh);
        yield localStorage.setItem('rememberMe', action.rememberMe);
        yield put(actions.authSuccess(response.data.access, response.data.refresh, action.rememberMe));
        yield put(actions.authLoadUser());
    } catch (error) {
        yield call([ localStorage, 'removeItem' ], 'access');
        yield call([ localStorage, 'removeItem' ], 'refresh');
        yield call([ localStorage, 'removeItem' ], 'rememberMe');
        yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
        yield put(actions.authFail(error.response.data.detail));
    };
};

export function* authLoadUserSaga(action) {
    const access = yield localStorage.getItem('access');
    if (!access) {
        yield put(actions.logout());
        yield put(actions.authUserLoadedFail());
    } else {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access }`,
                'Accept': 'application/json'
            }
        };
        const url = '/auth/users/me/';
        try {
            let response = yield axios.get(url, config)
            yield put(actions.authUserLoadedSuccess(response.data));
        } catch (error) {
            yield put(actions.logout());
            yield put(actions.authUserLoadedFail());
            yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
            yield put(actions.authFail(error.response.data.detail));
        };
    }
};

export function* authCheckStateSaga(action) {
    const access = yield localStorage.getItem('access');
    const refresh = yield localStorage.getItem('refresh');
    const rememberMe = yield localStorage.getItem('rememberMe');
    if (access) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        let body = JSON.stringify({ token: access })

        try {
            let response = yield axios.post('/auth/jwt/verify/', body, config)

            if (response.data.code !== 'token_not_valid') {
                yield put(actions.authSuccess(access, refresh, rememberMe));
                yield put(actions.authLoadUser());
            } else {
                if (rememberMe && refresh) {
                    body = JSON.stringify({ refresh: refresh });
                    response = yield axios.post('/auth/jwt/refresh/', body, config);
                    yield put(actions.authSuccess(response.data.access, response.data.refresh, rememberMe));
                    yield put(actions.authLoadUser());
                } else {
                    yield put(actions.logout());
                    yield put(actions.authUserLoadedFail());
                }
            }
        } catch (error) {
            yield put(actions.logout());
            yield put(actions.authUserLoadedFail());
            yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
            yield put(actions.authFail(error.response.data.detail));
        }
    } else {
        yield put(actions.logout());
        yield put(actions.authUserLoadedFail());
    }
};

export function* authPasswordResetSaga(action) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({ email: action.email });

    try {
        yield axios.post('/auth/users/reset_password/', body, config);
        yield put(actions.authPasswordResetSuccess());
    } catch (error) {
        yield put(actions.authPasswordResetFail());
    };
};

export function* authPasswordResetConfirmSaga(action) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({
        uid: action.uid,
        token: action.token,
        new_password: action.new_password,
        re_new_password: action.re_new_password
    });

    try {
        yield axios.post('/auth/users/reset_password_confirm/', body, config);
        yield put(actions.authPasswordResetConfirmSuccess());
    } catch (error) {
        yield put(actions.authPasswordResetConfirmFail());
    }
}