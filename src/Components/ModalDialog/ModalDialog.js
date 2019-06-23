import React from 'react';
import {
  Dialog,
  List,
  ListItem,
  TextField,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import {
  Add as AddIcon,
  Home as HomeIcon
} from '@material-ui/icons';
import DropSelect from '../Meeting/AsyncSelect'

const ModalDialog = (props) => {
  const { data } = props;
  const InputFields = Object.entries(data)
    .map((el, index) => {
      switch (el[0]) {
        case 'id':
          return null;
        default:
            return (
              <ListItem style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <TextField
                  required
                  label={el[0]}
                  name={el[0]}
                  margin="normal"
                  variant="outlined"
                  key={data.id + index}
                  style={{ width: '300px' }}
                  onChange={ e => props.handleChange(e, props.window)}
                />
              </ListItem>
            );
      }
    }
  );
  const errorMessage = props.err ? <p style={{color: 'red'}}>{props.err}</p> : null;
  return (
    <Dialog style={{height: '600px'}} aria-labelledby="simple-dialog-title" open={ props.open }>
      <List style={{width: '400px'}}>
        {InputFields}
        <ListItem>
          {errorMessage}
        </ListItem>
        <ListItem button onClick={(e) => props.handleSave(e, props.window)}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Save"/>
        </ListItem>
        <ListItem button onClick={() => props.handleClose(props.window)}>
          <ListItemAvatar>
            <Avatar>
              <HomeIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Exit" />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default ModalDialog;
