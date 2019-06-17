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
    background: getRandomGradient,
  },
}))(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 15,
  },
}));

export default function GenreCard(props) {
  const classes = useStyles();
  console.log('Genre props:', props);
  const height = props.height || 75;
  const width = props.width || 'auto'


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