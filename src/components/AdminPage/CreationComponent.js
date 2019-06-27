import  React, { useState } from 'react';
import CreateModalDialog from './CreateModalDialog';

const CreationComponent = (props) => {
  const [ stage, setStage ] = useState(0);
  return (
    <>
      <CreateModalDialog
        open={props.open}
        setOpen={props.setOpen}
        data={props.data[props.value]}
      />
    </>
  );
};

export default CreationComponent;
