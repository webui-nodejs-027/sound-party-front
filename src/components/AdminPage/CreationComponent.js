import React, { useEffect, useState } from 'react';
import ModalDialog from '../ModalDialog/ModalDialog';

const songFileAdr = 'http://localhost:3001/api/songs/upload-file';

const relations = {
  city: 'cityId',
  genre: 'genreId',
  author: 'authorId',
  status: 'statusId',
  role: 'roleId'
};


const CreationComponent = props => {
  const [entity, setEntity] = useState({});
  const [err, setErr] = useState(false);
  const [idFile, setIdFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);

  useEffect(() => {
    setErr(false);
    setEntity({});
  }, [props.address]);

  const dataCopy = { ...props.data[props.value][0] };
  delete dataCopy.id;
  const handleFetch = async (address, body) => {
    const response = await fetch(address, {
      method: 'POST',
      body: JSON.stringify(body)
    });
    return response.json();
  };

  const handleFileFetch = async (id, file) => {
    const data = new FormData();
    data.append('id', id);
    data.append('fileName', file);
    const response = await fetch(songFileAdr, {
      method: 'POST',
      body: data
    });
    return response.json();
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
    setEntity({ ...entity, [name]: year || file || e.target.value });
  };

  const handleCustomSelectChange = (e, name) => {
    setErr(false);
    setEntity({ ...entity, [name]: e.id });
  };

  const handleSave = async () => {
    if (props.value === 'songs') {
      if(!entity.source) {
        return setErr('File doesn\'t exist');
      }
      if (!uploadStatus) {
        const data = {
          name: entity.name,
          year: entity.year,
          authorId: entity.authorId,
          genreId: entity.genreId
        };
        const result = await handleFetch(props.address, data);
        if (result.errors) {
          return setErr(result['errors'][0].msg || result.errors);
        }
        const resultFile = await handleFileFetch(result.id, entity.source);
        if (resultFile.errors) {
          setIdFile(result.id);
          setUploadStatus(true);
          return setErr(resultFile['errors'][0].msg || resultFile.errors);
        }
      } else {
        const resultFile = await handleFileFetch(idFile, entity.source);
        if (resultFile.errors) {
          return setErr(resultFile['errors'][0].msg || resultFile.errors);
        }
        setUploadStatus(false);
      }
    } else {
      const result = await handleFetch(props.address, entity);
      if (result.errors) {
        return setErr(result['errors'][0].msg || result.errors);
      }
    }
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
