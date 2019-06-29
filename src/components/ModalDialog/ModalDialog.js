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
import DropSelect from '../Meeting/AsyncSelect';
import DTPicker from "../AdminPage/DateTimePicker";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '300px',
    margin: '10px 0 10px 50px'
  }
}));

const ModalDialog = (props) => {
  const classes = useStyles();
  const { data } = props;
  const InputFields = Object.entries(data)
    .map((el, index) => {
      switch (el[0]) {
        case 'id':
        case 'um':
        case 'birthday':
        case 'gender':
          return null;
        case 'city':
          return (
            <Grid
              className={classes.grid}
              key={index}
            >
              <DropSelect
                type='cities'
                handleChange={e => props.handleCustomSelectChange(e, el[0])}
                placeholder={`${el[0]}Id`}
              />
            </Grid>
          );
        case 'status':
          return (
            <Grid
              className={classes.grid}
              key={index}
            >
              <DropSelect
                type='statuses'
                handleChange={e => props.handleCustomSelectChange(e, el[0])}
                placeholder={`${el[0]}Id`}
              />
            </Grid>
          );
        case 'author':
        case 'user':
        case 'genre':
          return (
            <Grid
              className={classes.grid}
              key={index}
            >
              <DropSelect
                type={el[0] + 's'}
                handleChange={e => props.handleCustomSelectChange(e, el[0])}
                placeholder={`${el[0]}Id`}
              />
            </Grid>
          );
        case 'authorId':
        case 'genreId':
        case 'roleId':
          return (
            <Grid
              className={classes.grid}
              key={index}
            >
              <DropSelect
                type={el[0].slice(0, -2) + 's'}
                handleChange={e => props.handleCustomSelectChange(e, el[0])}
                placeholder={`${el[0]}`}
              />
            </Grid>
          );
        case 'dateTime':
          return (
            <ListItem
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
              key={index}
            >
              <DTPicker
                handleChange={props.handleChange}
              />
            </ListItem>
          );
        default:
          return (
            <ListItem
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
              key={index}
            >
              <TextField
                required
                label={el[0]}
                name={el[0]}
                margin="normal"
                variant="outlined"
                style={{ width: '300px' }}
                onChange={ e => props.handleChange(e, props.window)}
              />
            </ListItem>
          )
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
