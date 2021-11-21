import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(props.openAlertNewStop);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.closeAlert(false);
  };

  return (
    <div>
      <Dialog
        open={props.openAlertNewStop}
        onClose={handleClose}
        fullWidth="xs"
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ backgroundColor: '#42145F', color: 'white' }}>{"New Stop"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"style={{ fontWeight:'bold',lineHeight:'50px',height:'50px' }}>
            Added/Amended Successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus style={{ backgroundColor: '#0c7f88',color:'white' }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
