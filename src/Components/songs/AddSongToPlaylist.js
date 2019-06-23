import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Message from './Message';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0px'
  },
  style: {
    maxHeight: 250,
    width: 200
  }
}));

export default function AddSongToPlaylist(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [playlists, setPlaylists] = useState([]);
  const [message, setMessage] = useState({ msg: null, isMsg: false });
  const childRef = useRef();

  const getPlaylists = async () => {
    const response = await fetch(`http://localhost:3001/api/playlists`);
    const result = await response.json();
    setPlaylists(result);
  };

  const addSongToPlaylist = async (playlistId, songId) => {
    const response = await fetch(
      `http://localhost:3001/api/playlists/${playlistId}/addsong/${songId}`,
      { method: 'POST' }
    );
    const result = await response.json();
    let msg = null;
    if (result.length > 0) {
      msg = 'Song added to playlist';
    } else {
      msg = result.errors;
    }
    setMessage({
      msg,
      isMsg: true
    });
  };

  const handleClick = event => {
    getPlaylists();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    if (event.target.id) {
      addSongToPlaylist(event.target.id, props.songId);
      childRef.current.handleClick();
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton className={classes.root} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ className: classes.style }}
      >
        {playlists.map(playlist => (
          <MenuItem key={playlist.id} id={playlist.id} onClick={handleClose}>
            {playlist.name}
          </MenuItem>
        ))}
      </Menu>
      <Message ref={childRef} message={message} />
    </>
  );
}
