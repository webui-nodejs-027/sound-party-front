import React, {useEffect, useState} from 'react';
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
import {makeStyles, useTheme} from '@material-ui/core/styles';
import RouteWithSubRoutes from '../RouteWithSubroutes/RouteWithSubRoutes';
import Header from './Header';
import MusicPlayerContainer from "../MusicPlayer/MusicPlayer";

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
        marginBottom: "200px",
    },
    link: {
        textDecoration: 'none'
    }
}));

const MainWindow = (props) => {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [songs, setSongs] = useState({
        songs: [],
        autoplay: false
    });
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
        gender: '',
        roleId: '',
        id: ''
    });
    const [reload, setReload] = useState(Math.random());
    const getUserId = () => {
        const payload = localStorage
            .getItem('token')
            .split('.')[1];
        return JSON.parse(atob(payload)).id;
    };

    //Should be changed(userID)
    const getUser = async () => {
        const id = getUserId();
        const address = `http://localhost:3001/api/users/${id}`;
        const response = await fetch(address, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const userData = await response.json();
        setUser(userData);
    };

    const getSongs = async () => {
        const response = await fetch('http://localhost:3001/api/songs');
        const songsData = await response.json();
        setSongs({
            songs: songsData,
            autoplay: false
        });
    };

    useEffect(() => {
        getUser().catch(err => console.log(err));
        getSongs().catch(err => console.log(err));
    }, [reload]);

    const [electItem, setElectItem] = useState({
        searchBy: null,
        itemId: null,
        itemName: null
    });

    const handleElectItemSetter = (item) => {
        setElectItem(item)
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <h1 style={{margin: 0}}>
                    <Link style={{textDecoration: 'none', color: 'white'}} to='/main'>
                        Sound party
                    </Link>
                </h1>
            </div>
            <Divider/>
            <List>
                <ListItem>
                    <Link to='/main/findpeople' className={classes.link}>Find People</Link>
                </ListItem>
                <ListItem>
                    <Link to='/main/songs' className={classes.link}>Songs</Link>
                </ListItem>
                <ListItem>
                    <Link to='/main/playlists' className={classes.link}>My playlists</Link>
                </ListItem>
                <ListItem>
                    <Link to='/main/meting' className={classes.link}>Meetings</Link>
                </ListItem>
                <ListItem>
                    <Link to='/main/genres' className={classes.link}>Genres</Link>
                </ListItem>
                <ListItem>
                    <Link to='/main/authors' className={classes.link}>Authors</Link>
                </ListItem>
            </List>
            <Divider/>
        </div>
    );

    // const routes = props.routes.map((route, i) => (
    //     <RouteWithSubRoutes key={i} {...route} parentData={{
    //         auth: props.auth,
    //         setAuth: props.setAuth,
    //         user: {...user},
    //         setReload: setReload
    //     }}/>
    // ));

    const routes = props.routes.map((route, i) => {
        let parentData = {
            auth: props.auth,
            setAuth: props.setAuth,
            setSongs: setSongs,
            user: {...user},
            setReload: setReload
        };
        switch (route.name) {
            case 'MainPage':
                parentData = {...parentData, handleElectItemSetter};
                break;
            case 'Genre':
                parentData = {...parentData, handleElectItemSetter, showMoreBtn: true};
                break;
            case 'Author':
                parentData = {...parentData, handleElectItemSetter, showMoreBtn: true};
                break;
            case 'Explore':
                parentData = {...parentData, electItem: electItem};
                break;
            default:
                break;
        }
        return <RouteWithSubRoutes key={i} {...route} parentData={parentData}/>
    });

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='Open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        Menu
                    </IconButton>
                    <Header setSearchValue={setSearch} role={user.roleId} setReload={setReload}/>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label='Mailbox folders'>
                <Hidden smUp implementation='css'>
                    <Drawer
                        container={container}
                        variant='temporary'
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation='css'>
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant='permanent'
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <Switch>
                    {routes}
                </Switch>
                <MusicPlayerContainer songs={songs}/>
            </main>
        </div>
    );
};


export default MainWindow;

