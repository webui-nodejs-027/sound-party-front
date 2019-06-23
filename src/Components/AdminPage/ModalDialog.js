import React from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  TextField,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Home as HomeIcon
} from '@material-ui/icons';

const Dialog = (props) => {
  return (
    <Dialog style={{height: '600px'}} aria-labelledby="simple-dialog-title" open={ props.open }>
      <DialogTitle id="simple-dialog-title">
      </DialogTitle>
      <List>
        <ListItem>
          <TextField
            required
            label="Required"
            defaultValue={name}
            margin="normal"
            variant="outlined"
          />
        </ListItem>
        <ListItem button >
          <ListItemAvatar>
            <Avatar>
              <AddIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Save"/>
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <DeleteIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Delete"/>
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <HomeIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Exit" onClick={() => props.setOpen(false)}/>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default Dialog;
