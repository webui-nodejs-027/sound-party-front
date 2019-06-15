import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Тихо ...взял и ушел, называется - нашел
const hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
const populate = a => {
  for ( let i = 0; i < 6; i++ ) {
    let x = Math.round( Math.random() * 14 );
    let y = hexValues[x];
    a += y;
  }
  return a;
}
const getRandomGradient = () => {  
  const newColor1 = populate('#');
  const newColor2 = populate('#');
  const angle = Math.round( Math.random() * 360 );
  console.log(`linear-gradient(${angle}deg, ${newColor1}, ${newColor2})`)
  return `linear-gradient(to right, ${newColor1}, ${newColor2})`;
}

const ColorButton = withStyles(theme => ({
  root: {
    width: 'auto',
    minWidth: 160,
    height: 75,
    fontSize: 24,
    background: getRandomGradient,
    '&:hover': {
      background: getRandomGradient,
    },
  },
}))(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 15
  },
}));

export default function GenreCard(props) {
  const classes = useStyles();
  console.log(props.genreName);

  return (
      <div>
        <ColorButton variant="contained" color="primary" className={classes.margin}>
          {props.genreName}
        </ColorButton>
      </div>
  );
}