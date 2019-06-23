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
    maxWidth: '90%',
    position: "fixed",
    bottom: '0',
    height: "175px",
    width : '90%'
};

export default function MusicPlayerContainer() {
    return (<>
        <div>
            <MusicPlayer style={style} playlist={playlist}/>
        </div>
    </>)
}
