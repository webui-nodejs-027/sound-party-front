import React from "react";
import AuthorCard from "../Cards/SecondaryCard";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

class Explore extends React.Component {
  state = {
    elementsForTable: null
  };

  async componentDidMount() {
    const songsByItemType = await this.getDataByItem(this.props.electItem.typeName);
    this.setElementsForView(authors);
  }

  setElementsForTable = async (authors) => {
    const result = [];
    for (let i = 0; i < authors.data.length; i++) {
      result[i] = (
        <Grid key={authors.data[i].id} item xs={12} sm={6} md={2}>
            <Link style={{textDecoration: 'none'}} to="/explore">
          <li>
            <AuthorCard
            itemName={authors.data[i].name}
            itemId={authors.data[i].id}
            height={120} width={'100%'}/>
          </li>
            </Link>
        </Grid>
      );
    }
    await this.setState({ elementsForView: result });
  };

  render() {
    console.log("render");
    const { elementsForView } = this.state;
    return (
      <div className="AuthorBlock">
          <h2 style={{textAlign:'center', fontSize:'35px',marginTop:'30px'}}> Authors </h2>
        <ul style={{ listStyle: "none", height: 'auto', padding: '0px 40px'}}>
          <Grid container justify='center' spacing={3}>
            {elementsForView}
          </Grid>
        </ul>
      </div>
    );
  }

  getAuthors = async () => {
    const response = await fetch('http://localhost:3001/api/authors/');
    const res = await response.json();
    return res;
  };

  getDataByItem = async (typeName) => {
    let url;
    switch(typeName){
      case 'genre':
          http://localhost:3001/api/authors/
    }
  }
}

export default Explore;
