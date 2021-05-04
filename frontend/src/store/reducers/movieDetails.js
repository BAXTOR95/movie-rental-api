import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    movieData: null,
    error: null,
    loading: false
};

const fetchMovieDetailsStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchMovieDetailsSuccess = (state, action) => {
    return updateObject(state, {
        movieData: action.movie,
        error: null,
        loading: false
    });
};

const fetchMovieDetailsFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIE_DETAILS_START: return fetchMovieDetailsStart(state, action);
        case actionTypes.FETCH_MOVIE_DETAILS_SUCCESS: return fetchMovieDetailsSuccess(state, action);
        case actionTypes.FETCH_MOVIE_DETAILS_FAIL: return fetchMovieDetailsFail(state, action);
        default: return state;
    };
};

export default reducer;