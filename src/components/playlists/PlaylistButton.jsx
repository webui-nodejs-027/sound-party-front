import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import LikeIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "./Table";


const styles = theme => ({
    button: {
        width: 150,
        height:150,
        position: 'relative',
    },
    likeIcon: {

    },
    deleteIcon: {

    },
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
});

class PlaylistButton extends Component {
      constructor(props) {
        super(props);
    
        this.state = {
          open: false,
          openDelete: false,
          name: "",
          isFavourite : false,
          openSongs: false
        };
      }
    
      handleClickOpen = () => {
        this.setState({ 
          open: true,
          //name: this.props.name,
         });
      };
      handleClickOpenForDelete = () => {
        this.setState({ 
          openDelete: true,
         });
      };
    
      handleClickOpenSongs=() => {
        this.setState({ 
          openSongs: true,
         });
      }
      handleClose = () => {
        this.setState({ open: false });
      };

      handleCloseDelete = () => {
        this.setState({ openDelete: false });
      };
    
      handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      
    
    
      onUpdateNamePlaylist = () => {
        this.props.onUpdateNamePlaylist({
          id: this.props.id,
         field: this.state.name
          
        });
        this.handleClose();
      };

      onDeletePlaylist = () => {
        this.props.onDeletePlaylist({
          id: this.props.id});
        this.handleClose();
      };

      onGetSongs = () => {
        this.props.onGetSongs({
          id: this.props.id
        });
        this.handleClickOpenSongs();
      }
  render () {
    const { classes } = this.props;
      return (
        <div>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            onclick = {this.onGetSongs}
          >
            {this.props.name}
            <div className={classes.iconContainer}>
                <LikeIcon />
                <EditIcon onClick={this.handleClickOpen}/>
                <DeleteIcon onClick={this.handleClickOpenForDelete}/>
                
            </div>
        </Button> 
        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change the name of playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter new name.
          </DialogContentText>
          <TextField
            name="name"
            autoFocus
            margin="dense"
            id="name"
            label="New name"
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
            onClick={this.onUpdateNamePlaylist}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.openDelete}
        onClose={this.handleCloseDelete}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Do you want to delete this playlist?
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            onClick={this.onDeletePlaylist}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Table 
      open={this.state.openSongs}/>
      </div>
      );
  }
}
export default withStyles(styles)(PlaylistButton);
