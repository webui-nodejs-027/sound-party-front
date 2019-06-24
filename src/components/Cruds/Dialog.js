import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import {blue} from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    spanClass: {
        color: "red",
        fontWeight: "bold",
        marginTop: '15px',
    },
    blue: {
        color: "blue",
        fontWeight: "bold",
        marginTop: '15px',
    }
});

function SimpleDialog(props) {
    const classes = useStyles();
    const {onClose, genre, title, deleteFrom, update, insert, tableName, ...other} = props;
    const [name, setName] = useState(genre.name);

    function HandleChangeName(e) {
        setName(e.target.value);
    }

    function handleClose() {
        onClose();
    }

    function handleAdd(name, id, tableName) {
        if (title !== 'Change') {
            insert(name, tableName);
        } else {
            const genre = {
                id: id,
                name: name,
            };
            update(genre, tableName);
        }
        onClose();
    }

    function handleDelete(id, tableName) {
        deleteFrom(id, tableName);
        onClose();
    }

    return (
        <Dialog onClose={handleClose} style={{height: '600px'}} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title">
                {title}
            </DialogTitle>
            <List>
                <ListItem>
                    <TextField
                        required
                        label="Required"
                        onChange={HandleChangeName}
                        defaultValue={name}
                        margin="normal"
                        variant="outlined"
                    />
                </ListItem>

                <ListItem button onClick={() => handleAdd(name, genre.id, tableName)}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Save"/>
                </ListItem>
                <ListItem button onClick={() => handleDelete(genre.id, tableName)}>
                    <ListItemAvatar>
                        <Avatar>
                            <DeleteIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Delete"/>
                </ListItem>
                <ListItem button onClick={() => handleClose()}>
                    <ListItemAvatar>
                        <Avatar>
                            <HomeIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Exit"/>
                </ListItem>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};

export default function SimpleDialogDemo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {insert, deleteFrom, update, title, genre, tableName} = props;
    const classForButton = title === 'Change' ? 'spanClass' : 'blue';

    function handleClickOpen() {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button fullWidth={true} className={classes[classForButton]} variant="outlined" onClick={handleClickOpen}>
                {genre.name}
            </Button>
            <SimpleDialog open={open}
                          genre={props.genre}
                          update={update}
                          deleteFrom={deleteFrom}
                          title={title}
                          insert={insert}
                          onClose={handleClose}
                          tableName={tableName}
            />
        </div>
    );
}
