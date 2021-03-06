import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Checkbox,
    IconButton,
    Tooltip,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import KeyboardReturnOutlinedIcon from '@material-ui/icons/KeyboardReturnOutlined';
import moment from 'moment';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, .3)',
        margin: 'auto',
        padding: theme.spacing(2),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const headCells = [
    { id: 'id', label: 'ID', numeric: true, disablePadding: false },
    { id: 'movie', label: 'Movie', numeric: true, disablePadding: false },
    { id: 'date_out', label: 'Date Rented', numeric: false, disablePadding: false },
    { id: 'date_returned', label: 'Date Returned', numeric: false, disablePadding: false },
    { id: 'daily_rental_fee', label: 'Daily Rental Fee', numeric: true, disablePadding: false },
    { id: 'rental_debt', label: 'Rental Debt', numeric: true, disablePadding: false },
];

const descendingComparator = (a, b, orderBy) => {
    if (b[ orderBy ] < a[ orderBy ]) {
        return -1;
    }
    if (b[ orderBy ] > a[ orderBy ]) {
        return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [ el, index ]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[ 0 ], b[ 0 ]);
        if (order !== 0) return order;
        return a[ 1 ] - b[ 1 ];
    });
    return stabilizedThis.map((el) => el[ 0 ]);
};

const EnhancedTableHead = (props) => {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                { headCells.map((headCell) => (
                    <TableCell
                        key={ headCell.id }
                        align={ headCell.numeric ? 'right' : 'left' }
                        padding={ headCell.disablePadding ? 'none' : 'default' }
                        sortDirection={ orderBy === headCell.id ? order : false }
                    >
                        <TableSortLabel
                            active={ orderBy === headCell.id }
                            direction={ orderBy === headCell.id ? order : 'asc' }
                            onClick={ createSortHandler(headCell.id) }
                        >
                            { headCell.label }
                            { orderBy === headCell.id ? (
                                <span className={ classes.visuallyHidden }>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                                </span>
                            ) : null }
                        </TableSortLabel>
                    </TableCell>
                )) }
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf([ 'asc', 'desc' ]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, selected, returnRentedMovies, setSelected } = props;

    const handleReturnMovie = () => {
        selected.forEach(movieId => returnRentedMovies(movieId));
        setSelected([]);
    };

    return (
        <Toolbar
            className={ clsx(classes.root, {
                [ classes.highlight ]: numSelected > 0,
            }) }
        >
            {numSelected > 0 ? (
                <Typography className={ classes.title } color="inherit" variant="subtitle1" component="div">
                    {numSelected } selected
                </Typography>
            ) : (
                <Typography className={ classes.title } variant="h6" id="tableTitle" component="div">
                    Rented Movies
                </Typography>
            ) }

            {numSelected > 0 ? (
                <Tooltip title="Return Movie">
                    <IconButton aria-label="Return movie" onClick={ handleReturnMovie }>
                        <KeyboardReturnOutlinedIcon />
                    </IconButton>
                </Tooltip>
            ) : null }
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selected: PropTypes.array.isRequired,
    returnRentedMovies: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired
};

const RentedMoviesList = () => {
    const classes = useStyles();
    const [ order, setOrder ] = useState('asc');
    const [ orderBy, setOrderBy ] = useState('calories');
    const [ selected, setSelected ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ dense, setDense ] = useState(false);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);

    const dispatch = useDispatch();

    const rows = useSelector(state => state.rentedMovies.rentedMovies);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const onFetchRentedMovies = useCallback(() => dispatch(actions.fetchRentedMovies()), [ dispatch ]);
    const onReturnRentedMovies = useCallback((movieId) => dispatch(actions.returnRentedMovies(movieId)), [ dispatch ]);

    useEffect(() => {
        (isAuthenticated && onFetchRentedMovies());
    }, [ onFetchRentedMovies, isAuthenticated ]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={ classes.root }>
            <Paper className={ classes.paper }>
                <EnhancedTableToolbar numSelected={ selected.length } selected={ selected } returnRentedMovies={ onReturnRentedMovies } setSelected={ setSelected } />
                <TableContainer>
                    <Table
                        className={ classes.table }
                        aria-labelledby="tableTitle"
                        size={ dense ? 'small' : 'medium' }
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={ classes }
                            numSelected={ selected.length }
                            order={ order }
                            orderBy={ orderBy }
                            onRequestSort={ handleRequestSort }
                            rowCount={ rows.length }
                        />
                        <TableBody>
                            { stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${ index }`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={ isItemSelected }
                                            tabIndex={ -1 }
                                            key={ row.id }
                                            selected={ isItemSelected }
                                        >
                                            <TableCell padding="checkbox">
                                                {
                                                    !row.date_returned &&
                                                    <Checkbox
                                                        checked={ isItemSelected }
                                                        inputProps={ { 'aria-labelledby': labelId } }
                                                        onClick={ (event) => handleClick(event, row.id) }
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell component="th" id={ labelId } scope="row">
                                                { row.id }
                                            </TableCell>
                                            <TableCell align="right">{ row.movie }</TableCell>
                                            <TableCell align="right">
                                                { moment(row.date_out).format('D MMMM YYYY') }
                                            </TableCell>
                                            <TableCell align="right">
                                                { row.date_returned ? moment(row.date_returned).format('D MMMM YYYY') : row.date_returned }
                                            </TableCell>
                                            <TableCell align="right">{ row.daily_rental_fee }</TableCell>
                                            <TableCell align="right">{ row.rental_debt }</TableCell>
                                        </TableRow>
                                    );
                                }) }
                            { emptyRows > 0 && (
                                <TableRow style={ { height: (dense ? 33 : 53) * emptyRows } }>
                                    <TableCell colSpan={ 5 } />
                                </TableRow>
                            ) }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={ [ 5, 10, 25 ] }
                    component="div"
                    count={ rows.length }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    onChangePage={ handleChangePage }
                    onChangeRowsPerPage={ handleChangeRowsPerPage }
                />
            </Paper>
            <FormControlLabel
                control={ <Switch checked={ dense } onChange={ handleChangeDense } /> }
                label="Dense padding"
            />
        </div>
    );
}

export default RentedMoviesList;
