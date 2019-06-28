import React, {useEffect, useState} from 'react';
import MusicPlayer from 'react-responsive-music-player';
import './musicPlayer.css';

const src = 'http://localhost:3001/music/';

const music = [
    {
        url: 'http://localhost:3001/music/63f49327b755045c801c851d03a9cd941559913232030.mp3',
        cover: '',
        title: 'Choose element',
        artist: [
            'Luis Fonsi',
            'Daddy Yankee'
        ]
    },
    {
        url: 'http://localhost:3001/music/63f49327b755045c801c851d03a9cd941559913232031.mp3',
        cover: '',
        title: 'Bedtime Stories',
        artist: [
            'Jay Chou'
        ]
    }
];

// const style = {
//     maxWidth: '90%',
//     position: "fixed",
//     bottom: '0',
//     height: "175px",
//     width: '90%'
// };

let renderPage = true;

export default function MusicPlayerContainer(props) {

    const [myPlaylist, setPlaylist] = useState(music);

    const {songs} = props.songs;
    const autoplay = props.songs.autoplay || false;
    const changeSong = props.songs.changeSong || false;

    if (songs.data) {
        let playlist = songs.data.map((song) => {
            const playlistObject = {
                url: src + song.source,
                cover: '',
                title: song.name,
                artist: [
                    song.authorId.name, song.genreId.name
                ]
            };
            return playlistObject;
        });
        paginationRender(playlist);
        if (changeSong) {
            if (renderPage) {
                renderPage = false;
                setPlaylist(playlist);
            } else {
                renderPage = true;
            }
        }
    }

    function nextSong() {
        let changePlaylist = [...myPlaylist];
        const firstSong = changePlaylist.splice(0, 1);
        const secondSong = changePlaylist.splice(0, 1);
        changePlaylist.unshift(...secondSong);
        changePlaylist.push(...firstSong);
        setPlaylist(changePlaylist);
        renderPage = false;
    }

    function prevSong() {
        let changePlaylist = [...myPlaylist];
        const song = changePlaylist.splice(changePlaylist.length - 1, 1);
        changePlaylist.unshift(...song);
        setPlaylist(changePlaylist);
        renderPage = false;
    }

    function paginationRender(playlist) {
        if (myPlaylist.length < playlist.length) {
            setPlaylist(playlist);
        }
    };

    return (<>
        <div className='player-container'>
            <MusicPlayer autoplay={autoplay} playlist={myPlaylist}/>
            <button className='prevSong' onClick={prevSong}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="44" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </button>
            <button className='nextSong' onClick={nextSong}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="44   " viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </button>
        </div>
    </>)
}
