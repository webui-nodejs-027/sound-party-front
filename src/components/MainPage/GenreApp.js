import React from "react";
import GenreCard from "../Cards/SecondaryCard";
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom'


class GenreApp extends React.Component {
  searchBy = 'genre'
  state = {
    elementsForView: null,
    viewAllDisplay: 'block',
    limit: null
  };

  async componentDidMount() {
    if (!this.props.viewAllBtn) {
      this.setState({ viewAllDisplay: 'none' });
    }
    const genres = await this.getGenres(this.state.limit);

    if (this.props.limit) { 
      this.setState({limit: this.props.limit})
    } else {
      this.setState({limit: genres.limit})
    }

    this.setElementsForView(genres);
  }

  setElementsForView = async genres => {
    const result = [];
    console.log(this.state.limit, 'this.state.limit')
    for (let i = 0; i < this.state.limit; i++) {
      result[i] = (
        <Grid key={genres.data[i].id} item xs={12} sm={6} md={2}>
          <Link style={{ textDecoration: 'none' }} to="/main/explore">
            <li>
              <GenreCard
                itemName={genres.data[i].name}
                itemId={genres.data[i].id}
                searchBy={this.searchBy}
                height={120} width='100%'
                handleElectItemSetter={this.props.handleElectItemSetter}
              />
            </li>
          </Link>
        </Grid >
      );
    }
    await this.setState({ elementsForView: result });
  };

  render() {
    const { elementsForView } = this.state;
    return (
      <div className="GenreBlock" style={{ marginTop: '25px', height: 'auto'}}>
        <Grid container justify="flex-start" spacing={3}>
          <Grid item xs={6}>
            <h2 style={{ textAlign: 'start', fontSize: '35px', marginLeft: '50px' }}> Genres</h2>
          </Grid>
          <Grid item xs={6}>
            <div className="viewAllLink" style={{ display: this.state.viewAllDisplay }}>
              <Link style={{ textDecoration: 'none' }} to="/main/genres">
                <h2 style={{ textAlign: 'end', fontSize: '26px', marginRight: '50px', width: 'auto', color: 'rgba(0, 0, 0, 0.87)'}}> View all</h2>
              </Link>
            </div>
          </Grid>
        </Grid>
        <ul style={{ listStyle: "none", height: 'auto', padding: "0px 40px", marginTop: 0 }}>
          <Grid container justify="flex-start" spacing={3}>
            {elementsForView}
          </Grid>
        </ul>
      </div>
    );
  }

  getGenres = async (limit) => {
    let url
    console.log(limit, limit == true)
    if(limit){
      url = `http://localhost:3001/api/genres&limit=${limit}`;  
    } else {
      url = "http://localhost:3001/api/genres/";
    }

    const response = await fetch(url)
    const res = await response.json();
    console.log(res)
    return res;
  };
}

export default GenreApp;
