import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './store/reducers/auth';
import moviesReducer from './store/reducers/movies';
import movieDetailsReducer from './store/reducers/movieDetails';
import rentedMoviesReducer from './store/reducers/rentedMovies';
import boughtMoviesReducer from './store/reducers/boughtMovies';
import snackbarReducer from './store/reducers/snackbar';
import { watchAuth, watchMovies } from './store/sagas';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  movieDetails: movieDetailsReducer,
  rentedMovies: rentedMoviesReducer,
  boughtMovies: boughtMoviesReducer,
  snackbar: snackbarReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

const theme = createMuiTheme({
  palette: {
    type: "dark",
  }
});

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchMovies);

ReactDOM.render(
  <Provider store={ store }>
    <SnackbarProvider maxSnack={ 3 }>
      <BrowserRouter>
        <React.StrictMode>
          <ThemeProvider theme={ theme }>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
