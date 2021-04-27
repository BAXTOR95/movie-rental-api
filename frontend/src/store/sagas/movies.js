import { put } from 'redux-saga/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export function* fetchMoviesSaga(action) {
    yield put(actions.fetchMoviesStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${ access }` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/movie/movies/';
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchMoviesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchMoviesFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('Could not fetch movie list', 'error')));
    };
};

export function* likeMovieSaga(action) {
    yield put(actions.likeMovieStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${ access }`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({ movie: action.movieId });
    const url = '/movie/likes/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.likeMovieSuccess(response.data));
    } catch (error) {
        yield put(actions.likeMovieFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('Could not like the movie', 'error')));
    };
};

export function* dislikeMovieSaga(action) {
    yield put(actions.dislikeMovieStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${ access }`,
            'Accept': 'application/json'
        }
    };
    const url = `/movie/likes/${ action.movieId }/`;
    try {
        yield axios.delete(url, config);
        yield put(actions.dislikeMovieSuccess(action.movieId));
    } catch (error) {
        yield put(actions.dislikeMovieFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('Could not dislike the movie', 'error')));
    };
};

export function* fetchLikedMoviesSaga(action) {
    yield put(actions.fetchLikedMoviesStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${ access }`,
            'Accept': 'application/json'
        }
    };
    const url = '/movie/likes/';
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchLikedMoviesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchLikedMoviesFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('Could not fetch liked movie list', 'error')));
    };
};

export function* rentMovieSaga(action) {
    yield put(actions.rentMovieStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${ access }`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({ movie: action.movieId });
    const url = '/movie/rentals/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.rentMovieSuccess(response.data));
    } catch (error) {
        yield put(actions.rentMovieFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('Could not rent the movie', 'error')));
    };
};

export function* returnRentedMoviesSaga(action) {
    yield put(actions.returnRentedMoviesStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${ access }`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({ movie: action.movieId });
    const url = `/movie/rentals/${ action.movieId }/return-movie/`;
    try {
        const response = yield axios.post(url, body, config);
        yield put(actions.returnRentedMoviesSuccess(response.data));
    } catch (error) {
        yield put(actions.returnRentedMoviesFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('Could not return rented movie', 'error')));
    };
};

export function* fetchRentedMoviesSaga(action) {
    yield put(actions.fetchRentedMoviesStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${ access }`,
            'Accept': 'application/json'
        }
    };
    const url = '/movie/rentals/';
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchRentedMoviesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchRentedMoviesFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('Could not fetch rented movie list', 'error')));
    };
};

export function* buyMovieSaga(action) {
    yield put(actions.buyMovieStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${ access }`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({ movie: action.movieId });
    const url = '/movie/purchases/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.buyMovieSuccess(response.data));
    } catch (error) {
        yield put(actions.buyMovieFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('Could not buy the movie', 'error')));
    };
};

export function* fetchBoughtMoviesSaga(action) {
    yield put(actions.fetchBoughtMoviesStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${ access }`,
            'Accept': 'application/json'
        }
    };
    const url = '/movie/purchases/';
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchBoughtMoviesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBoughtMoviesFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('Could not fetch rented movie list', 'error')));
    };
};