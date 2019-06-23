import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import PlayArrow from '@material-ui/icons/PlayArrow';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const headRows = [
  { id: 'play', sort: false, disablePadding: true, label: 'Play' },
  { id: 'name', sort: false, disablePadding: true, label: 'Name' },
  { id: 'singer', sort: false, disablePadding: false, label: 'Singer' },
  { id: 'genre', sort: false, disablePadding: false, label: 'Genre' },
  { id: 'year', sort: false, disablePadding: false, label: 'Year' },
  { id: 'duration', sort: false, disablePadding: false, label: 'Duration' },
  { id: 'add', sort: false, disablePadding: false, label: 'Add' }
];

function EnhancedTableHead(props) {
  // const { order, orderBy, onRequestSort } = props;
  // const createSortHandler = property => event => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align="left"
            // sortDirection={orderBy === row.id ? order : false}
          >
            {/* <TableSortLabel
              active={row.sort && orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
              hideSortIcon={!row.sort}
            >
              {row.label}
            </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  // onRequestSort: PropTypes.func.isRequired,
  // order: PropTypes.string.isRequired,
  // orderBy: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  }
}));

export default function SongTable() {
  const classes = useStyles();
  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect((id) => {
    const getData = async () => {
      const response = await fetch(`http://localhost:3001/api/playlists/${id}/songs`);
      const result = await response.json();
      setTotal(result.total);
      setData(result.data);
    };
    getData();
  }, []);

  const handleMetadata = (event, index) => {
    const curDuration = event.target.duration;
    const minutes = '0' + Math.floor(curDuration / 60);
    const seconds = '0' + Math.floor(curDuration - minutes * 60);
    const duration = minutes.substr(-2) + ':' + seconds.substr(-2);
    data[index].duration = duration;
    setData(prev => {
      return [
        ...prev.slice(0, index),
        { ...prev[index], duration: duration },
        ...prev.slice(index + 1)
      ];
    });
  };

  // const handleRequestSort = (event, property) => {
  //   const isDesc = orderBy === property && order === 'desc';
  //   let sortBy = '';
  //   if (property === 'name') {
  //     sortBy = 'songName';
  //   } else if (property === 'singer') {
  //     sortBy = 'authorName';
  //   } else if (property === 'genre') {
  //     sortBy = 'genre';
  //   } else if (property === 'year') {
  //     sortBy = 'year';
  //   }
  //   if (sortBy) {
  //     const getData = async (sortBy, isDesc) => {
  //       const response = await fetch(
  //         `http://localhost:3001/api/songs?page=1&limit=${rowsPerPage}&sortBy=${sortBy}&order=${isDesc}`
  //       );
  //       const result = await response.json();
  //       const emptyData = [];
  //       setData(emptyData);
  //       setData(result.data);
  //     };
  //     getData(sortBy, isDesc ? 'ASC' : 'DESC');
  //     setPage(0);
  //   }
  //   setOrder(isDesc ? 'asc' : 'desc');
  //   setOrderBy(property);
  // };

  const handleChangePage = (event, newPage) => {
    const getData = async (id) => {
      const response = await fetch(
        `http://localhost:3001/api/playlists/${id}/songs?page=${newPage +
          1}&limit=${rowsPerPage}`
      );
      let result = await response.json();
      const emptyData = [];
      setData(emptyData);
      setData(result.data);
    };
    getData();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    const getData = async (id) => {
      const response = await fetch(
        `http://localhost:3001/api/playlists/${id}/songs?page=1&limit=${+event.target.value}`
      );
      let result = await response.json();
      const emptyData = [];
      setData(emptyData);
      setData(result.data);
    };
    getData();
    setRowsPerPage(+event.target.value);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
          >
            {/* <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            /> */}
            <TableBody>
              {data.map((row, index) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell>
                      <PlayArrow />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.authorId.name}</TableCell>
                    <TableCell align="left">{row.genreId.name}</TableCell>
                    <TableCell align="left">{row.year}</TableCell>
                    <TableCell align="left">
                      <audio
                        src={`http://localhost:3001/music/${row.source}`}
                        onLoadedMetadata={event => handleMetadata(event, index)}
                      />
                      <span>{row.duration}</span>
                    </TableCell>
                    <TableCell align="left"><MoreVertIcon></MoreVertIcon></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
