import React from 'react';
import AuthWindow from './components/AuthWindow';
import MainWindow from './components/MainWindow';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn/SignInController'
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import FindPeople from './components/samePeopleComponent/SamePeople';

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
        }
    ]
  },
  {
    component: NotFound
  }
];

export default config;
