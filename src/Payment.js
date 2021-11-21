import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { PinDropSharp } from '@material-ui/icons';

export default function PaymentForm(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [frequency, setfrequency] = React.useState('');

  const handleChange = (event) => {
    setfrequency(event.target.value);
    props.handleFrequency(event);
  };
  // const handleDateChange = (date) => {
  // props.handleDate(selectedDate);
  //   setSelectedDate(date.target.value);
  //   console.log(selectedDate);
  // };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TextField
        id="date"
        label="First Payment Date"
        type="date"
        width='411px'
        defaultValue={selectedDate}
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={props.handleDate}
      />
      </MuiPickersUtilsProvider>
      {/* <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          // format="MM/dd/yyyy"
          format="yyyy/MM/dd"
          id="date-picker-inline"
          label="First Payment Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid> */}
     
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cardNumber"
            label="Amount"
            fullWidth
            autoComplete="cc-number"
            onChange={props.handleAmount}
          />
        </Grid> 
        <Grid item xs={12} sm={6}>
        <InputLabel id="demo-simple-select-helper-label">Frequency</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          fullWidth
          value={frequency}
          onChange={handleChange}
        >
          <MenuItem value={'Weekly'}>Weekly</MenuItem>
          <MenuItem value={'Monthly'}>Monthly</MenuItem>
          <MenuItem value={'Bi-Monthly'}>Bi-Monthly</MenuItem>
          <MenuItem value={'Quarterly'}>Quarterly</MenuItem>
          <MenuItem value={'Half-Yearly'}>Half Yearly</MenuItem>
          <MenuItem value={'Yearly'}>Yearly</MenuItem>
        </Select>
        </Grid>
        
        
      </Grid>
    </React.Fragment>
  );
}