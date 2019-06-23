import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getRandomGradient } from '../../constant';

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
    searchBy: props.searchBy,
    itemId: props.itemId,
    itemName: props.itemName,
  }
  
  const action = props.action;

  return (
    <div>
        <ColorButton variant="contained" color="primary"
          className={classes.margin}
          style={{ 'height': height, 'width': width }}
          // onClick={() => { props.handleElectItemSetter(itemData) }}
          onClick={() => {action(itemData)}}
        >
          {props.itemName}
        </ColorButton>

    </div>
  );
}
