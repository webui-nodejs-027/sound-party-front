import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  button: {
      width: 150,
      height:150
  }
});
class CreationPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: ""
    };
    this.getUserId = this.getUserId.bind(this);
  }

  
  getUserId = () => {
    const payload = localStorage
      .getItem('token')
      .split('.')[1];
    return JSON.parse(atob(payload)).id;
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  onCreatePlaylist = () => {
    this.props.onCreate({
      name: this.state.name,
      isMain: false,
      favourite: false,
      userId: this.getUserId()
    });
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="default"
          onClick={this.handleClickOpen}
          className = {classes.button}
        >
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new playlist</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create new playlist, please enter its name.
            </DialogContentText>
            <TextField
              name="name"
              autoFocus
              margin="dense"
              label="Name of new playlist"
              type="text"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              // eslint-disable-next-line react/jsx-no-duplicate-props
              onClick={this.onCreatePlaylist}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(CreationPlaylist);
