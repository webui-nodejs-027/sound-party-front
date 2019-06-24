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
                <DialogTitle id="alert-dialog-title">Please, fill ALL of the fields</DialogTitle>
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

class CustomSelect extends React.Component {

    render() {
        return (<Fragment>
                <InputLabel htmlFor={this.props.type}>{this.props.type}</InputLabel>
                <Select
                    value={this.props.value}
                    inputProps={
                        {name: this.props.type}
                    }
                    onChange={this.props.handleChange}
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
            </Fragment>
        )
    }
}

export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            title: props.meeting ? props.meeting.meeting : '',
            address: props.meeting ? props.meeting.address : '',
            genre: props.meeting ? props.meeting.genre : '',
            status: props.meeting ? props.meeting.status : '',
            author: props.meeting ? props.meeting.author : '',
            city: props.meeting ? props.meeting.city : '',
            id: props.meeting ? props.meeting.id : '',
            date: props.meeting ? props.meeting.date : '',
            showCreateError: false,
            meeting: props.meeting ? props.meeting : 'lala',
        };

        this.getUserId = this.getUserId.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        // this.handleReset = this.handleReset.bind(this);
        this.handleCreateErrorClose = this.handleCreateErrorClose.bind(this);
        this.handleCreateErrorClick = this.handleCreateErrorClick.bind(this);
    }

    componentDidUpdate() {
        console.log('update');
    }

    componentDidMount() {
        console.log('mount');
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

    handleDateChange(e) {
        if( e.target.value ){
            const stringEnding = ':00.000Z';
            const date = new Date(e.target.value + stringEnding).toISOString();
            this.setState({
                date,
            });
            console.log('date',this.state.date);
        }
    }

    handleUpdateClick() {
        try {
            const data = JSON.stringify({
                name: this.state.title ? this.state.title : '',
                dateTime: this.state.date ? this.state.date : '',
                cityId: this.state.city ? this.state.city.id: '',
                address: this.state.address ? this.state.address: '',
                statusId: this.state.status ? this.state.status.id: '',
                genreId: this.state.genre ? this.state.genre.id : '',
            });


            console.log('data', data);

            fetch(`http://localhost:3001/api/meetings/${this.props.meeting ? this.props.meeting.id : ''}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
                .then(res => res.json())
                .then(res => {
                    console.log('result:', res);
                })
        }
        catch(e){
            if(e.message === 'Cannot read property \'id\' of null')//возможна и другая ошибка
                this.setState({
                    showCreateError: true
                })
            console.log(e);

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

    handleStatusChange(option) {
        this.setState({
            status: option
        })
    }

    handleGenreChange(option) {
        this.setState({
            genre: option
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

    // handleClose() {
    //     this.setState({
    //         open: false
    //     })
    // }
    render(){
        console.log('state meeting from popup', this.state.meeting);
        const meeting = this.props.meeting;
        console.log(' meeting from popup', meeting);
        const status = meeting ? meeting.status: 'lalal';
        const statusId = status ? status.id: 'lalal';
        console.log(statusId);

        const genreDef = this.state.genre ? this.state.genre.name : '';

        console.log(this.state.genre ? this.state.genre: 'lalalalallalala');

        return (
            <div>
                {/*<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>*/}
                    {/*Update meeting*/}
                {/*</Button>*/}
                <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Meeting</DialogTitle>
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
                            defaultValue={meeting.meeting ? meeting.meeting : ''}
                            value = {this.state.title}
                            onChange={this.handleTitleChange}
                        />
                        <TextField
                            margin="dense"
                            id="address"
                            label="Address"
                            type="text"
                            fullWidth
                            defaultValue = {meeting.address ? meeting.address : ''}
                            value={this.state.address}
                            onChange={this.handleAddressChange}
                        />
                        <DropSelect
                            defaultInputValue={meeting.genre? meeting.genre.name: ''}
                            value={this.state.genre}
                            placeholder='Genre'
                            type='genres'
                            handleChange={this.handleGenreChange}
                        />
                        <DropSelect
                            defaultInputValue={meeting.status? meeting.status.name: ''}
                            value={this.state.status}
                            placeholder='Status'
                            type='statuses'
                            handleChange={this.handleStatusChange}
                        />
                        <DropSelect
                            defaultInputValue={meeting.author ? meeting.author.name : ''}
                            value={this.state.author}
                            placeholder='Author'
                            type='authors'
                            handleChange={this.handleAuthorChange}
                        />
                        <DropSelect
                            defaultInputValue={meeting.city? meeting.city.name: ''}
                            value={this.state.city}
                            placeholder='City'
                            type='cities'
                            handleChange={this.handleCityChange}
                        />
                        <DateAndTimePickers
                             date={meeting.date ? new Date(meeting.date).toISOString().slice(0, -8) : ''}
                            onChange={this.handleDateChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleReset}
                                color="primary"
                        >
                            Reset
                        </Button>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleUpdateClick} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>

                <AlertDialog
                    onClose={this.handleCreateErrorClose}
                    onClick={this.handleCreateErrorClick}
                    open={this.state.showCreateError}
                />

            </div>
        );
    }

}
