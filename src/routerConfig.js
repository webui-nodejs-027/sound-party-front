import React from 'react';
import AuthWindow from './components/AuthWindow';
import MainWindow from './components/MainWindow';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import FindPeople from './components/SamePeopleComponent/SamePeople';
import MainPage from './components/MainPage/MainPage';

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
                name: 'Profile',
                path: '/main/profile',
                component: Profile
            },
            {
                name: 'FindPeople',
                path: '/main/findpeople',
                component: FindPeople
            },
            {
                name: 'MainPage',
                path: '/main',
                component: MainPage
            }
        ]
    },
    {
        component: NotFound
    }
];

export default config;
