import React, {useEffect, useState} from 'react';
import ModalDialog from '../ModalDialog/ModalDialog';

const relations = {
  city: 'cityId',
  genre: 'genreId',
  author: 'authorId',
  status: 'statusId',
  role: 'roleId'
};

const CreationComponent = (props) => {
  const [ entity, setEntity ] = useState({});
  const [ err, setErr ] = useState(false);

  useEffect(() => {
    setErr(false);
    setEntity({});
  }, [props.address]);

  const dataCopy = {...props.data[props.value][0]};
  delete dataCopy.id;
  const handleFetch = async (address, body) => {
    const response = await fetch( address, {
      method: 'POST',
      body: JSON.stringify(body)
    });
    return response.json();
  };

  const handleChange = (e) => {
    setErr(false);
    let name = relations[e.target.name] || e.target.name ;
    setEntity({...entity, [ name ]: e.target.value});
  };

  const handleCustomSelectChange = (e, name) => {
    setErr(false);
    setEntity({...entity, [relations[name]]: e.id});
  };

  const handleSave = async () => {
    const result = await handleFetch(props.address, entity);
    if (result.errors) return setErr('error');
    setEntity({});
    props.setOpen(false);
    props.setReload(Math.random());
  };

  const handleClose = () => props.setOpen(false);

  return (
      <ModalDialog
        open={props.open}
        handleClose={handleClose}
        data={dataCopy}
        handleChange={handleChange}
        handleCustomSelectChange={handleCustomSelectChange}
        handleSave={handleSave}
        err={err}
      />
  );
};

export default CreationComponent;
