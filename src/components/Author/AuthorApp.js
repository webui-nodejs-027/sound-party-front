import React from "react";
import AuthorCard from "../Cards/SecondaryCard";
import Grid from "@material-ui/core/Grid";

class AuthorApp extends React.Component {
  state = {
    elementsForView: null
  };

  async componentDidMount() {
    const authors = await this.getAuthors();
    this.setElementsForView(authors);
  }

  setElementsForView = async (authors) => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result[i] = (
        <Grid key={authors.data[i].id} item xs={12} sm={6} md={3}>
          <li>
            <AuthorCard 
            itemName={authors.data[i].name} 
            itemId={authors.data[i].id}
            handleChangeElectElement={this.props.handleChangeElectElement}
            height={100} width={200}/>
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
      <div className="AuthorBlock">
        <ul style={{ listStyle: "none", border: '1px solid black', height: 150}}>
          <Grid container spacing={3}>
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
