import React from 'react';
import AuthWindow from './Components/AuthWindow';
import MainWindow from './Components/MainWindow';
import Profile from './Components/Profile';
import NotFound from './Components/NotFound';
import Playlists from './Components/playlists/Playlist'
import FindPeople from './Components/SamePeopleComponent/SamePeople';
import MainPage from './Components/MainPage/MainPage';
import Songs from './Components/songs/index';
import Meeting from './Components/Meeting/SearchM'

const config = [
    {
        name: 'Root',
        path: '/',
        noredirect: true,
        exact: true,
        component: AuthWindow,
    },
    {
        name: 'Main',
        path: '/main',
        component: MainWindow,
        routes: [
            {
                name: 'MainPage',
                exact: true,
                path: '/main',
                component: MainPage
            },
            {
                name: 'Profile',
                path: '/main/profile',
                component: Profile
            },
            {
                name: 'Songs',
                path: '/main/songs',
                component: Songs
            },
            {
                name: 'FindPeople',
                path: '/main/findpeople',
                component: FindPeople
            },
            {
                name: 'Playlist',
                path: '/main/playlists',
                component: Playlists
            },
            {
                name: 'Meeting',
                path: '/main/meting',
                component: Meeting
            },

        ]
    },
    {
        component: NotFound
    }
];

export default config;
