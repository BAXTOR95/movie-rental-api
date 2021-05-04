import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Card,
    CardMedia,
    CardContent,
    Avatar,
    IconButton,
    Chip,
    List,
    ListItem,
    Divider,
    Typography,
    Grid,
    Paper,
    ButtonBase,
    Collapse,
    CardActions,
    CardActionArea,
    Button
} from '@material-ui/core';
import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as actions from '../../../store/actions/index';
import { toFirstCharUppercase, handleLikedMovie } from '../../../shared/utility';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 850,
        backgroundColor: 'rgba(255, 255, 255, .3)',
        color: theme.palette.common.white,
    },
    mediaRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 850,
        backgroundColor: 'rgba(255, 255, 255, .3)'
    },
    image: {
        width: 180,
        height: 180,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    list: {
        width: '100%',
        maxWidth: '36ch',
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

const CardHeader = withStyles((theme) => ({
    title: {
        fontSize: '2em'
    },
    subheader: {
        color: theme.palette.common.white
    }
}))(MuiCardHeader);

const ListItemText = withStyles((theme) => ({
    secondary: {
        color: theme.palette.grey[ 300 ]
    }
}))(MuiListItemText);

const StyledIconButton = withStyles((theme) => ({
    colorPrimary: {
        color: 'rgba(255, 0, 47, 1)',
    },
    colorSecondary: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
}))(IconButton);


const MovieDetail = (props) => {
    const { match } = props;
    const { params } = match;
    const { movieId } = params;
    const [ movesExpanded, setMovesExpanded ] = useState(false);

    const dispatch = useDispatch();

    const movieData = useSelector(state => state.movieDetails.movieData);
    const loading = useSelector(state => state.movieDetails.loading);
    const likedMovies = useSelector(state => state.movies.likedMovies);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const onFetchMovieDetails = useCallback(() => dispatch(actions.fetchMovieDetails(movieId)), [ dispatch, movieId ]);
    const onLikeMovie = useCallback(() => dispatch(actions.likeMovie(movieId)), [ dispatch, movieId ]);
    const onDislikeMovie = useCallback(() => dispatch(actions.dislikeMovie(movieId)), [ dispatch, movieId ]);
    const onRentMovie = useCallback(() => dispatch(actions.rentMovie(movieId)), [ dispatch, movieId ]);
    const onBuyMovie = useCallback(() => dispatch(actions.buyMovie(movieId)), [ dispatch, movieId ]);

    const classes = useStyles();

    useEffect(() => {
        onFetchMovieDetails();
    }, [ onFetchMovieDetails ]);

    const generateMovieDetailsSkeleton = () => {
        return (
            <div className={ classes.root }>
                <Paper className={ classes.paper }>
                    <Grid container spacing={ 2 }>
                        <Grid item>
                            <ButtonBase className={ classes.image }>
                                <Skeleton variant='rect' width={ 180 } height={ 180 } />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={ 12 } sm container>
                            <Grid item xs container direction='column' spacing={ 2 }>
                                <Grid item xs>
                                    <Skeleton animation='wave' variant='text' />
                                    <Skeleton animation='wave' variant='text' />
                                    <Skeleton animation='wave' variant='text' />
                                    <Skeleton animation='wave' variant='text' />
                                    <Skeleton animation='wave' variant='text' />
                                    <Skeleton animation='wave' variant='text' />
                                    <Skeleton animation='wave' variant='text' />
                                    <Skeleton animation='wave' variant='text' />
                                    <Skeleton animation='wave' variant='text' />
                                    <Skeleton animation='wave' variant='text' />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Skeleton animation='wave' variant='circle' width={ 40 } height={ 40 } />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    };

    const handleExpandClick = () => {
        setMovesExpanded(!movesExpanded);
    };

    const generateMovieJSX = () => {
        const {
            id,
            title,
            description,
            link,
            genre,
            image,
            stock,
            rental_price,
            sale_price,
            availability,
            likes
        } = movieData;

        return (
            <Card className={ classes.root }>
                <CardHeader
                    avatar={
                        <Avatar alt='movie' src={ image } className={ classes.avatar } />
                    }
                    action={
                        (
                            isAuthenticated &&
                            <StyledIconButton
                                aria-label={ `like ${ title }` }
                                color={ likedMovies.find((key) =>
                                    key.movie === id
                                ) ? 'primary' : 'secondary' }
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
                    title={ toFirstCharUppercase(title) }
                />
                <CardActionArea>
                    <CardMedia
                        className={ classes.media }
                        image={ image }
                        title={ title }
                    />
                    <CardContent>
                        <div className={ classes.section1 }>
                            <Typography gutterBottom variant='body1'>
                                Movie Details:
                            </Typography>
                            <List className={ classes.list }>
                                <ListItem>
                                    <ListItemText primary='Rental Price' secondary={ rental_price } />
                                </ListItem>
                                <Divider component='li' />
                                <ListItem>
                                    <ListItemText primary='Sale Price' secondary={ sale_price } />
                                </ListItem>
                                <Divider component='li' />
                                <ListItem>
                                    <ListItemText primary='Stock' secondary={ stock } />
                                </ListItem>
                            </List>
                            <List className={ classes.list }>
                                <ListItem>
                                    <ListItemText primary='Likes' secondary={ likes } />
                                </ListItem>
                                <Divider component='li' />
                                <ListItem>
                                    <ListItemText primary='Availability' secondary={ availability ? 'Available' : 'Not Available' } />
                                </ListItem>
                                <Divider component='li' />
                                <ListItem button component='a' href={ link }>
                                    <ListItemText primary='IMDb' secondary={ 'Click' } />
                                </ListItem>
                            </List>
                        </div>
                        <div className={ classes.section2 }>
                            <Typography gutterBottom variant='body1'>
                                Genres:
                            </Typography>
                            <React.Fragment>
                                { genre.map((genreInfo) => {
                                    const { name } = genreInfo;
                                    return (
                                        <Chip
                                            className={ classes.chip }
                                            label={ `${ name }` }
                                            key={ name }
                                            color='primary'
                                        />
                                    );
                                }) }
                            </React.Fragment>
                        </div>
                        <div className={ classes.section2 }>
                            <CardActions disableSpacing>
                                <Typography gutterBottom variant='body1'>
                                    Description:
                                </Typography>
                                <StyledIconButton
                                    className={ clsx(classes.expand, {
                                        [ classes.expandOpen ]: movesExpanded,
                                    }) }
                                    onClick={ handleExpandClick }
                                    aria-expanded={ movesExpanded }
                                    aria-label='show more'
                                    color='secondary'
                                >
                                    <ExpandMoreIcon />
                                </StyledIconButton>
                            </CardActions>
                            <Collapse in={ movesExpanded } timeout='auto' unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        { description }
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {
                        isAuthenticated &&
                        <React.Fragment>
                            <Button size="small" color="secondary" onClick={ onBuyMovie }>
                                Buy
                            </Button>
                            <Button size="small" color="secondary" onClick={ onRentMovie }>
                                Rent
                            </Button>
                        </React.Fragment>
                    }
                </CardActions>
            </Card >
        )
    }

    return (
        <React.Fragment>
            {loading && generateMovieDetailsSkeleton() }
            {!loading && movieData && generateMovieJSX() }
        </React.Fragment>
    );
}

export default MovieDetail;