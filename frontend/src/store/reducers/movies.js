import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    movies: {},
    rentedMovies: [],
    purchasedMovies: [],
    likedMovies: [],
    error: null,
    loading: false
};

const fetchMovieStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchMovieSuccess = (state, action) => {
    return updateObject(state, {
        movies: action.movies,
        error: null,
        loading: false
    });
};

const fetchMovieFail = (state, action) => {
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

const rentMovieStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const rentMovieSuccess = (state, action) => {
    const updatedRentedMovies = state.rentedMovies.concat(action.movieRented);
    const updatedState = {
        rentedMovies: updatedRentedMovies,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const rentMovieFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const returnRentedMoviesStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const returnRentedMoviesSuccess = (state, action) => {
    const updatedRentedMovies = [ ...state.rentedMovies ].filter(movieReturned => {
        return movieReturned.id !== action.movieId
    });
    const updatedState = {
        rentedMovies: updatedRentedMovies,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const returnRentedMoviesFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchRentedMoviesStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchRentedMoviesSuccess = (state, action) => {
    return updateObject(state, {
        rentedMovies: action.rentedMovies,
        error: null,
        loading: false
    });
};

const fetchRentedMoviesFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
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
        case actionTypes.FETCH_MOVIES_START: return fetchMovieStart(state, action);
        case actionTypes.FETCH_MOVIES_SUCCESS: return fetchMovieSuccess(state, action);
        case actionTypes.FETCH_MOVIES_FAIL: return fetchMovieFail(state, action);
        case actionTypes.LIKE_MOVIE_START: return likeMovieStart(state, action);
        case actionTypes.LIKE_MOVIE_SUCCESS: return likedMovieSuccess(state, action);
        case actionTypes.LIKE_MOVIE_FAIL: return likedMovieFail(state, action);
        case actionTypes.DISLIKE_MOVIE_START: return dislikeMovieStart(state, action);
        case actionTypes.DISLIKE_MOVIE_SUCCESS: return dislikeMovieSuccess(state, action);
        case actionTypes.DISLIKE_MOVIE_FAIL: return dislikeMovieFail(state, action);
        case actionTypes.RENT_MOVIE_START: return rentMovieStart(state, action);
        case actionTypes.RENT_MOVIE_SUCCESS: return rentMovieSuccess(state, action);
        case actionTypes.RENT_MOVIE_FAIL: return rentMovieFail(state, action);
        case actionTypes.RETURN_RENTED_MOVIES_START: return returnRentedMoviesStart(state, action);
        case actionTypes.RETURN_RENTED_MOVIES_SUCCESS: return returnRentedMoviesSuccess(state, action);
        case actionTypes.RETURN_RENTED_MOVIES_FAIL: return returnRentedMoviesFail(state, action);
        case actionTypes.FETCH_RENTED_MOVIES_START: return fetchRentedMoviesStart(state, action);
        case actionTypes.FETCH_RENTED_MOVIES_SUCCESS: return fetchRentedMoviesSuccess(state, action);
        case actionTypes.FETCH_RENTED_MOVIES_FAIL: return fetchRentedMoviesFail(state, action);
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