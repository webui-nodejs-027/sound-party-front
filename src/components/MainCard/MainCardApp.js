import React from "react";
import CardTemplate from '../Cards/PrimaryCard';
import Grid from '@material-ui/core/Grid'

class MainCardApp extends React.Component {

  render() {
    return (
      <div className="GenreBlock" style={{ border: '1px solid black', height: 250, marginTop : 20 }}>
        <Grid container spacing={3}>
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



