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

const SongModalDialog = (props) => {
  const { data } = props;
  const InputFields = data[0] ? Object.entries(data[0])
    .map((el, index) => el[0] === 'id' ? null :
      (
        <ListItem style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'}}
        >
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
      )
    ) :
    <p>Loading</p>
  ;
  const errorMessage = props.err ? <p style={{color: 'red'}}>{props.err}</p> : null;
  return (
    <Dialog style={{height: '600px'}} aria-labelledby="simple-dialog-title" open={ props.open }>
      <List style={{width: '400px'}}>
        {InputFields}
        <ListItem>
          {/*{errorMessage}*/}
        </ListItem>
        <ListItem button >
          <ListItemAvatar>
            <Avatar>
              <AddIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add"/>
        </ListItem>
        <ListItem button onClick={() => props.setOpen(false)}>
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

export default SongModalDialog;
