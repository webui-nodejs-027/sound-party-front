import React from "react";
import CardTemplate from '../Cards/PrimaryCard';
import Grid from '@material-ui/core/Grid';
import './MainCardBlock.css';
import {Link} from "react-router-dom";
import {ListItem} from "@material-ui/core";

class MainCardApp extends React.Component {

  render() {
    return (
      <div className="mainCardsBlock">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Link to='/main/findpeople'>
              <CardTemplate cardType='friends'/>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Link to='/main/meeting'>
              <CardTemplate cardType='meetings'/>
            </Link>
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default MainCardApp;



