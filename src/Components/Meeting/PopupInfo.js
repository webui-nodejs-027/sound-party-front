import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
}));

function SimpleTable(props) {
    const classes = useStyles();
    const m = props.meeting;
    const fullName = `${props.meeting.creator_firstName} ${props.meeting.creator_lastName}`;
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">People</TableCell>
                        <TableCell align="center">Creator</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow>
                            <TableCell align="center" scope="row">{m.meeting_address}</TableCell>
                            <TableCell align="center">{m.count}</TableCell>
                            <TableCell align="center">{fullName}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}


export default function PopupInfo(props) {
    const creatorId = props.meeting ? props.meeting.creator_id : null;
    const isCreator = props.userId === creatorId;
    const meetingId = props.meeting ? props.meeting.meeting_id : null;
    const isJoined = props.meeting ? props.meeting.user_in_meeting : null;
    const onlySubscribed = !isCreator && isJoined ? true : false;
    const title = props.meeting ? props.meeting.meeting_name : null;

    console.log('isJoined', isJoined);
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

                    <DialogTitle style={{textAlign: 'center'}} id="alert-dialog-title">{title}</DialogTitle>

                    <SimpleTable
                    meeting={props.meeting}
                    />

                    <DialogActions>
                        {isJoined && isCreator &&

                        <Button
                            color="primary"
                            onClick={props.onClickUpdate}
                        >
                            Edit
                        </Button>
                        }

                        {!isJoined &&
                        <Button
                            color="primary"
                            onClick={props.onClickJoin.bind(this, meetingId)}
                        >
                            Join
                        </Button>
                        }
                        {onlySubscribed &&
                        <Button
                            color="primary"
                            onClick={props.onClickUnsubscribe.bind(this, meetingId)}
                        >
                            Unsubscribe
                        </Button>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        );
    }