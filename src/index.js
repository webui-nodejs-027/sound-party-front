import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import fetchIntercept from 'fetch-intercept';

fetchIntercept.register({
  request: function (url, config) {
    // Modify the url or config here
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    };
    return [url, {
      ...config,
      headers
    }];
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: function (response) {
    // Modify the reponse object
    return response;
  },

  responseError: function (error) {
    // Handle an fetch error
    return Promise.reject(error);
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
