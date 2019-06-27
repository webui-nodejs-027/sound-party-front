import React from 'react';
import './samePeople.css';
import SimpleCard from "./SamePeopleCard";
import Container from "@material-ui/core/Container/Container";
import Grid from "@material-ui/core/Grid/Grid";

class SameGanreSong extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const songs = this.props.user.songs;
        const songInformation = songs.map((song, index) => {
            const {genreId, ...songInformation} = song;
            return (<>
                <Grid key={index} item xs={3}>
                    <Container>
                        <SimpleCard key={index} songStatistic={songInformation}/>
                    </Container>
                </Grid>
            </>)
        });
        return (<>
                {songInformation}
            </>
        )
    }
}

export default SameGanreSong;
