/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PlayArrow from "@material-ui/icons/PlayArrow";
import ClearIcon from  "@material-ui/icons/Clear"
// import AddSongToPlaylist from "./AddSongToPlaylist";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  }
}));

const headRows = [
  { id: "play", sort: false, label: "Play" },
  { id: "songName", sort: false, label: "Name" },
  { id: "authorName", sort: false, label: "Singer" },
  { id: "genre", sort: false, label: "Genre" },
  { id: "year", sort: false, label: "Year" },
  { id: "duration", sort: false, label: "Duration" },
  { id: "delete", sort: false, label: "Delete" }
];

function EnhancedTableHead() {

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
          >{row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function SongTable(props){
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [songs, setSongs] = useState([]);
  const [total, setTotal] = useState(0);
  

  useEffect(() => {
    getSongs(1, rowsPerPage); 
  },[props.id]);


   const getSongs = async ( pageParam, limitParam) => {
    let response = null;
    response = await fetch(`http://localhost:3001/api/playlists/${props.id}/songs?page=${pageParam}&limit=${limitParam}`);

    const result = await response.json();
    const emptySongs = [];
    setSongs(emptySongs);
    setTotal(result.total);
    if(result.data.length > 0) {
      setSongs(result.data[0].songs);
    }
    
    }

  const handleMetadata = (event, index) => {
    const curDuration = event.target.duration;
    const minutes = "0" + Math.floor(curDuration / 60);
    const seconds = "0" + Math.floor(curDuration - minutes * 60);
    const duration = minutes.substr(-2) + ":" + seconds.substr(-2);
    songs[index].duration = duration;
    setSongs(prev => {
      return [
        ...prev.slice(0, index),
        { ...prev[index], duration },
        ...prev.slice(index + 1)
      ];
    });
  };

  const handleChangePage = (event, newPage) => {
     getSongs(newPage + 1, rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
     getSongs(1, event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const deleteSong = async (idSong ) => {
    let response = null;
     response = await fetch(`http://localhost:3001/api/playlists/${props.id}/removesong/${idSong}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    const emptySongs = [];
    setSongs(emptySongs);
    setSongs(result[0].songs);
    }

  return (
    
      <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} size="medium">
            <EnhancedTableHead/>
            <TableBody>

              {songs.map((s, index) => {
                
                return (
                  <TableRow hover key={s.id}>
                    <TableCell>
                    <PlayArrow />
                    </TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.authorId.name} </TableCell>
                    <TableCell>{s.genreId.name}</TableCell>
                    <TableCell>{s.year}</TableCell>

                    <TableCell>
                      <audio
                        src={`http://localhost:3001/music/${s.source}`}
                        onLoadedMetadata={event => handleMetadata(event, index)}
                      />
                      <span>{s.duration}</span>
                    </TableCell> 
                    <TableCell>
                      <ClearIcon 
                      onClick={()=> deleteSong(s.id)}/>
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