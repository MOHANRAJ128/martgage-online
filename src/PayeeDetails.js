import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useForm } from 'react-hook-form';

export default function PayeeDetails(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [frequency, setfrequency] = React.useState('');
  const [error,setError] = React.useState(false);
  const [errorAccno,setErrorAccno] = React.useState(false);
  const [sortcodeValue, setSortCodeValue] = React.useState('');
  const [accountNoValue,setAccountNoValue] = React.useState('');
  
  const handleChange = (event) => {
    let sortCode = event.target.value.length;
    let sCode= event.target.value;
    if( sortCode != 6){
    setError(true);
    props.handleSortCode(event)
    }
    else{
      setError(false);
      setSortCodeValue(sortCode)
      props.handleSortCode(event)
    }
    
  };

  
  const handleChangeAccountno = (event) => {
    let accno = event.target.value;
    // props.handleAccountNo(accno);
    if(accno != 12345678 && accno != 87654321 ){
      setErrorAccno(true);
      props.handleAccountNo(event);
    //props.validateSort({status:false,sCode:sortcodeValue,accNo:accountNoValue});
    }
    else{
    setAccountNoValue(accno)
    setErrorAccno(false)
    //props.validateSort({status:true,sCode:sortcodeValue,accNo:accountNoValue});
    props.handleAccountNo(event);
    }
  };
  // const validateEmpty = (event) => {
  //   if(sortcodeValue.length == 0 || accountNoValue.length == 0 ){
  //     props.validateSort({status:false,sCode:sortcodeValue,accNo:accountNoValue});
  //   }else{
  //     props.validateSort({status:false,sCode:sortcodeValue,accNo:accountNoValue});
  //   }
  //     };
      // validateEmpty();
  // const { register, handleSubmit, errors } = useForm();
  // const onSubmit = data => console.log(data);
  return (
    <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Payee Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                onChange={props.handleFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                onChange={props.handleLastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="sortcode"
                name="sortcode"
                label="Sort Code"
                type="number"
                helperText={error ? "Please enter the valid 6 digits sort code" : ""}
                error={error}
                fullWidth
                autoComplete="shipping address-line1"
                onChange={handleChange}
              />
            </Grid>
            <br/>
            <Grid item xs={12} sm={6}>
              <TextField
                
                id="city"
                name="city"
                label="Reference"
                fullWidth
                autoComplete="shipping address-level2"
                onChange={props.handleReference}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="accno" name="accno" label="Account Number" fullWidth 
              helperText={errorAccno ? "Please enter the valid Account number" : ""}
              error={errorAccno}
              onChange={handleChangeAccountno}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
            <Button variant="contained"  style={{ backgroundColor: '#0c7f88' }}>Verify</Button>
            </Grid> */}
          </Grid>
    </React.Fragment>
  );
}