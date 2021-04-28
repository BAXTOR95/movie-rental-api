import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        margin: "auto",
        height: "100%",
        width: "100%",
        backgroundColor: 'rgba(255, 255, 255, .3)',
    }
}));

const BoughtMoviesList = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const boughtMovies = useSelector(state => state.movies.boughtMovies);
    const loading = useSelector(state => state.movies.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const onFetchBoughtMovies = useCallback(() => dispatch(actions.fetchBoughtMovies()), [ dispatch ]);

    useEffect(() => {
        (isAuthenticated && onFetchBoughtMovies());
    }, [ onFetchBoughtMovies, isAuthenticated ]);

    return (
        <div className={ classes.root }>

        </div>
    )
}

export default BoughtMoviesList;
