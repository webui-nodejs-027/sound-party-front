import React from "react";
import GenreCard from "../Cards/SecondaryCard";
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom'


class Genres extends React.Component {
  typeName = 'genre'
  state = {
    elementsForView: null
  };

  async componentDidMount() {
    const genres = await this.getGenres();
    this.setElementsForView(genres);
  }

  setElementsForView = async genres => {
    const result = [];
    for (let i = 0; i < genres.data.length; i++) {
      result[i] = (
        <Grid key={genres.data[i].id} item xs={12} sm={6} md={2}>
          <Link style={{textDecoration: 'none'}} to="/exploreGenres">
          <li>
            <GenreCard itemName={genres.data[i].name}
            itemId={genres.data[i].id}
            typeName={this.typeName}
            height = {120} width='100%'
            handleElectItemSetter={this.props.handleElectItemSetter}
          />
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
          <h2 style={{textAlign:'center', fontSize:'35px',marginTop:'25px'}}> All genres </h2>
        <ul style={{ listStyle: "none", height: 150, padding: "0px 40px" }}>
          <Grid container justify="center" spacing={3}>
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

export default Genres;
