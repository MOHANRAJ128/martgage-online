import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import AlertDialog from './Alert';
import DataTable from './DataTable';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

 
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button:{
    margin: '10px',
    backgroundColor:"#0c7f88",
    color:'White',
     "&:hover": {
      textDecoration: 'underline !important',
    }
  },
  text:{
    height: '50px',
    lineHeight: '50px',
    color:'#42145F',
    fontWeight:'normal',
  },
  titletext:{
    height: '50px',
    lineHeight: '50px',
    color:'#42145F',
    fontWeight:'bold',
 
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

export default function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const classes = useStyles();
  const [openAlertNewStop,setOpenAlertNewStop] = React.useState(false);
  
  //const radioGroupRef = React.useRef(null);

  // React.useEffect(() => {
  //   if (!open) {
  //     setValue(valueProp);
  //   }
  // }, [valueProp, open]);

  // const handleEntering = () => {
  //   if (radioGroupRef.current != null) {
  //     radioGroupRef.current.focus();
  //   }
  // };

  const handleCancel =(e) => {
    setOpenAlertNewStop(false);
    onClose();
  };

  const selectBookClick = () => {
    setOpenAlertNewStop(true);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      fullWidth='md'
      aria-labelledby="max-width-dialog-title"
      open={props.openDialog}
      {...other}
    >
      <DialogTitle id="max-width-dialog-title"  className={classes.titletext}>Stopped Cheques</DialogTitle>
      <DialogContent dividers>
      <DataTable/>
      <DialogActions>
        <Button variant="contained" onClick={selectBookClick}  className={classes.button} style={{ backgroundColor: '#0c7f88' }}> 
          Select Book
        </Button>
        </DialogActions>
        
        <h3 className={classes.titletext}>Add/Amend Books</h3>
        <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.text} >
          Serial number
          </FormControl>
          <FormControl>
        <TextField id="outlined-basic" label="From" variant="outlined" />
        </FormControl>
        <FormControl>
        <TextField id="outlined-basic" label="To" variant="outlined" />
        </FormControl>
        <br/>
        <FormControl className={classes.text} >
          Payee 
          </FormControl>
          <FormControl>
        <TextField id="outlined-basic" label="Payee" variant="outlined" />
        </FormControl>
        <br/>
        <FormControl className={classes.text} >
          Amount
          </FormControl>
          <FormControl>
        <TextField id="outlined-basic" label="Amount" variant="outlined" />
        </FormControl>
        </form>
        <DialogActions>
        <Button variant="contained" onClick={selectBookClick} className={classes.button} style={{ backgroundColor: '#0c7f88' }}> 
          Save
        </Button>
        </DialogActions>
      </DialogContent>
      {/* <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions> */}
    </Dialog>
    {openAlertNewStop &&
      <AlertDialog
      openAlertNewStop
      closeAlert ={handleCancel}
      />
    }
    </div>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};



// export default function ConfirmationDialog(props) {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(props.openDialog);
//   const [value, setValue] = React.useState('Dione');

//   const handleClickListItem = () => {
//     setOpen(true);
//   };

//   const handleClose = (newValue) => {
//     setOpen(false);

//     if (newValue) {
//       setValue(newValue);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <List component="div" role="list">
//         <ListItem button divider disabled role="listitem">
//           <ListItemText primary="Interruptions" />
//         </ListItem>
//         <ListItem
//           button
//           divider
//           aria-haspopup="true"
//           aria-controls="ringtone-menu"
//           aria-label="phone ringtone"
//           onClick={handleClickListItem}
//           role="listitem"
//         >
//           <ListItemText primary="Phone ringtone" secondary={value} />
//         </ListItem>
//         <ListItem button divider disabled role="listitem">
//           <ListItemText primary="Default notification ringtone" secondary="Tethys" />
//         </ListItem>
//         <ConfirmationDialogRaw
//           classes={{
//             paper: classes.paper,
//           }}
//           id="ringtone-menu"
//           keepMounted
//           open={open}
//           onClose={handleClose}
//           value={value}
//         />
//       </List>
//     </div>
// //   );
// }
