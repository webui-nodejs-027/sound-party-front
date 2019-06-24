import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import {InputLabel, Select} from '@material-ui/core';
import DropSelect from './AsyncSelect'
import { makeStyles } from '@material-ui/core/styles';
import {withStyles} from "@material-ui/core/styles/index";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dateTextField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function AlertDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open} //open
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.message}</DialogTitle>
                <DialogActions>
                    <Button onClick={props.onClick} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


function DateAndTimePickers(props) {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                label="Выберите дату"
                type="datetime-local"
                defaultValue={props.date}
                className={classes.dateTextField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={props.onChange}
            />
        </form>
    );
}

const customSelStyles = theme => ({
    custSel: {
        border: '1px solid',
        borderColor: 'rgb(204, 204, 204)',
        borderRadius: '4px',
        minHeight: '38px',
    }
});

class CustomSel extends React.Component {

    render() {
        const {classes} = this.props;
        return (<Fragment>
                <div                     className={classes.custSel}
                >
                    {/*<InputLabel htmlFor={this.props.type}>{this.props.name}</InputLabel>*/}
                    <Select

                        classes={classes}
                        value={this.props.value}
                        inputProps={
                            {name: this.props.type,
                                id: this.props.type}
                        }
                        onChange={this.props.handleChange}
                        fullWidth
                    >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {
                            this.props.array.map(elem => {
                                return <MenuItem
                                    value={elem}
                                    key={elem.id}
                                >
                                    {elem.name}
                                </MenuItem>
                            })
                        }
                    </Select>
                </div>
            </Fragment>
        )
    }
}

const CustomSelect = withStyles(customSelStyles)(CustomSel);

export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            title: '',
            address: '',
            genre: null,
            // status: null,
            author: null,
            city: null,
            date: new Date().toISOString().slice(0, -8),
            showCreateError: false,
            showSuccesPopup: false,
        };

        this.getUserId = this.getUserId.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        // this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCreation = this.handleCreation.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCreateErrorClose = this.handleCreateErrorClose.bind(this);
        this.handleCreateErrorClick = this.handleCreateErrorClick.bind(this);
        this.handleCloseSuccessPopup = this.handleCloseSuccessPopup.bind(this);
    }

    handleCloseSuccessPopup() {
        this.setState({
            showSuccesPopup: false,
        });
        this.props.handleClose();
        this.handleReset();
    }

    handleCreateErrorClick(e) {
        this.setState({
            showCreateError: false
        });
    }

    handleCreateErrorClose(e) {
        this.setState({
            showCreateError: false
        });
    }


    getUserId = () => {
        const payload = localStorage
            .getItem('token')
            .split('.')[1];
        return JSON.parse(atob(payload)).id;
    };

    handleReset(e) {
        this.setState({
            title: '',
            address: '',
            genre: null,
            status: null,
            author: null,
            city: null,
            date: new Date().toISOString().slice(0, -8)
        })
    }

    handleDateChange(e) {
        if( e.target.value ){
            const stringEnding = ':00.000Z';
            const date = new Date(e.target.value + stringEnding).toISOString();
            this.setState({
                date,
            })
        }
    }

    handleCreation() {
try {
    const data = JSON.stringify({
        name: this.state.title,
        dateTime: this.state.date,
        cityId: this.state.city.id,
        address: this.state.address,
        genreId: this.state.genre.id,
        creatorId: this.getUserId() //1
    });

    fetch('http://localhost:3001/api/meetings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(res =>{
            if(res.status === 201) {
                this.setState({
                    showSuccesPopup: true,
                });
            }
            return res.json()
        } )
        .then(res => {
            this.setState({
                open: false,
            })
        })
} catch(e){
     if(e.message === 'Cannot read property \'id\' of null')
     this.setState({
         showCreateError: true
     })

}
    }

    handleCityChange(option) {
        this.setState({
            city: option
        })
    }

    handleAuthorChange(option){
        this.setState({
            author: option
        })
    }

    // handleStatusChange(e) {
    //     this.setState({
    //         status: e.target.value
    //     })
    // }

    handleGenreChange(e) {
        this.setState({
            genre: e.target.value
        })
    }

    handleAddressChange(e) {
        this.setState({
            address: e.target.value
        });
    }

    handleTitleChange(e) {
        this.setState({
           title: e.target.value
        });
    }

    handleClickOpen(){
        this.setState({
            open: true
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }
    render(){
        return (
            <Fragment>
                {/*<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>*/}
                    {/*Create meeting*/}
                {/*</Button>*/}
                <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Meeting</DialogTitle>
                    <DialogContent>
                        Please, fill all of the fields below
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value = {this.state.title}
                            onChange={this.handleTitleChange}
                        />
                        <TextField

                            margin="dense"
                            id="address"
                            label="Address"
                            type="text"
                            fullWidth
                            value = {this.state.address}
                            onChange={this.handleAddressChange}
                        />
                        <CustomSelect
                            placeholder='Genre'
                            style={{
                                width: '100%'
                            }}
                            value={this.state.genre}
                            type='genre'
                            array={this.props.genres}
                            handleChange={this.handleGenreChange}
                        />
                        {/*<CustomSelect*/}
                            {/*value={this.state.status}*/}
                            {/*type='status'*/}
                            {/*array={this.props.statuses}*/}
                            {/*handleChange={this.handleStatusChange}*/}
                        {/*/>*/}
                        <DropSelect
                            defaultValue={{value: 'lflf', label: 'AAAAa'}}
                            value={this.state.author}
                            placeholder='Author'
                            type='authors'
                            handleChange={this.handleAuthorChange}
                        />
                        <DropSelect
                            value={this.state.city}
                            placeholder='City'
                            type='cities'
                            handleChange={this.handleCityChange}
                        />
                        <DateAndTimePickers
                            date={this.state.date}
                        onChange={this.handleDateChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleReset} color="primary">
                            Reset
                        </Button>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreation} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>

                <AlertDialog
                    onClose={this.handleCreateErrorClose}
                    onClick={this.handleCreateErrorClick}
                    open={this.state.showCreateError}
                    message={'Please, fill ALL of the fields'}
                />

                <AlertDialog
                    onClose={this.handleCloseSuccessPopup}
                    onClick={this.handleCloseSuccessPopup}
                    open={this.state.showSuccesPopup}
                    message={`meeting '${this.state.title}' was created`}
                />

            </Fragment>
        );
    }

}
