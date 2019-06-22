import React from 'react';
import './samePeople.css';

const Info = (props) => {
    return <>
        <span className='blue'> {props.name} </span> : {props.value}
    </>
};

class UserInformation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = this.props.user.user;
        let userInformation = [];
        let key = 0;
        for (let i in user) {
            if (i !== 'id')
                userInformation = [...userInformation, <li className='userSong-li' key={key}><Info name={i} value={user[i]}/></li>];
            key++;
        }

        return (<>
            <ul className='information-user_ul'>
                {userInformation}
            </ul>
        </>);
    }

}


export default UserInformation;
