import React from "react";
import GenreCard from "../Cards/SecondaryCard";
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom'

class GenreApp extends React.Component {
  state = {
    elementsForView: null
  };

  async componentDidMount() {
    const genres = await this.getGenres();
    this.setElementsForView(genres);
  }

  setElementsForView = async genres => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result[i] = (
        <Grid key={genres.data[i].id} item xs={12} sm={6} md={3}>
          <Link to="/exploreGenres">
          <li>
            <GenreCard itemName={genres.data[i].name} 
            itemId={genres.data[i].id} 
            height = {80} width={200}
            handleChangeElectElement={this.props.handleChangeElectElement}/>
          </li>
          </Link>
        </Grid>
      );
    }
    await this.setState({ elementsForView: result });
    console.log(this.state);
  };

  render() {
    const { elementsForView } = this.state;
    return (
      <div className="GenreBlock">
        <ul style={{ listStyle: "none", border: '1px solid black', height: 150 }}>
          <Grid container spacing={3}>
            {elementsForView}
          </Grid>
        </ul>
      </div>
    );
  }

  getGenres = async () => {
    const response = await fetch("http://localhost:3001/api/genres/", {
      method: "GET"
    });
    const res = await response.json();
    return res;
  };
}

export default GenreApp;
