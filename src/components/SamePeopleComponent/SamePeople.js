import React from 'react';
import SamePeopleView from './SamePeopleView';
import SameGanreSong from "./SameGanreSong";

export default class SamePeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sameUsers: [{
                user: {
                    id: '',
                    firstName: '',
                    lastName: '',
                },
                sameMusicPercent: '',
                songs: []
            }],
            myStats: [{
                user: {
                    id: null,
                    firstName: null,
                    lastName: null,
                },
                sameMusicPercent: null,
                songs: []
            }],
            errorState: false,
        }
    }

    async componentDidMount() {
        const responseUsers = await fetch('http://localhost:3001/api/users/getUsersPercent',{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        });
        const dataResponseUsers = await responseUsers.json();
        if(responseUsers.status === 400){
            this.setState({
                errorState : true
            });
        }
        this.setState({
            sameUsers: dataResponseUsers
        });

        const responseMyStats = await fetch('http://localhost:3001/api/users/getUsersMusicStats',{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        });
        const dataResponseMyStats = await responseMyStats.json();
        if(responseMyStats.status === 400){
            this.setState({
                errorState : true
            });
        }
        this.setState({
            myStats: dataResponseMyStats
        });
    }

    renderPeopleView(i) {
        return <SamePeopleView key={i} user={this.state.sameUsers[i]}/>
    }

    render() {
        if (this.state.errorState) {
            return (<>
                <h2 className='h2-genre'>Add music please</h2>
            </>)
        }
        else {
            console.log(this.state.sameUsers);
            const peopleView = this.state.sameUsers.map((value, index) => {
                return this.renderPeopleView(index);
            });

            return (
                <>
                    <h2 className='h2-genre'>My stats </h2>
                    <div className='genre-card__container'>
                        <SameGanreSong user={this.state.myStats[0]}/>
                    </div>
                    {peopleView}
                </>);
        }
    }
}
