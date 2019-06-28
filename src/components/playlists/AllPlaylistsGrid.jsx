import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CreationPlaylist from "./CreationPlaylist";
import PlaylistButton from "./PlaylistButton";
import SongTable from "./Table";


class AllPLaylistsGrid extends Component {
  constructor() {
    super();

    this.state = {
      idPlaylist: 1,
      name: ""
    };
  };

  setIdAndName = (id, name) => {
    this.setState({idPlaylist:id}) ; 
    this.setState({name:name}) ;

  }
   
  render() {
    const { 
      items,
      onCreate,
      onUpdateNamePlaylist,
      onDeletePlaylist,
      onUpdateFavPlaylist, 
      
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
               isFavourite={playlist.favourite}
               onUpdateNamePlaylist={onUpdateNamePlaylist}
               onUpdateFavPlaylist={onUpdateFavPlaylist}
               onDeletePlaylist={onDeletePlaylist}
               onClick={()=>this.setIdAndName(playlist.id, playlist.name)}
                />
            </Grid>
           ))}
        </Grid>
        <p style={{fontSize:26, marginLeft:'44%', textTransform: 'uppercase'}} >{this.state.name}</p>
        <SongTable id={this.state.idPlaylist}/>
      </div>
    );
  }
}
export default AllPLaylistsGrid;
