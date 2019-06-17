import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import fetchIntercept from 'fetch-intercept';
//
// fetchIntercept.register({
//   request: function (url, config) {
//     console.log({
//       ...config,
//      });
//     return [url, {
//       ...config,
//       headers: {
//         'Authorization': localStorage.getItem('token'),
//       }
//     }];
//   },
// });



ReactDOM.render(<App />, document.getElementById('root'));
