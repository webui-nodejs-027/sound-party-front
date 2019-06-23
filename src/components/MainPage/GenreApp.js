import React from "react";
import GenreCard from "../Cards/SecondaryCard";
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom'


class GenreApp extends React.Component {
  searchBy = 'genre'
  state = {
    elementsForView: null,
    viewAllDisplay: 'block',
    showMoreDisplay: 'block',
    limit: null
  };

  async componentDidMount() {
    console.log(this.props)
    if (!this.props.viewAllBtn) {
      await this.setState({ viewAllDisplay: 'none' });
    }
    if (!this.props.showMoreBtn) {
      await this.setState({ showMoreDisplay: 'none' })
    }
    if (this.props.limit) {
      await this.setState({ limit: this.props.limit })
    }

    const genres = await this.getGenres(this.state.limit);
    this.setElementsForView(genres);
  }

  setElementsForView = async genres => {
    const result = [];
    console.log(genres)
    for (let i = 0; i < genres.data.length; i++) {
      result[i] = (
        <Grid key={genres.data[i].id} item xs={12} sm={6} md={2}>
          <Link style={{ textDecoration: 'none' }} to="/main/explore">
            <li>
              <GenreCard
                itemName={genres.data[i].name}
                itemId={genres.data[i].id}
                searchBy={this.searchBy}
                height={120} width='100%'
                action={this.props.handleElectItemSetter}
              />
            </li>
          </Link>
        </Grid >
      );
    }
    await this.setState({ elementsForView: result });
  };

  render() {
    console.log(this.state.showMoreDisplay)
    const { elementsForView, showMoreDisplay } = this.state;
    return (
      <div className="GenreBlock" style={{ marginTop: '25px', height: 'auto' }}>
        <Grid container justify="flex-start" spacing={3}>
          <Grid item xs={6}>
            <h2 style={{ textAlign: 'start', fontSize: '35px', marginLeft: '50px' }}> Genres</h2>
          </Grid>
          <Grid item xs={6}>
            <div className="viewAllLink" style={{ display: this.state.viewAllDisplay }}>
              <Link style={{ textDecoration: 'none' }} to="/main/genres">
                <h2 style={{ textAlign: 'end', fontSize: '26px', marginRight: '50px', width: 'auto' }}> View all</h2>
              </Link>
            </div>
          </Grid>
        </Grid>
        <ul style={{ listStyle: "none", height: 'auto', padding: "0px 40px", marginTop: 0 }}>
          <Grid container justify="flex-start" spacing={3}>
            {elementsForView}
            {/* <Grid item xs={12} sm={6} md={2} style={{display: showMoreDisplay}}>
              <li>
                <GenreCard
                  itemName={'show more...'}
                  height={120} width='100%'
                  actiom={this.getNextPage}
                />
              </li>
            </Grid > */}
          </Grid>
        </ul>
      </div>
    );
  }

  //TO DO fix this method
  getGenres = async (limit) => {
    let url;
    if (limit) {
      url = `http://localhost:3001/api/genres?limit=${limit}`;
    } else {
      //TO DO fix this
      const responseForLimit = await fetch(`http://localhost:3001/api/genres?limit=0`);
      const resForLimit = await responseForLimit.json();
      let amount = resForLimit.total;
      if(resForLimit.total > 17) {amount = 17}
      url = `http://localhost:3001/api/genres?limit=${amount}`;
    }

    const response = await fetch(url)
    const res = await response.json();
    console.log('there is res')
    console.log(res)
    return res;
  };

  getNextPage = async (itemName) => {
    console.log('qqqqqqqqqqqqqqqqq')
  }
}

export default GenreApp;
