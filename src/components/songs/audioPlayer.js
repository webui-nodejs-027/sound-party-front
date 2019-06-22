import React from 'react';
import AudioPlayer from 'react-modular-audio-player';
import './audioPlayer.css';

export default function Player() {
  let audioFiles = [
    {
      src: '/uptownFunk.mp3',
      title: 'Hey Jude',
      artist: 'The Beatles'
    },
    {
      src: '/uptownFunk.mp3',
      title: 'Uptown Funk ft. Bruno Mars',
      artist: 'Mark Ronson'
    },
    {
      src: '/rollingInTheDeep.mp3',
      title: 'Rolling In The Deep',
      artist: 'Adele'
    }
  ];

  return (
    <AudioPlayer
      audioFiles={audioFiles}
      iconSize="1.5rem"
      fontFamily="serif"
      fontSize="1.5rem"
      playerWidth="60rem"
    />
  );
}
