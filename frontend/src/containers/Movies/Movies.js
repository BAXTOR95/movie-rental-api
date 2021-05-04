import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiTypography from '@material-ui/core/Typography';

import Notifier from '../../components/Notifier/Notifier';
import MoviesList from '../../components/Movies/MoviesList/MoviesList';
import MovieDetail from '../../components/Movies/MovieDetail/MovieDetail';
import RentedMoviesList from '../../components/Movies/RentedMoviesList/RentedMoviesList';
import BoughtMoviesList from '../../components/Movies/BoughtMoviesList/BoughtMoviesList';

const Accordion = withStyles({
    root: {
        backgroundColor: 'rgb(0, 0, 0)',
        border: '1px solid rgba(255, 255, 255, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(255, 255, 255, .3)',
        borderBottom: '1px solid rgba(255, 255, 255 .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const Typography = withStyles((theme) => ({
    root: {
        color: theme.palette.common.white
    }
}))(MuiTypography);

export const Movies = props => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const movieData = useSelector(state => state.movieDetails.movieData);
    const boughtMovies = useSelector(state => state.boughtMovies.boughtMovies);
    const rentedMovies = useSelector(state => state.rentedMovies.rentedMovies);
    const [ expanded, setExpanded ] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <React.Fragment>
            <Notifier />
            <Grid container spacing={ 1 }>
                <Grid item xs={ 12 } sm>
                    <MoviesList />
                </Grid>
                <Grid item xs={ 12 } sm>
                    <Accordion square expanded={ expanded === 'panel1' } onChange={ handleChange('panel1') }>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Movie Detail</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Route
                                path={ '/:movieId' }
                                component={ MovieDetail } />
                            { !isAuthenticated && !movieData && <Typography>Select a movie to see it's details</Typography> }
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={ expanded === 'panel2' } onChange={ handleChange('panel2') }>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Rented Movies</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <RentedMoviesList />
                            { !isAuthenticated && !rentedMovies && <Typography>Login to see the list of rented movies</Typography> }
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={ expanded === 'panel3' } onChange={ handleChange('panel3') }>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Bought Movies</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <BoughtMoviesList />
                            { !isAuthenticated && !boughtMovies && <Typography>Login to see the list of bought movies</Typography> }
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Movies;