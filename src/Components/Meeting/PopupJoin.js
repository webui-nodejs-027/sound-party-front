import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PopupJoin(props) {
    const joinUnsubcribe = props.joinUnsubcribe;
    return (
        <div>
            <Dialog
                open={props.open} //open
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogActions>
                    <Button onClick={props.onClickClose} color="primary">
                        Close
                    </Button>
                </DialogActions>

                <DialogTitle style={{textAlign: 'center'}} id="alert-dialog-title">
                    {
                        joinUnsubcribe === 'join'
                            ?
                        'Thanks for joining!'
                            :
                        'You have unsubscribed'
                    }
                </DialogTitle>
            </Dialog>
        </div>
    );
}