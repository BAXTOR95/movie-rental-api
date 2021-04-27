import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    logoutSaga,
    authUserSaga,
    authLoadUserSaga,
    authUserSignUpSaga,
    authCheckStateSaga,
    authPasswordResetSaga,
    authUserActivationSaga,
    authPasswordResetConfirmSaga,
} from './auth';

import {
    fetchMoviesSaga,
    likeMovieSaga,
    dislikeMovieSaga,
    fetchLikedMoviesSaga,
    rentMovieSaga,
    returnRentedMoviesSaga,
    fetchRentedMoviesSaga,
    buyMovieSaga,
    fetchBoughtMoviesSaga
} from './movies';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_USER_SIGNUP, authUserSignUpSaga),
        takeEvery(actionTypes.AUTH_USER_ACTIVATION, authUserActivationSaga),
        takeEvery(actionTypes.AUTH_LOAD_USER, authLoadUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.AUTH_PASSWORD_RESET, authPasswordResetSaga),
        takeEvery(actionTypes.AUTH_PASSWORD_RESET_CONFIRM, authPasswordResetConfirmSaga),
    ]);
};

export function* watchMovies() {
    yield all([
        takeEvery(actionTypes.FETCH_MOVIES, fetchMoviesSaga),
        takeLatest(actionTypes.LIKE_MOVIE, likeMovieSaga),
        takeLatest(actionTypes.DISLIKE_MOVIE, dislikeMovieSaga),
        takeEvery(actionTypes.FETCH_LIKED_MOVIES, fetchLikedMoviesSaga),
        takeEvery(actionTypes.RENT_MOVIE, rentMovieSaga),
        takeEvery(actionTypes.RETURN_RENTED_MOVIES, returnRentedMoviesSaga),
        takeEvery(actionTypes.FETCH_RENTED_MOVIES, fetchRentedMoviesSaga),
        takeEvery(actionTypes.BUY_MOVIE, buyMovieSaga),
        takeEvery(actionTypes.FETCH_BOUGHT_MOVIES, fetchBoughtMoviesSaga),
    ]);
};