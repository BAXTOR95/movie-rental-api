import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    movies: null,
    likedMovies: [],
    error: null,
    loading: false
};

const fetchMoviesStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchMoviesSuccess = (state, action) => {
    return updateObject(state, {
        movies: action.movies,
        error: null,
        loading: false
    });
};

const fetchMoviesFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const likeMovieStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const likedMovieSuccess = (state, action) => {
    const updatedLikedMovies = state.likedMovies.concat(action.likedMovie);
    const updatedState = {
        likedMovies: updatedLikedMovies,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const likedMovieFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const dislikeMovieStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const dislikeMovieSuccess = (state, action) => {
    const updatedLikedMovies = [ ...state.likedMovies ].filter(movieLiked => {
        return movieLiked.id !== action.movieId
    });
    const updatedState = {
        likedMovies: updatedLikedMovies,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const dislikeMovieFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchLikedMoviesStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchLikedMoviesSuccess = (state, action) => {
    return updateObject(state, {
        likedMovies: action.likedMovies,
        error: null,
        loading: false
    });
};

const fetchLikedMoviesFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIES_START: return fetchMoviesStart(state, action);
        case actionTypes.FETCH_MOVIES_SUCCESS: return fetchMoviesSuccess(state, action);
        case actionTypes.FETCH_MOVIES_FAIL: return fetchMoviesFail(state, action);
        case actionTypes.LIKE_MOVIE_START: return likeMovieStart(state, action);
        case actionTypes.LIKE_MOVIE_SUCCESS: return likedMovieSuccess(state, action);
        case actionTypes.LIKE_MOVIE_FAIL: return likedMovieFail(state, action);
        case actionTypes.DISLIKE_MOVIE_START: return dislikeMovieStart(state, action);
        case actionTypes.DISLIKE_MOVIE_SUCCESS: return dislikeMovieSuccess(state, action);
        case actionTypes.DISLIKE_MOVIE_FAIL: return dislikeMovieFail(state, action);
        case actionTypes.FETCH_LIKED_MOVIES_START: return fetchLikedMoviesStart(state, action);
        case actionTypes.FETCH_LIKED_MOVIES_SUCCESS: return fetchLikedMoviesSuccess(state, action);
        case actionTypes.FETCH_LIKED_MOVIES_FAIL: return fetchLikedMoviesFail(state, action);
        default: return state;
    };
};

export default reducer;