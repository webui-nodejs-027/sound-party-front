import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getRandomGradient } from '../../constant';
import { Link } from 'react-router-dom'

const ColorButton = withStyles(theme => ({
  root: {
    minWidth: 160,
    fontSize: 24,
    //background: 'linear-gradient(to right, rgb(69, 104, 220), rgb(176, 106, 179))',
    background: getRandomGradient
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
  const width = props.width || 'auto'
  const itemData = {
    typeName: props.typeName,
    itemId: props.itemId,
    itemName: props.itemName,
  }
  console.log('this props');
  console.log(typeof props.handleElectItemSetter);

  return (
    <div>
        <ColorButton variant="contained" color="primary"
          className={classes.margin}
          style={{ 'height': height, 'width': width }}
          onClick={() => { props.handleElectItemSetter(itemData) }}
        >
          {props.itemName}
        </ColorButton>

    </div>
  );
}
