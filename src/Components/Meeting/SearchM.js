import React, {Fragment} from 'react';
import {
    Grid,
    Select,
    MenuItem,
    Fab,
    FormControlLabel
} from '@material-ui/core';
import EnhancedTable from './MeetingTable1'
import SearchIcon from '@material-ui/icons/Search';
import DropSelect from './AsyncSelect';
import Button from '@material-ui/core/Button';
import PopupCreateMeeting from './popupCreateMeeting'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import PopupInfo from './PopupInfo';
import PopupJoin from './PopupJoin';
import PopupUpdateMeeting from './PopupUpdateMeeting';


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



const GreenCheckbox = withStyles({
    root: {
        // paddingLeft: '40px',
        color: '#3f51b5',
        '&$checked': {
            color: '#3f51b5',
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

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
            showOnlyCreatedMeetings: false,
            showInfo: false,
            currentMeeting: null,
            showJoinPopup: false,
            joinUnsubscribeToggle: null,
            showUpdatePopup: false,
            carMeet: null,
            showCreatePopup: false,
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
        this.handleClickInfo = this.handleClickInfo.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleChangeShowOnlyOwn = this.handleChangeShowOnlyOwn.bind(this);
        this.handleChangeShowOnlyCreated = this.handleChangeShowOnlyCreated.bind(this);
        this.handleCloseInfo = this.handleCloseInfo.bind(this);
        this.handleClickJoin = this.handleClickJoin.bind(this);
        this.handleClickCloseJoin = this.handleClickCloseJoin.bind(this);
        this.handleClickUnsubscribe = this.handleClickUnsubscribe.bind(this);
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
        this.handleCloseUpdatePopup = this.handleCloseUpdatePopup.bind(this);
        this.handleClickCreateMeeting = this.handleClickCreateMeeting.bind(this);
        this.handleCloseCreateMeeting = this.handleCloseCreateMeeting.bind(this);
    }

    handleClickCreateMeeting() {
        this.setState({
            showCreatePopup: true,
        });
    }

    handleCloseCreateMeeting() {
        this.setState({
           showCreatePopup: false,
        });
    }

    handleCloseUpdatePopup() {
        this.setState({
            showUpdatePopup: false,
        })
    }

    handleClickUpdate(e) {
        this.setState({
            showUpdatePopup: true,
        })
    }

    handleClickUnsubscribe(meetingId, e) {
        this.setState({
            showInfo: false,
            joinUnsubscribeToggle: 'unsubscribe'
        });
        const userId = this.getUserId();
        console.log(meetingId);
        const data = JSON.stringify({
            meetingId: meetingId
        });
        fetch( `http://localhost:3001/api/users/${userId}/unsubscribeFromMeeting`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
            .then(res => {
                console.log(res.status);
                return res.json()})
            .then(res => {
            this.setState({
                showJoinPopup: true,
            })
            })
    }

    handleClickCloseJoin(){
        this.setState({
            showJoinPopup: false,
            showInfo: false,
        })
    }

    handleCloseInfo() {
        this.setState({
            showInfo: false,
            //очистить все данные
        })
    }

    getUserId = () => {
        const payload = localStorage
            .getItem('token')
            .split('.')[1];
        return JSON.parse(atob(payload)).id;
    };

    handleChangeShowOnlyCreated(e){
        let query = `http://localhost:3001/api/meetings?page=1&limit=${this.state.rowsPerPage}&sortBy=${this.state.sortBy.param}&order=${this.state.sortBy.order}&userId=${this.getUserId()}`;
        let data = Object.entries(this.state.currentData);
        data.forEach((item)=> {
            if(item[1] !== null) {
                query = `${query}&${item[0]}=${item[1].name}`;
            }
        });
        if(!this.state.showOnlyCreatedMeetings) {
            query = `${query}&isCreator=true`
        }
        if(!this.state.showOnlyOwnMeetings){
            this.setState({
                showOnlyOwnMeetings: true
            })
        }
        fetch(query)
            .then(res => res.json())
            .then(res => {
                this.setState(state => {
                    console.log('res from getCreated:',res);
                    return {
                        showOnlyCreatedMeetings: !state.showOnlyCreatedMeetings,
                        meetingsData: res,
                        page: 1,
                    }
                })
            });
    }

    handleChangeShowOnlyOwn(e) {
        let query = `http://localhost:3001/api/meetings?page=1&limit=${this.state.rowsPerPage}&sortBy=${this.state.sortBy.param}&order=${this.state.sortBy.order}`;
        let data = Object.entries(this.state.currentData);
        data.forEach((item)=> {
            if(item[1] !== null) {
                query = `${query}&${item[0]}=${item[1].name}`;
            }
        });
        if(!this.state.showOnlyOwnMeetings) {
            query = `${query}&userId=${this.getUserId()}`
        }
        fetch(query)
            .then(res => res.json())
            .then(res => {
                this.setState(state => {
                    console.log('res from getOwn:',res);
                    return {
                        showOnlyOwnMeetings: !state.showOnlyOwnMeetings,
                        showOnlyCreatedMeetings: false,
                        meetingsData: res,
                        page: 1
                    }
                })
            });
    }

    handleCreateClick(e) {
    }

    handleClickInfo(id, row, e){
        console.log('row',row);
        fetch(`http://localhost:3001/api/meetings/${id}?userId=${this.getUserId()}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    curMeet: row,
                    currentMeeting: res,
                })
            })
            .then(a => {
                this.setState({
                    showInfo: true,
                })
            })
        ;
    }

    handleClickJoin( meetingId, index, e){
        this.setState({
            showInfo: false,
            joinUnsubscribeToggle: 'join',
        });
        const userId = this.getUserId();
        console.log(meetingId);
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
        })
            .then(res => {
                if(res.status !== 200 ) {
                    console.log('Ошибка подписки')
                }
                return res.json()} )
            .then(res => {
                this.setState({
                    showJoinPopup: true,
                })
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
            if(this.state.showOnlyOwnMeetings){
                query = `${query}&userId=${this.getUserId()}`
            }
            if(this.state.showOnlyCreatedMeetings){
                query = `${query}&isCreator=true`
            }

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

        if(this.state.showOnlyOwnMeetings){
            query =`${query}&userId=${this.getUserId()}`
        }

        if(this.state.showOnlyCreatedMeetings){
            query = `${query}&isCreator=true`
        }

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

        if(this.state.showOnlyOwnMeetings){
            query =`${query}&userId=${this.getUserId()}`
        }

        if(this.state.showOnlyCreatedMeetings){
            query = `${query}&isCreator=true`
        }

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
            console.log('1data from find', data);
            data.forEach((item)=> {
                if(item[1] !== null) {
                    query = `${query}&${item[0]}=${item[1].name}`;
                }
            });
        console.log('2data from find', data);

        if(this.state.showOnlyOwnMeetings){
            query =`${query}&userId=${this.getUserId()}`
        }

        if(this.state.showOnlyCreatedMeetings){
            query = `${query}&isCreator=true`
        }
        console.log('query', query);
        fetch(
            `http://localhost:3001/api/meetings?${query}`
        )
            .then(res=>res.json())
            .then(result => {
                console.log(result);
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
                <div style={{
                    marginTop: '30px',
                    marginBottom: '10px',
                }}>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    style={{
                        // paddingLeft: '20px',
                    }}
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
                <Fab
                    style={{
                        width: '38px',
                        height: '38px',
                    }}
                    onClick={this.handleClick}>
                    <SearchIcon
                        color='primary'/>
                </Fab>
                </Grid>
                    {/*<Grid item xs={2}>*/}
                        {/*<Button variant="contained" color="secondary" onClick={this.handleClickCreateMeeting}>*/}
                            {/*Create meeting*/}
                        {/*</Button>*/}

                    {/*</Grid>*/}
                </Grid>



                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    style={{
                        paddingTop: '20px',
                        paddingLeft: '20px'

                    }}
                >
                    <Grid item xs={10}>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            style={{
                                paddingLeft: '20px'

                            }}
                        >
                            <Grid item xs={3}>

                            <FormControlLabel
                        control={
                            <GreenCheckbox
                                checked={this.state.showOnlyOwnMeetings}
                                onChange={this.handleChangeShowOnlyOwn}
                                value="checkedG"
                            />
                        }
                        label="Show only mine"
                    />
                            </Grid>
                            <Grid item xs={4}>
                            {this.state.showOnlyOwnMeetings && <FormControlLabel
                            control={
                                <GreenCheckbox
                                    checked={this.state.showOnlyCreatedMeetings}
                                    onChange={this.handleChangeShowOnlyCreated}
                                    value="checkedG"
                                />
                            }
                            label="Show only created by me"
                        />
                        }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                    <Button variant="contained" color="secondary" onClick={this.handleClickCreateMeeting}>
                        Create meeting
                    </Button>
                    </Grid>

                </Grid>
                </div>




                {/*<Button*/}
                    {/*onClick={this.handleCreateClick}*/}
                    {/*variant="contained"*/}
                    {/*color="primary"*/}
                {/*>*/}
                    {/*Create*/}
                {/*</Button>*/}
                <PopupCreateMeeting
                    open={this.state.showCreatePopup}
                    handleClose={this.handleCloseCreateMeeting}
                    genres={this.state.genres}
                    statuses={this.state.statuses}
                />

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
                handleClickInfo = {this.handleClickInfo}
                // rowsCount={
                //     this.state.meetingsData
                //         ?
                //     this.state.meetingsData.data.length
                //         :
                //         10
                // }
            />
            <PopupInfo
                userId = {this.getUserId()}
                meeting = {this.state.currentMeeting}
            open={this.state.showInfo}
            onClickClose={this.handleCloseInfo}
                onClickJoin={this.handleClickJoin}
                onClickUnsubscribe={this.handleClickUnsubscribe}
                onClickUpdate={this.handleClickUpdate}
            />

                <PopupJoin
                onClickClose={this.handleClickCloseJoin}
                open={this.state.showJoinPopup}
                joinUnsubcribe={this.state.joinUnsubscribeToggle}
                />

                <PopupUpdateMeeting
                    open = {this.state.showUpdatePopup}
                    handleClose = {this.handleCloseUpdatePopup}
                    meeting={this.state.curMeet ? this.state.curMeet : 'papa'}
                />

            </Fragment>
    )
    }
}

export default withStyles(searchMStyles)(SearchM);
