/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import PlayArrow from '@material-ui/icons/PlayArrow';
import AddSongToPlaylist from './AddSongToPlaylist';

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

const headRows = [
    {id: 'play', sort: false, label: 'Play'},
    {id: 'songName', sort: true, label: 'Name'},
    {id: 'authorName', sort: true, label: 'Singer'},
    {id: 'genre', sort: true, label: 'Genre'},
    {id: 'year', sort: true, label: 'Year'},
    {id: 'duration', sort: false, label: 'Duration'},
    {id: 'add', sort: false, label: 'Add'}
];

function EnhancedTableHead(props) {
    const {sortBy, orderBy, onRequestSort} = props;
    const createSortHandler = (property, isSorted) => event => {
        if (isSorted) {
            onRequestSort(event, property);
        }
    };

    return (
        <TableHead>
            <TableRow>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        sortDirection={sortBy === row.id ? orderBy : false}
                    >
                        <TableSortLabel
                            active={sortBy === row.id}
                            direction={orderBy}
                            onClick={createSortHandler(row.id, row.sort)}
                            hideSortIcon={!row.sort}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function SongTable(props) {
    const classes = useStyles();
    const [sortBy, setSortBy] = useState('year');
    const [orderBy, setOrderBy] = useState('desc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [songs, setSongs] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getSongs(1, rowsPerPage, sortBy, 'DESC');
    }, []);

    const getOrderByParam = () => {
        let orderByParam = orderBy === 'desc' ? 'DESC' : 'ASC';
        return orderByParam;
    };

    const getSongs = async (pageParam, limitParam, sortByParam, orderByParam) => {
        let response = null;
        if (props.searchBy) {
            response = await fetch(
                `http://localhost:3001/api/songs?${props.searchBy}=${
                    props.value
                    }&page=${pageParam}&limit=${limitParam}&sortBy=${sortByParam}&order=${orderByParam}`
            );
        } else {
            response = await fetch(
                `http://localhost:3001/api/songs?page=${pageParam}&limit=${limitParam}&sortBy=${sortByParam}&order=${orderByParam}`
            );
        }
        const result = await response.json();
        const emptySongs = [];
        setSongs(emptySongs);
        setTotal(result.total);
        setSongs(result.data);
    };

    const handleMetadata = (event, index) => {
        const curDuration = event.target.duration;
        const minutes = '0' + Math.floor(curDuration / 60);
        const seconds = '0' + Math.floor(curDuration - minutes * 60);
        const duration = minutes.substr(-2) + ':' + seconds.substr(-2);
        songs[index].duration = duration;
        setSongs(prev => {
            return [
                ...prev.slice(0, index),
                {...prev[index], duration},
                ...prev.slice(index + 1)
            ];
        });
    };

    const handleRequestSort = (event, sortByParam) => {
        setSortBy(sortByParam);
        let orderByParam = orderBy === 'asc';
        setOrderBy(orderByParam ? 'desc' : 'asc');
        orderByParam = orderByParam ? 'DESC' : 'ASC';

        getSongs(1, rowsPerPage, sortByParam, orderByParam);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        const orderByParam = getOrderByParam();
        getSongs(newPage + 1, rowsPerPage, sortBy, orderByParam);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        const orderByParam = getOrderByParam();
        getSongs(1, event.target.value, sortBy, orderByParam);
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleChangeMusic = (song, index) => {
        const takeSong = song;
        let setSongs = [...songs];
        setSongs.splice(index, 1);
        setSongs.unshift(song);
        const data = {
            data: setSongs,
        };
        props.defaultSettings.setSongs({
            songs: data,
            autoplay: true,
            changeSong: true,
        });
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} size="medium">
                        <EnhancedTableHead
                            sortBy={sortBy}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {songs.map((song, index) => {
                                return (
                                    <TableRow hover key={song.id}>
                                        <TableCell>
                                            <PlayArrow onClick={() => handleChangeMusic(song, index)}/>
                                        </TableCell>
                                        <TableCell>{song.name}</TableCell>
                                        <TableCell>{song.authorId.name}</TableCell>
                                        <TableCell>{song.genreId.name}</TableCell>
                                        <TableCell>{song.year}</TableCell>
                                        <TableCell>
                                            <audio
                                                src={`http://localhost:3001/music/${song.source}`}
                                                onLoadedMetadata={event => handleMetadata(event, index)}
                                            />
                                            <span>{song.duration}</span>
                                        </TableCell>
                                        <TableCell>
                                            <AddSongToPlaylist songId={song.id}/>
                                        </TableCell>
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
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
