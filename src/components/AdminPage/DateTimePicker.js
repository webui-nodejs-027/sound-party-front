import React, { useState } from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import * as moment from 'moment';

const DTPicker = (props) => {
  const [selectedDate, handleDateChange] = useState(null);
  return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          autoOk
          fullWidth
          required
          inputVariant='outlined'
          label='date_time'
          name='dateTime'
          style={{width: '300px'}}
          value={ selectedDate }
          onChange={ date => {
            handleDateChange(date);
            const parsedDate = moment(date).local().format();
            props.handleChange({target: { name: 'dateTime', value: parsedDate }});
          } }
        />
      </MuiPickersUtilsProvider>
  )
};

export default DTPicker;
