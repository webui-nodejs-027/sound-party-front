import React from 'react';
import { Grid, InputBase, Link } from '@material-ui/core';
import { AccountCircle, Search, Input } from '@material-ui/icons';
import { makeStyles, fade } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  button: {
    backgroundColor: 'blue',
    color: 'white'
  },
  icon: {
    color: 'white'
  }
}));

const Header = (props) => {
  const classes = useStyles();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  };

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid item>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            onChange={ e => props.setSearchValue(e.target.value) }
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'Search' }}
          />
        </div>
      </Grid>
      <Grid item>
        <Link component={RouterLink} to='/main/profile' >
        <IconButton
        aria-label='Show more'
        aria-haspopup='true'
        className={classes.icon}
        >
            <AccountCircle />
      </IconButton>
        </Link>
        <IconButton
          aria-label='Show more'
          aria-haspopup='true'
          onClick={ handleSignOut }
          className={classes.icon}
        >
          <Input />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
