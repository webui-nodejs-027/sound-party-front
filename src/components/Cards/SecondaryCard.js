import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {getRandomGradient} from '../../constant';

const ColorButton = withStyles(theme => ({
  root: {
    //width: 'auto',
    minWidth: 160,
    //height: 75,
    fontSize: 24,
    background: 'linear-gradient(to right, rgb(69, 104, 220), rgb(176, 106, 179))',
  },
}))(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 15,
  },
}));

export default function SecondaryCard(props) {
  const classes = useStyles();
  const height = props.height || 75;
  const width = props.width || 'auto';

  return (
    <div>
      <ColorButton variant="contained" color="primary"
      className={classes.margin}
      style={{'height' : height , 'width' : width}}>
        {props.itemName}
      </ColorButton>
    </div>
  );
}
