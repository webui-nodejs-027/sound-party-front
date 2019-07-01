import React from 'react';
import { Grid, Link } from '@material-ui/core';
import { AccountCircle, Input, SupervisedUserCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import SearchInput from '../Search/Search';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: 'blue',
    color: 'white'
  },
  icon: {
    color: 'white'
  }
}));

const Header = props => {
  const classes = useStyles();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  };
  const adminLink = (
    <Link component={RouterLink} to="/main/admin">
      <IconButton title="Admin page" className={classes.icon}>
        <SupervisedUserCircle />
      </IconButton>
    </Link>
  );
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <SearchInput />
      </Grid>
      <Grid item>
        {props.role === 1 ? adminLink : null}
        <Link title="Profile" component={RouterLink} to="/main/profile">
          <IconButton className={classes.icon}>
            <AccountCircle />
          </IconButton>
        </Link>
        <IconButton
          title="Sign out"
          onClick={handleSignOut}
          className={classes.icon}
        >
          <Input />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
