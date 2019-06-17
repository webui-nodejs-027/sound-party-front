import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthWindow from './components/AuthWindow';
import MainWindow from './components/MainWindow';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn/SignInController'
import Profile from './components/Profile';
import NotFound from './components/NotFound';

const RedirectTo = (props) => {
  return (
    <Redirect to={ props.redirect }/>
  )
};

const Protect = (component, redirectionPath, ...roles) => {
  const redir = redirectionPath || '/';
  // const test = async (func) => {
  //     const result = await func()
  // }
  // const auth = {
  //   isAuthenticated: false,
  //   role: true,
  //   checkAuthenticate() {
  //     fetch('http://localhost:3001/api/users/checkAuthorization', {
  //       headers: {
  //         'Authorization': localStorage.getItem('token'),
  //       }
  //     }).then(response => {
  //       return response
  //     }).then(response => {
  //       response.status === 200 ? this.isAuthenticated = true : this.isAuthenticated = false;
  //     });
  //   },
  //
  // };
  // auth.checkAuthenticate();
  // console.log(auth)
  // if (!role || !roles.indexOf(role) >= 0) {
  //   return () => <Redirect to={redir} />;
  // }

  return component;

};

const config = [
  {
    name: 'Root',
    path: '/',
    exact: true,
    component: AuthWindow,
  },
  {
    name: 'SignIn',
    path: '/signin',
    component: SignIn,
  },
  {
    name: 'Main',
    path: '/main',
    component: Protect(MainWindow,'/', 1, 2, 3),
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
        redirect: '/main',
        component: RedirectTo
      }
    ]
  },
  {
    component: NotFound
  }
];

export default config;
