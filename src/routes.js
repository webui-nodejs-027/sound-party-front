import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Playlist from './playlists/Playlist'


export default props => (
    <HashRouter>
        <Switch>
          <Route exact path='/playlists' component={ Playlist } />
        </Switch>
    </HashRouter>
);