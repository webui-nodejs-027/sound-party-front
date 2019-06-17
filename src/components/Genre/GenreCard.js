import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { border } from '@material-ui/system';

const gradients = [
  [
    '#fc4a1a;',
    '-webkit-linear-gradient(to right, #fc4a1a, #f7b733);',
    'linear-gradient(to right, #fc4a1a, #f7b733);'
  ],
  [
    '#ff9966;',
    '-webkit-linear-gradient(to right, #ff9966, #ff5e62);',
    'linear-gradient(to right, #ff9966, #ff5e62);'
  ],
  [
    '#7f00ff;',
    '-webkit-linear-gradient(to right, #7f00ff, #e100ff);',
    'linear-gradient(to right, #7f00ff, #e100ff);'
  ],
  [
    '#06beb6;',
    '-webkit-linear-gradient(to right, #06beb6, #48b1bf);',
    'linear-gradient(to right, #06beb6, #48b1bf);'
  ],
  [
    '#007991;',
    '-webkit-linear-gradient(to right, #007991, #78ffd6);',
    'linear-gradient(to right, #007991, #78ffd6);'
  ],
  [
    '#f2994a;',
    '-webkit-linear-gradient(to right, #f2994a, #f2c94c);',
    'linear-gradient(to right, #f2994a, #f2c94c);'
  ],
  [
    '#4568dc;',
    '-webkit-linear-gradient(to right, #4568dc, #b06ab3);',
    'linear-gradient(to right, #4568dc, #b06ab3);'
  ],
  [
    '#ffafbd;',
    '-webkit-linear-gradient(to right, #ffafbd, #ffc3a0);',
    'linear-gradient(to right, #ffafbd, #ffc3a0);'
  ],
  [
    '#dce35b;',
    '-webkit-linear-gradient(to right, #dce35b, #45b649);',
    'linear-gradient(to right, #dce35b, #45b649);'
  ]
]

const getRandomGradient = () => {
  const gradientId = Math.floor(Math.random() * (gradients.length - 0)) + 0;
  return gradients[gradientId][2];
}

const ColorButton = withStyles(theme => ({
  root: {
    width: 'auto',
    minWidth: 160,
    height: 75,
    fontSize: 24,
    background: getRandomGradient,
    // '&:hover': {
    //   background: getRandomGradient,
    // },
  },
}))(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 15,
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