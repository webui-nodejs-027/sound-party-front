import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function convertData(data){
    return {
        // data: data,
        meeting: data.name,
        genre: data.genre ? data.genre : '',
        author: data.author ? data.author: '',
        city: data.city,
        date: data.dateTime,
        status: data.status,
        id: data.id ,
        address: data.address,
    };
}

const headRows = [
    { name: 'meeting', disablePadding: true, label: 'Meeting', isMain: true },
    { name: 'genre', disablePadding: false, label: 'Genre' },
    { name: 'author', disablePadding: false, label: 'Author' },
    { name: 'city', disablePadding: false, label: 'City' },
    { name: 'date', disablePadding: false, label: 'Date' },
    { name: 'status', disablePadding: false, label: 'Status' },
    { name: '', disablePadding: false, label: '' },
];

function EnhancedTableHead(props) {
    return (
        <TableHead>
            <TableRow>
                {headRows.map(row => (
                    <TableCell
                        key={row.name}
                        align={row.isMain ? 'left' : 'right'}
                        padding={row.disablePadding ? '20px' : 'default'}
                        //sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={false}
                            direction={props.direction}
                            onClick={props.handleChangeSort} //сюда ввести функцию сортировки
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// EnhancedTableHead.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.string.isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function EnhancedTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage);

    const data = props.rows;
    const rows = data.map(elem => convertData(elem));


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            handleChangeSort = {props.handleChangeSort}
                            direction = {props.direction.toLowerCase()}
                            // numSelected={selected.length}
                            // order={order}
                            // orderBy={orderBy}
                            // onSelectAllClick={handleSelectAllClick}
                            // onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows
                                .map((row, index) => {
                                    // const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            // aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            // selected={isItemSelected}
                                        >

                                            <TableCell component="th" id={labelId} scope="row" padding="20px">
                                                {row.meeting}
                                            </TableCell>
                                            <TableCell align="right">{row.genre.name}</TableCell>
                                            <TableCell align="right">{row.author.name}</TableCell>
                                            <TableCell align="right">{row.city.name}</TableCell>
                                            <TableCell align="right">{row.date}</TableCell>
                                            <TableCell align="right">{row.status.name}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    onClick={props.handleClickInfo.bind(this, row.id, row)}
                                                    meeting={row.id}
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}>
                                                INFO
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={props.rowsPerPageOptions}
                    component="div"
                    count={props.count}
                    rowsPerPage={props.rowsPerPage}
                    page={props.page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={props.handleChangePage}
                    onChangeRowsPerPage={props.handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}