import * as actionTypes from './actionTypes';

export const fetchMovieStart = () => {
    return {
        type: actionTypes.FETCH_MOVIES_START
    };
};

export const fetchMovieSuccess = (movies) => {
    return {
        type: actionTypes.FETCH_MOVIES_SUCCESS,
        movies: movies
    };
};

export const fetchMovieFail = (error) => {
    return {
        type: actionTypes.FETCH_MOVIES_FAIL,
        error: error
    };
};

export const likeMovieStart = () => {
    return {
        type: actionTypes.LIKE_MOVIE_START
    };
};

export const likeMovieSuccess = (likedMovie) => {
    return {
        type: actionTypes.LIKE_MOVIE_SUCCESS,
        likedMovie: likedMovie
    };
};

export const likeMovieFail = (error) => {
    return {
        type: actionTypes.LIKE_MOVIE_FAIL,
        error: error
    };
};

export const dislikeMovieStart = () => {
    return {
        type: actionTypes.DISLIKE_MOVIE_START
    };
};

export const dislikeMovieSuccess = () => {
    return {
        type: actionTypes.DISLIKE_MOVIE_SUCCESS
    };
};

export const dislikeMovieFail = (error) => {
    return {
        type: actionTypes.DISLIKE_MOVIE_FAIL,
        error: error
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
