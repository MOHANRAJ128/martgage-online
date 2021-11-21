import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function GetLeaflets({openOrder,onClickLeafOrder}){
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [value,setValue] = React.useState(-1);
    
    const [isValidChequeCount,setIsValidChequeCount] = React.useState(true);


  const handleClick = () => {
    if(value != null){
    onClickLeafOrder(value);
    }
    else
    setError(true)
    onClickLeafOrder(false);
  };

  const handleClose = () => {
    onClickLeafOrder(false);
  };

  const handleLeaforder = (e) => {
    let chequeLeafCount = e.target.value;
    setValue(chequeLeafCount)
    //onClickLeafOrder(e)
    if(chequeLeafCount != null && chequeLeafCount >= 10 && chequeLeafCount <= 50){
      setIsValidChequeCount(true);
    }
    else
    {
      setIsValidChequeCount(false);
    }
  }
    return(
<Dialog open={openOrder} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Order Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the leaflets range and Submit
          </DialogContentText>
          <TextField
            autoFocus
            id="leaflets"
            label="No. of leaflets"
            type="number"
            helperText={!isValidChequeCount ? "Please enter a leaflet count between 10 & 50" : ""}
            error={!isValidChequeCount}
            onChange={handleLeaforder}
          required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary"  variant="contained"  >
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary" disabled={!isValidChequeCount || value == -1} variant="contained"  >
            Order
          </Button>
        </DialogActions>
      </Dialog>);
}