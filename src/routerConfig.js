import React from 'react';
import AuthWindow from './components/AuthWindow';
import MainWindow from './components/MainWindow/MainWindow';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn/SignInController'
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import FindPeople from './components/samePeopleComponent/SamePeople';
import MainPage from './components/MainPage/MainPage';

const config = [
    {
        name: 'Root',
        path: '/',
        noredirect: true,
        exact: true,
        component: SignIn,
    },
    {
        name: 'Main',
        path: '/main',
        component: MainWindow,
        routes: [
            {
                name: 'Signup',
                path: '/main/signup',
                component: SignUp
            },
            {
                name: 'Profile',
                path: '/main/profile',
                component: Profile
            },
            {
                name: 'FindPeople',
                path: '/main/findpeople/:id',
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
