import React, { useState } from 'react';
import {
  Card,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ModalDialog from '../ModalDialog/ModalDialog';
const userAddress = 'http://localhost:3001/api/users';
const changePasswordAddress = 'http://localhost:3001/api/users/changePassword';
const useStyles = makeStyles(() =>
  ({
    container: {
      backgroundColor: '#cce6ff',
      height: 'calc(100vh - 64px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      width: '500px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px'
    },
    textField: {
      width: '300px',
      margin: '5px 0',
    },
    button: {
      margin: '5px',
      width: '200px'
    }
  })
);

const Profile = (props) => {
  const classes = useStyles();
  const [ open, setOpen ] = useState({
    change: false,
    changePassword: false,
    del: false
  });
  const [ err, setErr ] = useState(false);
  const { user } = props;
  delete user.id;
  delete user.roleId;
  const { firstName, lastName, socialLink } = user;
  const changeableUser = { firstName, lastName, socialLink};
  const [ values, setValues ] = useState(changeableUser);
  const [ password, setPassword ] = useState({oldpassword: '', password: ''});
  const profileFields = Object.entries(user);

  const getUserId = () => {
    const payload = localStorage
      .getItem('token')
      .split('.')[1];
    return JSON.parse(atob(payload)).id;
  };

  const splitName = (string) => {
    const strArr = string.split('');
    return strArr.reduce((acc, el) => {
      return el === el.toUpperCase() ? acc + ` ${el.toLowerCase()}` : acc + el;
    }, '')
  };

  const fields = profileFields.map(el => {
    return (
        <TextField
          className={classes.textField}
          key={el[0]}
          label={splitName(el[0])}
          value={el[1]}
          variant='outlined'
        >
        </TextField>
    );
  });

  const handleFetch = async (address, method, body = null) => {
    const response = await fetch( address, {
      method: method,
      body: body ? JSON.stringify(body) : null
    });
    return response.json();
  };

  const handleDelete = async () => {
    const result = await handleFetch(`${userAddress}/${getUserId()}`, 'DELETE');
    window.location.replace('/');
  };

  const handleSave = async () => {
    setErr(false);
    const result = await handleFetch(`${userAddress}/${getUserId()}`, 'PUT', values);
    if (result.errors) return setErr('error');
    setOpen({[window] : false});
    props.setReload(Math.random());
  };

  const changePassword = async () => {
    setErr(false);
    const body = {...password, id: getUserId()};
    const result = await handleFetch(changePasswordAddress, 'POST', body);
    if (result.errors) return setErr('error');
    setOpen({ [window] : false});
  };

  const handleChange = (e, window) => {
    switch (window) {
      case 'change':
        setValues({...values,[e.target.name]: e.target.value});
        break;
      case 'changeP':
        setPassword({...password, [e.target.name]: e.target.value});
        break;
    }
    setErr(false);
  };


  const handleClose = window => setOpen({...open, [window]: false});

  return (
    <div className={classes.container}>
      <Card className={classes.list}>
        {fields}
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={() => setOpen({...open, change: true})}
        >
          Edit profile
        </Button>
        <ModalDialog
          open={open.change}
          data={values}
          err={err}
          window='change'
          handleClose={handleClose}
          handleSave={handleSave}
          handleChange={handleChange}
        />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={() => setOpen({...open, changeP: true})}
        >
          Change password
        </Button>
        <ModalDialog
          open={open.changeP}
          data={password}
          err={err}
          window='changeP'
          handleClose={handleClose}
          handleSave={changePassword}
          handleChange={handleChange}
        />
        <Button
          className={classes.button}
          variant='contained'
          color='secondary'
          onClick={() => setOpen({...open, del: true})}
        >
          Delete profile
        </Button>
        <Dialog
          open={open.del}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete profile ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action will remove all your data from server
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('del')} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
};

export default Profile;
