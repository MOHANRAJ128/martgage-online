import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import PersistentDrawerLeft from './Home'; 
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    display: 'flex',
  },
  title: {
    lineHeight:'50px',
    marginLeft:'50px',
  },
  typoText:{
      color:'#42145F'
  },
  appBar: {
      backgroundColor:'#42145f',
      fontWeight:'bold',
      height:'50px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#AD1982',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color:'#42145F',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text:{
    textAlign:'center',
  }
}));


export default function SignIn() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, showError] = useState(false);
  const validateUser = (event) => {
    let customNum =document.getElementById("number").value;
    let customName =document.getElementById("cname").value;
    if(customNum == 12345 || customName == 'Alice'){
    setLoggedIn(true)
    }
    else{
        showError(true)
    }
  };
  const handleCloseToast = (event, reason) => {
    showError(false)
  };

  return (
    <div>
    <AppBar
      position="fixed"
      className={classes.appBar}
    >
        <Typography variant="h6" noWrap className={classes.title}>
        ABC Mortgage
        </Typography>
        
   
    </AppBar>
    {loggedIn &&
        <PersistentDrawerLeft/>
    }
    {!loggedIn &&
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.typoText}>
          Find Customer
        </Typography>
        <div className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="number"
            label="Customer Number"
            name="email"
            autoComplete="email"
            autoFocus
            
          />
          <div className={classes.text}>OR</div>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="cname"
            label="Customer Name"
            name="cname"
            autoComplete="cname"
            autoFocus
            
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ backgroundColor: '#0c7f88' }}
            onClick={validateUser}
          >
            Search
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" className={classes.typoText}>
                Forgotten Customer Number?
              </Link> */}
              {error &&
      <Snackbar anchorOrigin={ {vertical: "top", horizontal: 'right'} } 
      open={error} 
      autoHideDuration={7000} onClose={handleCloseToast}>
  <Alert variant="filled" onClose={handleCloseToast} severity="error">
  No records found for the customer
  {/* {alertStatus=='ChequeBook' ? 'Cheque Book Ordered successfully' : 'Credit Book Ordered Sucessfully'} */}
  </Alert>
</Snackbar>}
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </div>
      </div>
    </Container>
}
    </div>
  );
}