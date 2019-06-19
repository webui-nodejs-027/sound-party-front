import React, {useState} from 'react';
import { Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

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
    }
  })
);

const Profile = (props) => {
  const [ readonly, setReadonly ] = useState(false);
  const classes = useStyles();
  const profileFields = Object.entries(props.user);
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
  return (
    <div className={classes.container}>
      <Card className={classes.list}>{fields}</Card>
    </div>
  );
};

export default Profile;
