import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    boughtMovies: [],
    error: null,
    loading: false
};

const buyMovieStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const buyMovieSuccess = (state, action) => {
    const updatedBoughtMovies = state.boughtMovies.concat(action.boughtMovie);
    const updatedState = {
        boughtMovies: updatedBoughtMovies,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const buyMovieFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchBoughtMoviesStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBoughtMoviesSuccess = (state, action) => {
    return updateObject(state, {
        boughtMovies: action.boughtMovies,
        error: null,
        loading: false
    });
};

const fetchBoughtMoviesFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BUY_MOVIE_START: return buyMovieStart(state, action);
        case actionTypes.BUY_MOVIE_SUCCESS: return buyMovieSuccess(state, action);
        case actionTypes.BUY_MOVIE_FAIL: return buyMovieFail(state, action);
        case actionTypes.FETCH_BOUGHT_MOVIES_START: return fetchBoughtMoviesStart(state, action);
        case actionTypes.FETCH_BOUGHT_MOVIES_SUCCESS: return fetchBoughtMoviesSuccess(state, action);
        case actionTypes.FETCH_BOUGHT_MOVIES_FAIL: return fetchBoughtMoviesFail(state, action);
        default: return state;
    };
};

export default reducer;