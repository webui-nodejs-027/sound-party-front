import React, { useState } from 'react';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography
} from '@material-ui/core/';
import {
  Link,
  Switch,
} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import Header from './Header';
const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    backgroundColor: '#3f51b5',
    height: '64px',
    border: 'none',
    boxShadow: '0 0 9px rgba(0, 0, 0, 0.6)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
  },
  link: {
    textDecoration: 'none'
  }
}));

const MainWindow = (props) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [ mobileOpen, setMobileOpen ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ user, setUser ] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    gender: ''
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
                  <div>
                    <div className={ classes.toolbar } >
                      <h1 style={ { margin: 0 } }>Sound party</h1>
                    </div>
                    <Divider />
                    <List>
                      <ListItem>
                        <Link to='/main/signup' className={classes.link}>signup</Link>
                      </ListItem>
                      <ListItem>
                        <Link to='/main/playlists' className={classes.link}>My playlists</Link>
                      </ListItem>
                    </List>
                    <Divider />
                  </div>
  );

  const routes = props.routes.map( (route, i) => (
    <RouteWithSubRoutes key={ i } {...route} parentData={{auth: props.auth, setAuth: props.setAuth}} />
  ));

  return (
    <div className={ classes.root }>
      <CssBaseline />
      <AppBar position='fixed' className={ classes.appBar }>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            edge='start'
            onClick={ handleDrawerToggle }
            className={ classes.menuButton }
          >
            Menu
          </IconButton>
          <Header setSearchValue={ setSearch }/>
        </Toolbar>
      </AppBar>
      <nav className={ classes.drawer } aria-label='Mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={ container }
            variant='temporary'
            anchor={ theme.direction === 'rtl' ? 'right' : 'left' }
            open={ mobileOpen }
            onClose={ handleDrawerToggle }
            classes={ {
              paper: classes.drawerPaper,
            } }
            ModalProps={ {
              keepMounted: true,
            } }
          >
            { drawer }
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={ {
              paper: classes.drawerPaper,
            } }
            variant='permanent'
            open
          >
            { drawer }
          </Drawer>
        </Hidden>
      </nav>
      <main className={ classes.content } >
          <Switch>
            { routes }
          </Switch>
      </main>
    </div>
  );
};



export default MainWindow;

