import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    rentedMovies: [],
    error: null,
    loading: false
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
    const returnedMovie = action.returnedMovie
    const index = state.rentedMovies.findIndex((rentedMovie) => rentedMovie.id === returnedMovie.id);
    const updatedRentedMovies = [ ...state.rentedMovies ];
    updatedRentedMovies[ index ] = returnedMovie;
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENT_MOVIE_START: return rentMovieStart(state, action);
        case actionTypes.RENT_MOVIE_SUCCESS: return rentMovieSuccess(state, action);
        case actionTypes.RENT_MOVIE_FAIL: return rentMovieFail(state, action);
        case actionTypes.RETURN_RENTED_MOVIES_START: return returnRentedMoviesStart(state, action);
        case actionTypes.RETURN_RENTED_MOVIES_SUCCESS: return returnRentedMoviesSuccess(state, action);
        case actionTypes.RETURN_RENTED_MOVIES_FAIL: return returnRentedMoviesFail(state, action);
        case actionTypes.FETCH_RENTED_MOVIES_START: return fetchRentedMoviesStart(state, action);
        case actionTypes.FETCH_RENTED_MOVIES_SUCCESS: return fetchRentedMoviesSuccess(state, action);
        case actionTypes.FETCH_RENTED_MOVIES_FAIL: return fetchRentedMoviesFail(state, action);
        default: return state;
    };
};

export default reducer;