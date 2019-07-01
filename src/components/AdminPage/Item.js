import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ModalDialog from '../ModalDialog/ModalDialog';
import * as moment from 'moment';

const useStyle = makeStyles(() => ({
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
    flexDirection: 'column'
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
}));

const relations = {
  city: 'cityId',
  genre: 'genreId',
  author: 'authorId',
  status: 'statusId',
  role: 'roleId'
};

const Item = props => {
  const classes = useStyle();
  const [values, setValues] = useState({});
  const [err, setErr] = useState(false);
  const { id } = props.data;

  useEffect(() => {
    setErr(false);
    setValues({});
  }, [props.address]);

  const handleFetch = async (address, method, body = null) => {
    const response = await fetch(address, {
      method: method,
      body: body ? JSON.stringify(body) : null
    });
    return response.json();
  };

  const handleFileFetch = async (id, file) => {
    const data = new FormData();
    data.append('fileName', file);
    const response = await fetch(`${props.address}/${id}/upload-file`, {
      method: 'PUT',
      body: data
    });
    return response.json();
  };

  const handleDelete = async () => {
    await handleFetch(`${props.address}/${id}`, 'DELETE');
    props.setReload(Math.random());
  };

  const handleSave = async () => {
    const body = { ...props.data };
    for (let key in body) {
      if (relations[key] && body[key]) {
        body[relations[key]] = body[key].id;
      }
    }
    const changedBody = { ...body, ...values };

    //Remove one of fields from meeting because of backend requirements
    if (changedBody.genreId && changedBody.authorId && changedBody.um)
      delete changedBody.authorId;

    const data = {
      name: changedBody.name,
      year: changedBody.year,
      authorId: changedBody.authorId,
      genreId: changedBody.genreId
    };

    if (typeof changedBody.source === 'string') {
      const result = await handleFetch(`${props.address}/${id}`, 'PUT', data);
      if (result.errors) {
        return setErr(result['errors'][0].msg || result.errors);
      }
    } else if (Object.keys(values).length === 1 && typeof changedBody.source === 'object') {
      const resultFile = await handleFileFetch(id, changedBody.source);
      if (resultFile.errors) {
        return setErr(resultFile['errors'][0].msg || resultFile.errors);
      }
    } else if (Object.keys(values).length === 5 && typeof changedBody.source === 'object') {
      const resultFile = await handleFileFetch(id, changedBody.source);
      if (resultFile.errors) {
        return setErr(resultFile['errors'][0].msg || resultFile.errors);
      }
      const result = await handleFetch(`${props.address}/${id}`, 'PUT', data);
      if (result.errors) {
        return setErr(result['errors'][0].msg || result.errors);
      }
    } else if (Object.keys(values).length >= 1 && Object.keys(values).length < 5 && typeof changedBody.source === 'object') {
      const resultFile = await handleFileFetch(id, changedBody.source);
      if (resultFile.errors) {
        return setErr(resultFile['errors'][0].msg || resultFile.errors);
      }
      const result = await handleFetch(`${props.address}/${id}`, 'PUT', data);
      if (result.errors) {
        return setErr(result['errors'][0].msg || result.errors);
      }
    } else {
      const result = await handleFetch(`${props.address}/${id}`, 'PUT', changedBody);
      if (result.errors) {
        return setErr(result['errors'][0].msg || result.errors);
      }
    }
    setValues({});
    props.setOpen(false);
    props.setReload(Math.random());
  };

  const handleChange = e => {
    setErr(false);
    let name = relations[e.target.name] || e.target.name;
    let year = null;
    let file = null;
    if (name === 'year') {
      year = Number(e.target.value);
    }
    if (name === 'source') {
      file = e.target.files[0];
    }
    setValues({ ...values, [name]: year || file || e.target.value });
  };

  const handleCustomSelectChange = (e, name) => {
    setErr(false);
    const relName = relations[name] ? relations[name] : name;
    const relId = e ? e.id : null;
    setValues({ ...values, [relName]: relId });
  };

  const handleClose = () => props.setOpen(false);

  const view = { ...props.data };
  const { um, ...noUmView } = view;
  const data = Object.entries(noUmView).map((el, index) => {
    let content;
    if (!el[1]) {
      return null;
    } else if (el[0] === 'dateTime') {
      content = moment(el[1]).format();
    } else {
      content = typeof el[1] === 'object' ? el[1].name : el[1];
    }
    return (
      <div key={index} className={classes.container}>
        <h4 className={classes.header}>{el[0]}:</h4>
        <p className={classes.text}>{content}</p>
      </div>
    );
  });

  return (
    <div className={classes.itemBox}>
      <div>{data}</div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="contained"
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
          handleCustomSelectChange={handleCustomSelectChange}
          handleSave={handleSave}
          handleChange={handleChange}
        />
        <Button
          color="secondary"
          variant="contained"
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
