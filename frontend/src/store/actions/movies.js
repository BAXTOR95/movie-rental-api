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
