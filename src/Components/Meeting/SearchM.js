import React, {Fragment} from 'react';
import {
    Grid,
    Select,
    MenuItem,
    Fab,
} from '@material-ui/core';
import EnhancedTable from './MeetingTable1'
import SearchIcon from '@material-ui/icons/Search';
import DropSelect from './AsyncSelect';
// import Button from '@material-ui/core/Button';
import PopupCreateMeeting from './popupCreateMeeting'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const customSelStyles = theme => ({
    custSel: {
        border: '1px solid',
        borderColor: 'rgb(204, 204, 204)',
        borderRadius: '4px',
        minHeight: '38px',
    }
});

const searchMStyles = theme => ({
   searchContainer: {
       display: 'grid',
   },
    searchElement: {
    }
});



// const GreenCheckbox = withStyles({
//     root: {
//         color: green[400],
//         '&$checked': {
//             color: green[600],
//         },
//     },
//     checked: {},
// })(props => <Checkbox color="default" {...props} />);

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

class SearchM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData: {
                genre: null,
                status: null,
                city: null,
                author: null
            },

            genres: [],
            statuses: [],
            meetingsData: null,
            rowsPerPageOptions: [10, 20, 30],
            rowsPerPage: 10,
            page: 1,
            sortBy: {
                param: 'dateTime',
                order: 'ASC'
            },
            showOnlyOwnMeetings: false,
            showOnlyCreatedMeetings: false
        };

        this.getUserId = this.getUserId.bind(this);

        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangeSort = this.handleChangeSort.bind(this);
        this.handleJoinMeeting = this.handleJoinMeeting.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleChangeShowOnlyOwn = this.handleChangeShowOnlyOwn.bind(this);
        this.handleChangeShowOnlyCreated = this.handleChangeShowOnlyCreated.bind(this);
    }

    getUserId = () => {
        const payload = localStorage
            .getItem('token')
            .split('.')[1];
        return JSON.parse(atob(payload)).id;
    };

    handleChangeShowOnlyCreated(e){
        this.setState(state => {
            return {
                showOnlyCreatedMeetings: !state.showOnlyCreatedMeetings
            }
        })
    }

    handleChangeShowOnlyOwn(e) {
        this.setState(state => {
            return {
                showOnlyOwnMeetings: !state.showOnlyOwnMeetings
            }
        })
    }

    handleCreateClick(e) {
    }

    handleJoinMeeting( meetingId, index, e){
        const userId = this.getUserId();
        //const userId = 2;
        const data = JSON.stringify({
           meetingId: meetingId
        });
        fetch( `http://localhost:3001/api/users/${userId}/subscribeOnMeeting`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
        }).then(res =>{
            if(res.status === 500) {
                alert('You have already joined this meeting')
            } else {
                alert('Thanks for joining!');
                return res.json();}
        }
            )
            .then(res => {
            })
    }

    handleChangeSort(e) {
        try {


            let newParam = e.target.innerText.toLowerCase();
            if (newParam === 'meeting') {
                newParam = 'name';
            }
            if (newParam === 'date') {
                newParam = 'dateTime';
            }
            const newOrder = this.state.sortBy.order === 'ASC' ? 'DESC' : 'ASC';

            let query = `page=1&limit=${this.state.rowsPerPage}&sortBy=${newParam}&order=${newOrder}`;
            const data = Object.entries(this.state.currentData);
            data.forEach((item) => {
                if (item[1] !== null) {
                    query = `${query}&${item[0]}=${item[1].name}`;
                }
            });
            fetch(
                `http://localhost:3001/api/meetings?${query}`
            )
                .then(res => res.json())
                .then(res => {

                    this.setState(oldState => {
                        return {
                            sortBy: Object.assign(oldState.sortBy, {
                                order: newOrder,
                                param: newParam
                            }),
                            meetingsData: res
                        }
                    })
                });
        } catch(e){}
    }

    handleChangeRowsPerPage(e) {
        let query = `page=1&limit=${e.target.value}&sortBy=${this.state.sortBy.param}&order=${this.state.sortBy.order}`;
        let data = Object.entries(this.state.currentData);
        data.forEach((item)=> {
            if(item[1] !== null) {
                query = `${query}&${item[0]}=${item[1].name}`;
            }
        });

        fetch(
            `http://localhost:3001/api/meetings?${query}`
        )
            .then(res => res.json())
            .then(res => {
                this.setState({
                    meetingsData: res,
                    rowsPerPage: e.target.value,
                    page: 1
                });
            });
    }

    handleChangePage(e, page){
        e.preventDefault();

        let query = `page=${page+1}&limit=${this.state.rowsPerPage}&sortBy=${this.state.sortBy.param}&order=${this.state.sortBy.order}`;
        const data = Object.entries(this.state.currentData);
        data.forEach((item)=> {
            if(item[1] !== null) {
                query = `${query}&${item[0]}=${item[1].name}`;
            }
        });

        fetch(
            `http://localhost:3001/api/meetings?${query}`
        )
            .then(res=>res.json())
            .then(result => {
                this.setState({
                    meetingsData: result,
                    page: page+1,
                });
            });
    }

    handleClick(e) {
        e.preventDefault();

            let query = `page=${this.state.page}&limit=${this.state.rowsPerPage}&sortBy=${this.state.sortBy.param}&order=${this.state.sortBy.order}`;
            const data = Object.entries(this.state.currentData);
            data.forEach((item)=> {
                if(item[1] !== null) {
                    query = `${query}&${item[0]}=${item[1].name}`;
                }
            });
        fetch(
            `http://localhost:3001/api/meetings?${query}`
        )
            .then(res=>res.json())
            .then(result => {
                this.setState({
                    meetingsData: result
                });
            });
    }

    handleAuthorChange(option){
        this.setState(oldState => {
            return {
                currentData: Object.assign(oldState.currentData, {author: option})
            }
        });
    }

    handleCityChange(option){
        this.setState(oldState => {
            return {
                currentData: Object.assign(oldState.currentData, {city: option})
            }
        });
    }

    handleStatusChange(e) {
        this.setState(oldState => {
            return {
                currentData: Object.assign(oldState.currentData, {status: e.target.value})
            }
        });
        e.preventDefault();
    }

    handleGenreChange(e) {
        this.setState(oldState => {
            return {
                currentData: Object.assign(oldState.currentData, {genre: e.target.value})
            }
        });
        e.preventDefault();

    }

    componentDidMount() {
        fetch(
            `http://localhost:3001/api/genres?page=1&limit=30`,
            {
                method: 'GET'
            })
            .then(res => res.json())
            .then(res => {
                this.setState({
                        genres: res.data
                });
            });

        fetch(
            `http://localhost:3001/api/statuses?page=1&limit=30`,
            {
                method: 'GET'
            })
            .then(res => res.json())
            .then(res => {
                this.setState({
                        statuses: res.data
                });
            });

        fetch(
            `http://localhost:3001/api/meetings?page=${this.state.page}&limit=${this.state.rowsPerPage}`
        )
            .then(res => res.json())
            .then(res => {
                this.setState({
                    meetingsData: res
                });
            });

    }

    componentDidUpdate() {
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Grid
                        item
                        xs={2}
                        className={classes.searchElement}
                    >
                        <CustomSelect
                        value={this.state.currentData.genre || '' }
                        type='genre'
                        name='Genre'
                        array={this.state.genres}
                        handleChange={this.handleGenreChange}
                    />
                    </Grid>
                    <Grid item xs={2}>

                        <DropSelect
                            placeholder='Author'
                            type='authors'
                            handleChange={this.handleAuthorChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                    <CustomSelect
                    value={this.state.currentData.status || ''}
                    type='status'
                    name='Status'
                    array={this.state.statuses}
                    handleChange={this.handleStatusChange}
                />
                    </Grid>
                    <Grid item xs={2}>

                    <DropSelect
                    placeholder='City'
                    type='cities'
                    handleChange={this.handleCityChange}
                />
                    </Grid>
                <Grid item xs={2}>
                <Fab onClick={this.handleClick}>
                    <SearchIcon color='primary'/>
                </Fab>
                </Grid>
                </Grid>

                {/*<Button*/}
                    {/*onClick={this.handleCreateClick}*/}
                    {/*variant="contained"*/}
                    {/*color="primary"*/}
                {/*>*/}
                    {/*Create*/}
                {/*</Button>*/}
                <PopupCreateMeeting
                    genres={this.state.genres}
                    statuses={this.state.statuses}
                />
                {/*<FormControlLabel*/}
                    {/*control={*/}
                        {/*<GreenCheckbox*/}
                            {/*checked={this.state.showOnlyOwnMeetings}*/}
                            {/*onChange={this.handleChangeShowOnlyOwn}*/}
                            {/*value="checkedG"*/}
                        {/*/>*/}
                    {/*}*/}
                    {/*label="Show only mine"*/}
                {/*/>*/}
                {/*<FormControlLabel*/}
                    {/*control={*/}
                        {/*<GreenCheckbox*/}
                            {/*checked={this.state.showOnlyCreatedMeetings}*/}
                            {/*onChange={this.handleChangeShowOnlyCreated}*/}
                            {/*value="checkedG"*/}
                        {/*/>*/}
                    {/*}*/}
                    {/*label="Show only created by me"*/}
                {/*/>*/}
            <EnhancedTable
                rows={this.state.meetingsData ? this.state.meetingsData.data : []}
                handleChangePage={this.handleChangePage}
                page={this.state.page-1}
                rowsPerPageOptions={this.state.rowsPerPageOptions}
                rowsPerPage={this.state.rowsPerPage}
                count={this.state.meetingsData ? this.state.meetingsData.total : 10}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                handleChangeSort = {this.handleChangeSort}
                direction = {this.state.sortBy.order}
                handleJoinMeeting = {this.handleJoinMeeting}
                // rowsCount={
                //     this.state.meetingsData
                //         ?
                //     this.state.meetingsData.data.length
                //         :
                //         10
                // }
            />
            </Fragment>
    )
    }
}

export default withStyles(searchMStyles)(SearchM);
