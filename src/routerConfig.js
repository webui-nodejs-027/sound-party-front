import React from 'react';
import AuthWindow from './components/AuthWindow';
import MainWindow from './components/MainWindow';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import FindPeople from './components/SamePeopleComponent/SamePeople';
import MainPage from './components/MainPage/MainPage';
import Songs from './components/songs/index';

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
            }
        ]
    },
    {
        component: NotFound
    }
];

export default config;
