import React from "react";
import Grid from "@material-ui/core/Grid";
import './Explore.css';

class Explore extends React.Component {
  state = {
    electedItem: null,
    elementsForTable: 0
  };

  async componentDidMount() {
    let data = await this.getDataByItem(this.props.electItem.searchBy, this.props.electItem.itemName);
    this.setState({ elementsForTable: data });
  }

  async componentWillMount() {
    this.setState({ electedItem: this.props.electItem });
  }

  render() {
    return (
      <div className="ExploreBlock">
        <div className="ExploreHeader" style={{ width: '100' }}>
          <Grid justify="flex-start" container spacing={1}>
            <Grid item xs={12} sm={6}>
              <h1 className="specialH1">{this.props.electItem.itemName}</h1>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h1 className="specialH1">{this.state.elementsForTable.total}</h1>
            </Grid>
          </Grid>
        </div>

        <div className="ExploreTable" style={{ height: 400 , width: '100%', border: '1px solid black'}}>
          <Grid container justify="center" spacing={0}>
            there is table
          </Grid>
        </div>

      </div>
    );
  }

  getDataByItem = async (typeName, itemName) => {
    let url;
    if (typeName === 'genre') {
      url = `http://localhost:3001/api/songs/?page=1&limit=10`;
    } else if (typeName === 'author') {
      url = `http://localhost:3001/api/songs/?page=1&limit=10`;
    }
    const response = await fetch(url);
    const res = await response.json();
    console.log('this is res');
    console.log(res);
    return res;

  }
}

export default Explore;
