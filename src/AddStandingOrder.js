import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PayeeDetails from './PayeeDetails';
import PaymentForm from './Payment';
import Review from './Review';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import StandingOrderForm from './StandingOrderForm';
import Axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Payee Details', 'Payment details', 'Review your order'];
// const steps = ['Payee Details', 'Review your order'];

var newSO={
  firstName:"",
  lastName:"",
  sortCode:"",
  reference:"",
  accountNo:"",
  date:"",
  amount:"",
  frequency:""
}

export default function AddStandingOrder(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  // const [newStandingOrder,setNewStandingOrder]=React.useState({
  //   firstName:"",
  //   lastName:"",
  //   sortCode:"",
  //   reference:"",
  //   accountNo:"",
  //   date:"",
  //   amount:"",
  //   frequency:""
  // });
  const { onClose, selectedValue, open } = props;
  const [isValidSortCode,setIsValidSortCode] = React.useState(false)
  const [isValidAccNO,setIsValidAccNo] = React.useState(false)
  
  const addNewStandingOrder=()=>{
    Axios.post("http://192.168.43.62:8080/api/addNewStandingOrder",newSO)
      .then(res=>{
        console.log("Added successfully..");
        console.log(res);
        props.getStandingOrders();
      })
  }
  const handleNext = () => {
        setActiveStep(activeStep + 1);
        console.log(activeStep);
        if(activeStep === steps.length-1)
        {
          addNewStandingOrder();
          setIsValidSortCode(true);
        }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleFirstName=(e)=>{
    newSO={...newSO,firstName:e.target.value};
  }
  const handleLastName=(e)=>{
    newSO={...newSO,lastName:e.target.value};
  }
  const handleSortCode=(e)=>{
    newSO={...newSO,sortCode:e.target.value};
    if(newSO.sortCode != null & newSO.sortCode.length == 6){
      setIsValidSortCode(true)
    }
    else{
      setIsValidSortCode(false)
    }

  }
  const handleReference=(e)=>{
    newSO={...newSO,reference:e.target.value};
  }
  const handleAccountNo=(e)=>{
    newSO={...newSO,accountNo:e.target.value};
    if(newSO.accountNo != null && newSO.accountNo.length == 8){
      setIsValidAccNo(true)
    }
    else{
      setIsValidAccNo(false)
    }
  }
  const handleDate=(e)=>{
    console.log(e);
    newSO={...newSO,date:e.target.value};
  }
  const handleAmount=(e)=>{
    newSO={...newSO,amount:e.target.value};
  }
  const handleFrequency=(e)=>{
    newSO={...newSO,frequency:e.target.value};
    
    console.log(newSO);
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PayeeDetails 
        isValidSortCode
        isValidAccNO
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handleSortCode={handleSortCode}
        handleReference={handleReference}
        handleAccountNo={handleAccountNo}

        />;
      case 1:
        return <PaymentForm 
        handleDate={handleDate}
        handleAmount={handleAmount}
        handleFrequency={handleFrequency}
        />;
      case 2:
        return <Review newStandingOrder={newSO}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <React.Fragment> 
        <Dialog onClose={handleClose} 
        fullWidth='md'
        maxWidth='md'
        aria-labelledby="simple-dialog-title" open={open}>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            New Standing Order
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Success
                </Typography>
                <Typography variant="subtitle1">
                  Your order  has been successfully placed.
                </Typography>
                <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                    className={classes.button}
                  >
                    Ok
                  </Button>
                  </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {/* {activeStep !== 0 && (
                    // <Button onClick={handleBack} className={classes.button}>
                    //   Back
                    // </Button>
                  )} */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled = {!isValidSortCode || !isValidAccNO}

                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
      </Dialog>
    </React.Fragment>
  );
}