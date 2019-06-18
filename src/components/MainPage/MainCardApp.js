import React from "react";
import CardTemplate from '../Cards/PrimaryCard';
import Grid from '@material-ui/core/Grid';
import './MainCardBlock.css';

class MainCardApp extends React.Component {

  render() {
    return (
      <div className="mainCardsBlock">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <CardTemplate cardType='friends' />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardTemplate cardType='meetings' />
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default MainCardApp;



