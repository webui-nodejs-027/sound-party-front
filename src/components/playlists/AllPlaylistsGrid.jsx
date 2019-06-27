import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CreationPlaylist from "./CreationPlaylist";
import PlaylistButton from "./PlaylistButton";
import SongTable from "./Table";

class AllPLaylistsGrid extends Component {

  render() {
    const { 
      items,
      onCreate,
      onUpdateNamePlaylist,
      onDeletePlaylist,
      onGetSongs
     } = this.props;

    return (
      <div>
        <Grid container spacing={1}>
          <Grid item >
            <CreationPlaylist onCreate={onCreate} />
          </Grid>
          {items.map((playlist) => (
            <Grid item key={playlist.id}>
              <PlaylistButton 
               name={playlist.name}
               id={playlist.id} 
               onUpdateNamePlaylist={onUpdateNamePlaylist}
               onDeletePlaylist={onDeletePlaylist}
               onGetSongs={onGetSongs} />
            </Grid>
            // < SongTable id={playlist.id} />
           ))}
        </Grid>
        < SongTable 
        // id={playlist.id}
         />
     
      </div>
    );
  }
}
export default AllPLaylistsGrid;
