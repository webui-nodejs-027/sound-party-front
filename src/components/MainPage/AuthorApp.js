import React from "react";
import AuthorCard from "../Cards/SecondaryCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

class AuthorApp extends React.Component {
  searchBy = 'authorName';
  state = {
    elementsForView: null,
    viewAllDisplay: 'block',
    showMoreDisplay: 'block',
    limit: null
  };

  async componentDidMount() {
    if (!this.props.viewAllBtn) {
      this.setState({ viewAllDisplay: 'none' });
    }
    if (!this.props.showMoreBtn) {
      this.setState({ showMoreDisplay: 'none' })
    }
    if (this.props.limit) { 
      await this.setState({limit: this.props.limit})
    } 

    const authors = await this.getAuthors(this.state.limit);
    this.setElementsForView(authors);
    console.log(this.state);  
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
    console.log(this.state.showMoreDisplay)
    return (
      <div className="AuthorBlock" style={{ marginTop: '25px', height: 'auto'}}>
        <Grid container justify="flex-start" spacing={3}>
          <Grid item xs={6}>
            <h2 style={{ textAlign: 'start', fontSize: '35px', marginLeft: '50px' }}> Authors</h2>
          </Grid>
          <Grid item xs={6}>
            <div className="viewAllLink" style={{ display: this.state.viewAllDisplay }}>
              <Link style={{ textDecoration: 'none' }} to="/main/genres">
                <h2 style={{ textAlign: 'end', fontSize: '26px', marginRight: '50px', width: 'auto', color: 'rgba(0, 0, 0, 0.87)' }}> View all</h2>
              </Link>
            </div>
          </Grid>
        </Grid>
        <ul style={{ listStyle: "none", height: 'auto', padding: '0px 40px' }}>
          <Grid container justify='flex-start' spacing={3}>
            {elementsForView}
            <Grid item xs={12} sm={6} md={2}>
              <li style={{display: this.state.showMoreDisplay}}>
                <AuthorCard
                  itemName={'show more...'}
                  height={120} width='100%'
                  action={this.getNextPage}
                />
              </li>
            </Grid >
          </Grid>
        </ul>
      </div>
    );
  }

  getAuthors = async (limit) => {
    let url;
    if(limit){
      url = `http://localhost:3001/api/authors?limit=${limit}`;  
    } else {
      //TO DO fix this
      const responseForLimit = await fetch(`http://localhost:3001/api/authors?limit=0`);
      const resForLimit = await responseForLimit.json();
      url = `http://localhost:3001/api/authors?limit=${resForLimit.total}`;
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



export default AuthorApp;
