import React from 'react';
import {
  Box,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles( () => (
  {
    box: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#cce6ff'
    },
    paper: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    },
    h2: {
      margin: '0'
    },
    link: {
      color: '#ff751a',
      textDecoration: 'none'
    }
  }
));

const NotFound = () => {
  const classes = useStyles();
  return (
    <Box maxWidth='xl' className={ classes.box }>
      <Paper className={ classes.paper }>
          <h2 className={ classes.h2 }>Page not found</h2>
          <p>
            Looks like you've followed a broken link or entered<br/>
            a URL that doesn't exist on this site.
          </p>
          <Link to='/main' className={ classes.link }>{ '<' } Back to our site</Link>
      </Paper>
    </Box>
  )
};

export default NotFound;
