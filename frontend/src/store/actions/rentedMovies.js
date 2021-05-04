import * as actionTypes from './actionTypes';

export const rentMovie = (movieId) => {
    return {
        type: actionTypes.RENT_MOVIE,
        movieId: movieId
    };
};

export const rentMovieStart = () => {
    return {
        type: actionTypes.RENT_MOVIE_START
    };
};

export const rentMovieSuccess = (movieRented) => {
    return {
        type: actionTypes.RENT_MOVIE_SUCCESS,
        movieRented: movieRented
    };
};

export const rentMovieFail = (error) => {
    return {
        type: actionTypes.RENT_MOVIE_FAIL,
        error: error
    };
};

export const returnRentedMovies = (movieId) => {
    return {
        type: actionTypes.RETURN_RENTED_MOVIES,
        movieId: movieId
    };
};

export const returnRentedMoviesStart = () => {
    return {
        type: actionTypes.RETURN_RENTED_MOVIES_START
    };
};

export const returnRentedMoviesSuccess = (returnedMovie) => {
    return {
        type: actionTypes.RETURN_RENTED_MOVIES_SUCCESS,
        returnedMovie: returnedMovie
    };
};

export const returnRentedMoviesFail = (error) => {
    return {
        type: actionTypes.RETURN_RENTED_MOVIES_FAIL,
        error: error
    };
};

export const fetchRentedMovies = () => {
    return {
        type: actionTypes.FETCH_RENTED_MOVIES
    };
};

export const fetchRentedMoviesStart = () => {
    return {
        type: actionTypes.FETCH_RENTED_MOVIES_START
    };
};

export const fetchRentedMoviesSuccess = (rentedMovies) => {
    return {
        type: actionTypes.FETCH_RENTED_MOVIES_SUCCESS,
        rentedMovies: rentedMovies
    };
};

export const fetchRentedMoviesFail = (error) => {
    return {
        type: actionTypes.FETCH_RENTED_MOVIES_FAIL,
        error: error
    };
};