import { put, call } from 'redux-saga/effects';

import axios from '../../axios-db';
import * as actions from '../actions/index';
import { getSnackbarData } from '../../shared/utility';

export function* logoutSaga(action) {
    yield call([ localStorage, 'removeItem' ], 'access');
    yield call([ localStorage, 'removeItem' ], 'refresh');
    yield put(actions.logoutSucceed());
    yield put(actions.authUserLoadedFail());
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
        yield put(actions.authSuccess(response.data.access, response.data.refresh));
        yield put(actions.authCheckState())
    } catch (error) {
        yield call([ localStorage, 'removeItem' ], 'access');
        yield call([ localStorage, 'removeItem' ], 'refresh');
        yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.non_field_errors[ 0 ], 'error')));
        yield put(actions.authFail(error.response.data.non_field_errors[ 0 ]));
    };
}

export function* authCheckStateSaga(action) {
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
            yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.non_field_errors[ 0 ], 'error')));
            yield put(actions.authFail(error.response.data.non_field_errors[ 0 ]));
        };
    }
}