import React, { forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '80px'
  }
}));

export default forwardRef((props, ref) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const { vertical, horizontal, open } = state;

  useImperativeHandle(ref, () => ({
    handleClick() {
      setState({ ...state, open: true });
    }
  }));

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{vertical, horizontal}}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={<span className={classes.root}>{props['message'].msg}</span>}
      />
    </>
  );
});
