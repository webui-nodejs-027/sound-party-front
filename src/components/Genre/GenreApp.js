import React from "react";
import GenreCard from "./GenreCard";
import Grid from "@material-ui/core/Grid";

class GenreApp extends React.Component {
  state = {
    elementsForView: null
  };

  async componentDidMount() {
    console.log("start of Did Mount");
    const genres = await this.getGenres();
    this.setElementsForView(genres);
  }

  setElementsForView = async genres => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      console.log(genres.data[i]);
      result[i] = (
        <Grid item xs={12} sm={6} md={3}>
          <li key={genres.data[i].id}>
            <GenreCard genreName={genres.data[i].name} />
          </li>
        </Grid>
      );
    }
    await this.setState({ elementsForView: result });
    console.log(this.state);
  };

  render() {
    console.log("render");
    const { elementsForView } = this.state;
    return (
      <div className="GenreBlock">
        <ul style={{ listStyle: "none", border: '1px solid black' }}>
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
