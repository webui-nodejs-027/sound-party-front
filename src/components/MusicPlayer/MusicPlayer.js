import React from 'react';
import MusicPlayer from 'react-responsive-music-player';
import {images} from '../../constant'
import './musicPlayer.css';

const playlist = [
    {
        url: images.music.url,
        cover: '',
        title: 'Choose element',
        artist: [
            'Luis Fonsi',
            'Daddy Yankee'
        ]
    },
    {
        url: images.music.url,
        cover: '',
        title: 'Bedtime Stories',
        artist: [
            'Jay Chou'
        ]
    }
];

const style = {
    maxWidth: '100%',
    position: "fixed",
    bottom: '0',
    width: "100%",
    height: "175px"
};

export default function MusicPlayerContainer() {
    return (<>
        <div>
            <MusicPlayer style={style} autoplay={true} playlist={playlist}/>
        </div>
    </>)
}
