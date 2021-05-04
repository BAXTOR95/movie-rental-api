import * as actionTypes from './actionTypes';

export const fetchMovieDetails = (movieId) => {
    return {
        type: actionTypes.FETCH_MOVIE_DETAILS,
        movieId: movieId
    };
};

export const fetchMovieDetailsStart = () => {
    return {
        type: actionTypes.FETCH_MOVIE_DETAILS_START
    };
};

export const fetchMovieDetailsSuccess = (movie) => {
    return {
        type: actionTypes.FETCH_MOVIE_DETAILS_SUCCESS,
        movie: movie
    };
};

export const fetchMovieDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_MOVIE_DETAILS_FAIL,
        error: error
    };
};
