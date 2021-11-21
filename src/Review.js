import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payee Details
          </Typography>
          <Typography gutterBottom>Name : {props.newStandingOrder.firstName +" "+props.newStandingOrder.lastName}</Typography>
          <Typography gutterBottom>Sort Code : {props.newStandingOrder.sortCode}</Typography>
          <Typography gutterBottom>Reference : {props.newStandingOrder.reference}</Typography>
          <Typography gutterBottom>Account No. : {props.newStandingOrder.accountNo}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
          <Typography gutterBottom>Payment First Date : {props.newStandingOrder.date}</Typography>
          <Typography gutterBottom>Frequency Type : {props.newStandingOrder.frequency} </Typography>
          <Typography gutterBottom>Amount : {props.newStandingOrder.amount}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}