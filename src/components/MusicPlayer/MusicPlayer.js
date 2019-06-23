import React from 'react';
import MusicPlayer from 'react-responsive-music-player';
import {images} from '../../constant'
import './musicPlayer.css';

const playlist = [
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
