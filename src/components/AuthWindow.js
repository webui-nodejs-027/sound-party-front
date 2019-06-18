import React, { useState } from 'react';
import { Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SignUp from './SignUp';
import PasswordResetForm from './PasswordResetForm';

const useStyles = makeStyles( () => (
  {
    box: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#cce6ff'
    },
    paper: {
      minWidth: '350px',
      minHeight: '250px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    h2: {
      margin: '0'
    },
    link: {
      color: '#ff751a',
      textDecoration: 'none'
    }
  }
));

const AuthWindow = () => {
  const classes = useStyles();
  const [ stage, setStage ] = useState('signIn');
  let form;
  switch (stage) {
    case 'signIn':
      form = <PasswordResetForm />;
    break;
    case 'signUp':
      form = <SignUp changeStage={setStage}/>;
    break;
  }
  return (
    <Box maxWidth='xl' className={ classes.box }>
      <Paper className={ classes.paper }>
        {form}
      </Paper>
    </Box>
  );
};

export default AuthWindow;
