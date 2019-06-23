import React from "react";
import Grid from "@material-ui/core/Grid";
import './Explore.css';
import SongTable from '../Songs/SongTable'

class Explore extends React.Component {
  state = {
    electedItem: null,
    totalSongs: null
  };

  handleSetTotalSongs = (total) =>{
    this.setState({totalSongs: total});
  }

  async componentDidMount() {
    let data = await this.getTotalByItem(this.props.electItem.searchBy, this.props.electItem.itemName);
    this.setState({ totalSongs: data.total });
  }

  async componentWillMount() {
    this.setState({ electedItem: this.props.electItem });
  }

  render() {
    return (
      <div className="ExploreBlock">
        <div className="ExploreHeader" style={{ width: '100' }}>
          <Grid justify="flex-start" container spacing={1}>
            <Grid item xs={12} sm={6}>
              <h1 className="specialH1">{this.props.electItem.itemName}</h1>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h4 className="specialH4">Total amount of songs: {this.state.totalSongs}</h4>
            </Grid>
          </Grid>
        </div>

        <div className="ExploreTable" style={{ height: 400 , width: '100%'}}>
          <Grid container justify="center" spacing={0}>
            <SongTable searchBy={this.props.electItem.searchBy} value={this.props.electItem.itemName}/>
          </Grid>
        </div>

      </div>
    );
  }

  getTotalByItem = async (searchBy, itemName) => {
    let url = `http://localhost:3001/api/songs/?page=1&limit=10&${searchBy}=${itemName}`;
    // console.log(url);
    const response = await fetch(url);
    const res = await response.json();
    console.log(res)
    return res;

  }
}

export default Explore;
