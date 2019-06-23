import React from "react";
import AuthorCard from "../Cards/SecondaryCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

class AuthorApp extends React.Component {
  searchBy = 'authorName';
  state = {
    elementsForView: null,
    viewAllDisplay: 'block'
  };

  async componentDidMount() {
    if (!this.props.viewAllBtn) {
      this.setState({ viewAllDisplay: 'none' });
    }
    const authors = await this.getAuthors();
    this.setElementsForView(authors);
  }

  setElementsForView = async (authors) => {
    const result = [];
    for (let i = 0; i < authors.data.length; i++) {
      result[i] = (
        <Grid key={authors.data[i].id} item xs={12} sm={6} md={2}>
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/main/explore">
            <li>
              <AuthorCard
                itemName={authors.data[i].name}
                itemId={authors.data[i].id}
                searchBy={this.searchBy}
                height={120} width={'100%'}
                handleElectItemSetter={this.props.handleElectItemSetter} />
            </li>
          </Link>
        </Grid>
      );
    }
    await this.setState({ elementsForView: result });
  };

  render() {
    const { elementsForView } = this.state;
    return (
      <div className="AuthorBlock" style={{ marginTop: '25px', height: 'auto'}}>
        <Grid container justify="flex-start" spacing={3}>
          <Grid item xs={6}>
            <h2 style={{ textAlign: 'start', fontSize: '35px', marginLeft: '50px' }}> Authors</h2>
          </Grid>
          <Grid item xs={6}>
            <div className="viewAllLink" style={{ display: this.state.viewAllDisplay }}>
              <Link style={{ textDecoration: 'none' }} to="/main/genres">
                <h2 style={{ textAlign: 'end', fontSize: '26px', marginRight: '50px', width: 'auto' }}> View all</h2>
              </Link>
            </div>
          </Grid>
        </Grid>
        <ul style={{ listStyle: "none", height: 'auto', padding: '0px 40px' }}>
          <Grid container justify='center' spacing={3}>
            {elementsForView}
          </Grid>
        </ul>
      </div>
    );
  }

  getAuthors = async () => {
    const response = await fetch("http://localhost:3001/api/authors/");
    const res = await response.json();
    return res;
  };
}

export default AuthorApp;
