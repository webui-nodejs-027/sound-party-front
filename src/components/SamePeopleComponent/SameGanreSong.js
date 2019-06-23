import React from 'react';
import './samePeople.css';

const Info = (props) => {
    return <>
        <p> {props.name} : {props.value}</p>
    </>
};

class SameGanreSong extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const songs = this.props.user.songs;
        const songInformation = songs.map((song, index) => {
            let songCard = [];
            for (let i in song) {
                if (i !== 'genreId')
                    songCard = [...songCard,
                        <div className='allWidth' key={i}><Info name={i} value={song[i]}/></div>];

            }
            return <div className='genre-card'>{songCard}</div>;
        });
        return (<>
                {songInformation}
            </>
        )
    }
}

export default SameGanreSong;
