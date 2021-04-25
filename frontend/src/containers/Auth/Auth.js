import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    TextField,
    Link,
    Paper,
    Grid,
    Typography,
    CircularProgress,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import backgroundMovies from '../../assets/images/movie_rental_background.jpg';
import Notifier from '../../components/Notifier/Notifier';

const useStyles = makeStyles((theme) => ({
    rootLogin: {
        height: '91vh',
    },
    image: {
        backgroundImage: `url(${ backgroundMovies })`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[ 50 ] : theme.palette.grey[ 900 ],
        backgroundSize: 'cover',
        backgroundPosition: 'left',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    circularProgress: {
        display: 'flex',
        alignItems: 'center',
    }
}));

const Auth = props => {
    const classes = useStyles();

    const { authRedirectPath, onSetAuthRedirectPath, onAuthRememberMe, rememberMe } = props;

    const [ controls, setControls ] = useState({
        email: {
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        name: {
            elementConfig: {
                type: 'name',
                placeholder: 'User Name'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        re_password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Re-type Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        }
    });

    const [ isSignup, setIsSignup ] = useState(true);

    useEffect(() => {
        if (authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [ authRedirectPath, onSetAuthRedirectPath ]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [ controlName ]: updateObject(controls[ controlName ], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[ controlName ].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    };

    const checkBoxChangedHandler = (event) => {
        onAuthRememberMe(event.target.checked);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (!isSignup) props.onAuth(controls.email.value, controls.password.value, rememberMe);
    };

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    };

    const fromElementsArray = [];
    for (let key in controls) {
        fromElementsArray.push({
            id: key,
            config: controls[ key ]
        });
    };

    let form = (
        <React.Fragment>
            {
                fromElementsArray.map(formElement => {
                    if (isSignup) {
                        return (
                            <TextField
                                key={ formElement.id }
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                name={ formElement.id }
                                label={ formElement.config.elementConfig.placeholder }
                                type={ formElement.config.elementConfig.type }
                                id={ formElement.id }
                                error={ !formElement.config.valid && formElement.config.touched }
                                onChange={ (event) => inputChangedHandler(event, formElement.id) }
                            />
                        );
                    } else if ([ 'email', 'password' ].includes(formElement.id) && !isSignup) {
                        return (
                            <TextField
                                key={ formElement.id }
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                name={ formElement.id }
                                label={ formElement.config.elementConfig.placeholder }
                                type={ formElement.config.elementConfig.type }
                                id={ formElement.id }
                                error={ !formElement.config.valid && formElement.config.touched }
                                onChange={ (event) => inputChangedHandler(event, formElement.id) }
                            />
                        );
                    } else {
                        return null;
                    }
                })
            }
            <FormControlLabel
                control={ <Checkbox value='remember' color='primary' /> }
                label='Remember me'
                onChange={ checkBoxChangedHandler }
            />
        </React.Fragment>
    );

    if (props.loading) {
        form = (
            <div className='circularProgress'>
                <CircularProgress />
            </div>
        )
    }


    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={ authRedirectPath } />
    }

    return (
        <React.Fragment>
            <Notifier />
            <Grid container component='main' className={ classes.rootLogin }>
                <Grid item xs={ false } sm={ 4 } md={ 7 } className={ classes.image } />
                <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                    <div className={ classes.paper }>
                        <Avatar className={ classes.avatar }>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            { isSignup ? 'Sign Up' : 'Sign In' }
                        </Typography>
                        { authRedirect }
                        <form className={ classes.form } onSubmit={ submitHandler }>
                            { form }
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={ classes.submit }
                            >
                                { isSignup ? 'Sign Up' : 'Sign In' }
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='#' variant='body2'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href='#' variant='body2' onClick={ switchAuthModeHandler }>
                                        { isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up' }
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
        authRedirectPath: state.auth.authRedirectPath,
        rememberMe: state.auth.rememberMe
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, rememberMe) => dispatch(actions.auth(email, password, rememberMe)),
        onAuthRememberMe: (rememberMe) => dispatch(actions.authRememberMe(rememberMe)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);