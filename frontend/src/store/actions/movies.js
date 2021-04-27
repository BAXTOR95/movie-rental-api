import * as actionTypes from './actionTypes';

export const fetchMovies = () => {
    return {
        type: actionTypes.FETCH_MOVIES
    };
};

export const fetchMoviesStart = () => {
    return {
        type: actionTypes.FETCH_MOVIES_START
    };
};

export const fetchMoviesSuccess = (movies) => {
    return {
        type: actionTypes.FETCH_MOVIES_SUCCESS,
        movies: movies
    };
};

export const fetchMoviesFail = (error) => {
    return {
        type: actionTypes.FETCH_MOVIES_FAIL,
        error: error
    };
};

export const likeMovie = (movieId) => {
    return {
        type: actionTypes.LIKE_MOVIE,
        movieId: movieId
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

export const dislikeMovie = (movieId) => {
    return {
        type: actionTypes.DISLIKE_MOVIE,
        movieId: movieId
    };
};

export const dislikeMovieStart = () => {
    return {
        type: actionTypes.DISLIKE_MOVIE_START
    };
};

export const dislikeMovieSuccess = (movieId) => {
    return {
        type: actionTypes.DISLIKE_MOVIE_SUCCESS,
        movieId: movieId
    };
};

export const dislikeMovieFail = (error) => {
    return {
        type: actionTypes.DISLIKE_MOVIE_FAIL,
        error: error
    };
};

export const fetchLikedMovies = () => {
    return {
        type: actionTypes.FETCH_LIKED_MOVIES
    };
};

export const fetchLikedMoviesStart = () => {
    return {
        type: actionTypes.FETCH_LIKED_MOVIES_START
    };
};

export const fetchLikedMoviesSuccess = (likedMovies) => {
    return {
        type: actionTypes.FETCH_LIKED_MOVIES_SUCCESS,
        likedMovies: likedMovies
    };
};

export const fetchLikedMoviesFail = (error) => {
    return {
        type: actionTypes.FETCH_LIKED_MOVIES_FAIL,
        error: error
    };
};

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
