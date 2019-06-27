import React, {useState} from 'react';
import {Button, ExpansionPanel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ModalDialog from '../ModalDialog/ModalDialog';

const useStyle = makeStyles(()=> (
  {
    itemBox: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    container: {
      display: 'flex',
      flexDirection: 'row'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      width: '100px',
      margin: '5px'
    },
    header: {
      margin: '0 10px 0 0'
    },
    text: {
      margin: 0
    }
  }
));



const Item = (props) => {
  const classes = useStyle();
  const [ values, setValues ] = useState({});
  const [ err, setErr ] = useState(false);
  const { id }= props.data;

  const handleFetch = async (address, method, body = null) => {
    const response = await fetch( address, {
      method: method,
      body: body ? JSON.stringify(body) : null
    });
    return response.json();
  };

  const handleDelete = async () => {
    await handleFetch(`${props.address}/${id}`, 'DELETE');
    props.setReload(Math.random());
  };

  const handleSave = async () => {
    const body = {...props.data, ...values};
    const result = await handleFetch(`${props.address}/${id}`, 'PUT', body);
    if (result.errors) return setErr('error');
    props.setOpen(false);
    props.setReload(Math.random());
    setValues({});
  };

  const handleChange = (e) => {
    setValues({...values,[e.target.name]: e.target.value});
    setErr(false);
  };

  const handleClose = () => props.setOpen(false);

  const data = Object
    .entries(props.data)
    .map((el, index) => (
      <div
        key={index}
        className={classes.container}
      >
        <h4
          className={classes.header}
        >
          {el[0]}:
        </h4>
        <p
          className={classes.text}
        >
          {typeof el[1] === 'object' ? el[1].name : el[1]}
        </p>
      </div>
    ));

  return (
    <div className={classes.itemBox}>
      <div>
        {data}
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color='primary'
          variant='contained'
          className={classes.button}
          onClick={() => props.setOpen(true)}
        >
          Edit
        </Button>
        <ModalDialog
          open={props.open}
          data={props.data}
          err={err}
          handleClose={handleClose}
          handleSave={handleSave}
          handleChange={handleChange}
        />
        <Button
          color='secondary'
          variant='contained'
          className={classes.button}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Item;
