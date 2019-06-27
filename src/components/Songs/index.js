import React from 'react';
import SongTable from './SongTable';

export default function Song(props) {
  return (
    <div>
      <SongTable defaultSettings={props} />
    </div>
  );
}
