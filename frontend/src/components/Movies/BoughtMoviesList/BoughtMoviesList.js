import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';
import moment from 'moment';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        margin: "auto",
        height: "100%",
        width: "100%",
        backgroundColor: 'rgba(255, 255, 255, .3)',
    },
    container: {
        maxHeight: 440,
        backgroundColor: 'rgba(255, 255, 255, .3)',
    },
}));

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'movie', label: 'Movie', minWidth: 100 },
    {
        id: 'date_bought',
        label: 'Date Rented',
        minWidth: 170,
        align: 'right',
        format: (value) => moment(value).format('D MMMM YYYY'),
    },
    {
        id: 'purchase_price',
        label: 'Date Returned',
        minWidth: 170,
        align: 'right',
    },
];

const BoughtMoviesList = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const boughtMovies = useSelector(state => state.movies.boughtMovies);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const onFetchBoughtMovies = useCallback(() => dispatch(actions.fetchBoughtMovies()), [ dispatch ]);

    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);

    useEffect(() => {
        (isAuthenticated && onFetchBoughtMovies());
    }, [ onFetchBoughtMovies, isAuthenticated ]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={ classes.root }>
            <TableContainer className={ classes.container }>
                <Table stickyHeader aria-label="Bought Movies">
                    <TableHead>
                        <TableRow>
                            { columns.map((column) => (
                                <TableCell
                                    key={ column.id }
                                    align={ column.align }
                                    style={ { minWidth: column.minWidth } }
                                >
                                    {column.label }
                                </TableCell>
                            )) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { boughtMovies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={ -1 } key={ row.movie }>
                                    {columns.map((column) => {
                                        const value = row[ column.id ];
                                        return (
                                            <TableCell key={ column.id } align={ column.align }>
                                                {column.format ? column.format(value) : value }
                                            </TableCell>
                                        );
                                    }) }
                                </TableRow>
                            );
                        }) }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={ [ 10, 25, 100 ] }
                component="div"
                count={ boughtMovies.length }
                rowsPerPage={ rowsPerPage }
                page={ page }
                onChangePage={ handleChangePage }
                onChangeRowsPerPage={ handleChangeRowsPerPage }
            />
        </Paper>
    )
}

export default BoughtMoviesList;