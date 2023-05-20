import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Grid,
    TextField,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
} from "@material-ui/core";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import * as actions from '../../../store/actions/index';
import { toFirstCharUppercase, handleLikedMovie } from "../../../shared/utility";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.common.black,
    },
    searchContainerBar: {
        backgroundColor: 'rgba(255, 255, 255, .3)',
        height: "56px",
    },
    bottomContainerBar: {
        backgroundColor: 'rgba(255, 255, 255, .3)',
        color: theme.palette.common.white,
        height: "56px",
        textAlign: "right",
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    gridListTitle: {
        width: '100%',
        minHeight: '300px',
        minWidth: '150px',
        height: '50% !important'
    },
    gridListTitleBar: {
        backgroundColor: 'rgba(206, 206, 206, .8)'
    },
    gridList: {
        width: "100%",
        height: "84vh",
    },
    searchContainer: {
        display: "flex",
        marginLeft: "5%",
        width: "100%",
        color: theme.palette.common.white,
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    }
}));

const StyledTextField = withStyles((theme) => ({
    root: {
        width: "200px",
        margin: "5px",
        "& .MuiInputBase-root": {
            color: theme.palette.common.white,
        }
    }
}))(TextField);

const StyledIconButton = withStyles((theme) => ({
    colorPrimary: {
        color: 'rgba(255, 0, 47, 1)',
    },
    colorSecondary: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
}))(IconButton);

const MoviesList = (props) => {
    const classes = useStyles();
    const [ filter, setFilter ] = useState("");
    const history = useHistory();

    const dispatch = useDispatch();

    const movies = useSelector(state => state.movies.movies);
    const loading = useSelector(state => state.movies.loading);
    const likedMovies = useSelector(state => state.movies.likedMovies);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const onLikeMovie = useCallback((movieId) => dispatch(actions.likeMovie(movieId)), [ dispatch ]);
    const onDislikeMovie = useCallback((movieId) => dispatch(actions.dislikeMovie(movieId)), [ dispatch ]);
    const onFetchMovies = useCallback(() => dispatch(actions.fetchMovies()), [ dispatch ]);
    const onFetchLikedMovies = useCallback(() => dispatch(actions.fetchLikedMovies()), [ dispatch ]);

    useEffect(() => {
        onFetchMovies();
        (isAuthenticated && onFetchLikedMovies());
    }, [ onFetchMovies, isAuthenticated, onFetchLikedMovies ]);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const getMovieCard = movie => {
        const {
            id,
            title,
            image,
            stock,
            likes
        } = movie;

        return (
            <GridListTile onClick={ () => history.push(`/${ id }`) } key={ id } className={ classes.gridListTitle }>
                <img src={ image } alt={ title } />
                <GridListTileBar
                    title={ toFirstCharUppercase(title) }
                    subtitle={ <span>Stock: { stock } | Likes: { likes }</span> }
                    className={ classes.gridListTitleBar }
                    actionIcon={
                        (
                            isAuthenticated &&
                            <StyledIconButton
                                aria-label={ `like ${ title }` }
                                color={ likedMovies.find((key) =>
                                    key.movie === id
                                ) ? "primary" : "secondary" }
                                onClick={ () => handleLikedMovie(
                                    id,
                                    likedMovies,
                                    onLikeMovie,
                                    onDislikeMovie
                                ) }>
                                <FavoriteOutlinedIcon />
                            </StyledIconButton>
                        )
                    }
                />
            </GridListTile>
        );
    };

    const getMovieCardSkeleton = (quantity) => {
        const cards = [];
        for (let i = 1;i <= quantity;i++) {
            cards.push(
                <Grid item xs key={ i }>
                    <Skeleton variant="rect" width={ 150 } height={ 160 } />
                </Grid>
            );
        }

        return cards;
    }

    return (
        <div className={ classes.root }>
            <GridList cols={ 3 } className={ classes.gridList }>
                { movies && !loading ? (
                    movies.results.map(movie =>
                        movie.title.toLowerCase().includes(filter.toLowerCase()) &&
                        getMovieCard(movie)
                    )
                ) : (
                    getMovieCardSkeleton(3)
                ) }
            </GridList>
            <AppBar position="static" className={ classes.searchContainerBar }>
                <Grid container spacing={ 1 } alignItems="flex-end" className={ classes.searchContainer }>
                    <Grid item>
                        <SearchIcon className={ classes.searchIcon } />
                    </Grid>
                    <Grid item>
                        <StyledTextField
                            onChange={ handleSearchChange }
                            className={ classes.searchInput }
                            label="Movie"
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}

export default MoviesList;