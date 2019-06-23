import React, { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  TableCell,
  TableRow
} from '@material-ui/core';
import Item from './Item';

const DataList = (props) => {
  const [ open, setOpen ] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const uniqueExpandName = props.data.id + props.entityName;
  return (
    <TableRow >
      <TableCell>
        <ExpansionPanel
          square
          expanded={expanded === uniqueExpandName}
          onChange={handleChange(uniqueExpandName)}>
          <ExpansionPanelSummary>
            <Typography>{props.summary}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Item
              data={props.data}
              address={props.address}
              setOpen={setOpen}
              open={open}
              setReload={props.setReload}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </TableCell>
    </TableRow>
  )
};

export default DataList;
