import React from 'react';
import AuthWindow from './components/AuthWindow';
import MainWindow from './components/MainWindow';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn/SignInController'
import Profile from './components/Profile';
import NotFound from './components/NotFound';

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
      }
    ]
  },
  {
    component: NotFound
  }
];

export default config;
