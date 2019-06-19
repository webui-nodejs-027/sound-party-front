import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ProgressBar from './ProgressBar';
import './samePeople.css';
import UserInformation from './UserInformation';
import SameGanreSong from './SameGanreSong';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        background: '#5757b317',

    },
    // font-size: 1.5em;
// font-weight: bold
    heading: {
        fontSize:'1.5em',
        fontWeight: 'bold',
        flexBasis: '33.33%',
        flexShrink: 0,
},
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function ControlledExpansionPanels(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const musicPercent = props.user.sameMusicPercent;
    const userNameSurname = props.user.user.firstName + " " + props.user.user.lastName;
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (

        <div className={classes.root}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography  className={classes.heading}>{userNameSurname}</Typography>
                    <Typography > <ProgressBar percent={musicPercent}/>
                        <span className={'hideText'}>-----------
                            -----------------------------------------------------------</span>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className='tab-bottom'>
                    <h2 className='text-center h2-genre_inside'> Data about {userNameSurname}</h2>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails className='tab-top'>
                    {/*<Typography>*/}
                    <UserInformation user={props.user}/>
                    {/*</Typography>*/}
                </ExpansionPanelDetails>
                <ExpansionPanelDetails className='tab-top'>
                    <div className='genre-card__container'>
                    <SameGanreSong user={props.user}/>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
