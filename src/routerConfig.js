import React from 'react';
import AuthWindow from './components/AuthWindow/AuthWindow';
import MainWindow from './components/MainWindow/MainWindow';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import Playlists from './components/playlists/Playlist';
import FindPeople from './components/SamePeopleComponent/SamePeople';
import MainPage from './components/MainPage/MainPage';
import Songs from './components/songs/index';
import Meeting from './components/Meeting/SearchM';
import AdminPage from './components/AdminPage/AdminPage';


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
            {
                name: 'AdminPage',
                path: '/main/admin',
                component: AdminPage
            }
        ]
    },
    {
        component: NotFound
    }
];

export default config;
