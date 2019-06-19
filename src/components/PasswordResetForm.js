import React, { useState } from "react";
import { Button, Grid, TextField, Link } from "@material-ui/core";
import Typography from "./SignIn/SignIn";

const PasswordResetForm = (props) => {
  const [ email, setEmail ] = useState('');
  const [ errors, setErrors ] = useState(false);
  const [ message, setMessage ] = useState('');
  const handleClick = async () => {
    if (!email) {
      setMessage('Enter email');
      return setErrors(true);
    }
    const result = await fetchData('http://localhost:3001/api/users/passwordreset', email);
    if (result.errors && Array.isArray(result.errors)) {
      setMessage(result.message);
      return setErrors(true);
    }
    setMessage(`Message was sent on ${email.email}`);
    setTimeout(() => {
      props.changeStage('signIn');
    }, 1000)
  };
  return (
      <Grid container spacing={2} direction='column'>
        <Grid >
          <h2 style={{textAlign: 'center', margin: '0 0 30px 0'}}>Reset password</h2>
        </Grid>
        <Grid item>
          <TextField
          variant='outlined'
          required
          fullWidth
          label='Enter email'
          error={ errors }
          onChange={ e => {
            setEmail({email: e.target.value});
            setErrors(false);
          }}
          />
          {message ?  <p>{message}</p> : null}
        </Grid>
        <Grid item>
          <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleClick}
        >
          Reset password
        </Button>
        </Grid>
        <Grid item >
          <Link href="#" variant="body2" onClick={() => props.changeStage('signIn')}>
            Back to sign in
          </Link>
        </Grid>
      </Grid>
  );
};

const fetchData = async (address, data) => {
  const response = await fetch( address, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};
export default PasswordResetForm;
