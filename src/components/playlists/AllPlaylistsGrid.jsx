import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import CreationPlaylist from "./CreationPlaylist";
import PlaylistButton from "./PlaylistButton";
import SongTable from "./Table";



class AllPLaylistsGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
     idPlaylist: 1,
      name: "",
      onlyFav: false
    };

  };

  setIdAndName = (id, name) => {
    this.setState({idPlaylist:id}) ; 
    this.setState({name:name}) ;

  }

  onChangeFav = (e, checked) => {
    if(checked === true) {
      this.setState({onlyFav : true});
    }
    else {
      this.setState({onlyFav : false});
    }

  }
   
  render() {
    const { 
      items,
      onCreate,
      onUpdateNamePlaylist,
      onDeletePlaylist,
      onUpdateFavPlaylist, 
    } = this.props;
    const filteredItems = items.filter(item => this.state.onlyFav ? item.favourite : true);

    return (
      <div>
        <Grid container spacing={1}>
          <Grid item >
            <CreationPlaylist onCreate={onCreate} />
          </Grid>
          {filteredItems.map(playlist => (
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
        <div style={{ marginTop:'3%'}}>
        <span style={{fontSize:16, marginLeft:'3%'}} >Show only favourite playlists</span>
        <Switch onChange={this.onChangeFav}></Switch>
        </div>
        <p style={{fontSize:26, marginLeft:'44%', textTransform: 'uppercase'}} >{this.state.name}</p>
        <SongTable id={this.state.idPlaylist}/>
      </div>
    );
  }
}
export default AllPLaylistsGrid;
