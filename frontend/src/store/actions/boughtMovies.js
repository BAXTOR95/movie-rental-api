import * as actionTypes from './actionTypes';

export const buyMovie = (movieId) => {
    return {
        type: actionTypes.BUY_MOVIE,
        movieId: movieId
    };
};

export const buyMovieStart = () => {
    return {
        type: actionTypes.BUY_MOVIE_START
    };
};

export const buyMovieSuccess = (boughtMovie) => {
    return {
        type: actionTypes.BUY_MOVIE_SUCCESS,
        boughtMovie: boughtMovie
    };
};

export const buyMovieFail = (error) => {
    return {
        type: actionTypes.BUY_MOVIE_FAIL,
        error: error
    };
};

export const fetchBoughtMovies = () => {
    return {
        type: actionTypes.FETCH_BOUGHT_MOVIES
    };
};

export const fetchBoughtMoviesStart = () => {
    return {
        type: actionTypes.FETCH_BOUGHT_MOVIES_START
    };
};

export const fetchBoughtMoviesSuccess = (boughtMovies) => {
    return {
        type: actionTypes.FETCH_BOUGHT_MOVIES_SUCCESS,
        boughtMovies: boughtMovies
    };
};

export const fetchBoughtMoviesFail = (error) => {
    return {
        type: actionTypes.FETCH_BOUGHT_MOVIES_FAIL,
        error: error
    };
};
