import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import {images} from '../../constant';
import './PrimaryCard.css'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent : 'center',
    alignContent : 'center',
    minWidth: 200,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 300,
    boxShadow: '0 1px 3px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.35)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 200,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
      boxShadow: '0 14px 22px rgba(0,0,0,0.35), 0 10px 10px rgba(0,0,0,0.35)'
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function MainCard(props) {
  const classes = useStyles();
  const cardType = props.cardType;
  console.log(classes.image)

  return (
    <div className={classes.root}>
      <ButtonBase
          focusRipple
          key={images[cardType].title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: images[cardType].width,
          }}
        >
          <spanx  
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${images[cardType].url})`,
              //backgroundImage: friendsPic
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {images[cardType].title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
    </div>
  );
}
