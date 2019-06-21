import React from "react";
import Grid from "@material-ui/core/Grid";

class Explore extends React.Component {
  state = {
    electedItem : null,
    elementsForTable: null
  };

  async componentDidMount() {
    let data = await this.getDataByItem(this.props.typeName, this.props.itemId);
    this.setState({elementsForTable: data});
  }

  async componentWillMount() {
    this.setState({electedItem: this.props.electItem});
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    //const { elementsForView } = this.state;
    return (
      <div className="ExploreBlock">
        <Grid justify="center" container spacing={1}>
          <Grid item xs={12} sm={6}>
            <h1>{this.state.electedItem.itemName}</h1>
          </Grid>

        </Grid>
      </div>
    );
  }

  getDataByItem = async (typeName, itemId) => {
    let url = `http://localhost:3001/api/songs/?page=1&limit=10&typeName=${typeName}&itemId=${itemId}`;
    const response = await fetch(url);
    const res = await response.json();
    console.log('this is res');
    console.log(res);
    return res;

  }
}

export default Explore;
