import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, authUserSaga, authLoadUserSaga, authCheckStateSaga, authPasswordResetSaga, authPasswordResetConfirmSaga } from './auth';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_LOAD_USER, authLoadUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.AUTH_PASSWORD_RESET, authPasswordResetSaga),
        takeEvery(actionTypes.AUTH_PASSWORD_RESET_CONFIRM, authPasswordResetConfirmSaga),
    ]);
}
