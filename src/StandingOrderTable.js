import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddStandingOrder from './AddStandingOrder';

import Axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#42145F',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(whoTo, reference, amount, frequency, nextdue,status) {
  return { whoTo, reference, amount, frequency, nextdue,status };
}

// const rows = [
//   createData('Jon', 159, 500, 6, '12/04/2010','Pending'),
//   createData('Bob', 126, 1000, 12, '12/04/2010','Pending'),
//   createData('David', 1547, 700, 6, '12/04/2010','Pending'),
//   createData('EB', 15969, 800, 12, '12/04/2010','Pending'),
// ];
var rows=[];
// function getStandingOrders() {
//   rows=[];
//   Axios.get("http://localhost:8080/api/getStandingOrders")
//     .then(res=>{
//       rows=res.data;
//       console.log(rows);
//     })
// }
// getStandingOrders();
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  button:{
    backgroundColor:"#0c7f88",
    color:'White',
     "&:hover": {
      textDecoration: 'underline !important',
    }
  },
});
const getStandingOrders=()=>{
  rows=[];
  Axios.get("http://192.168.43.62:8080/api/getStandingOrders")
    .then(res=>{
      // res.data.map(obj=>{
      //   let dateOrdered = new Date(obj.nextdue);
      //   let currentDate = new Date();
      //   if(dateOrdered<currentDate)
      //   {
      //     obj.nextdue="Completed at "+obj.nextdue;
      //   }
      //   rows=[...rows,obj];
      // })
      res.data.sort((a,b)=>(new Date(a.nextdue)<new Date(b.nextdue)) ? 1 : -1);
      rows=res.data;
      console.log(rows);
    })
}
getStandingOrders();
export default function CustomizedTables() {
  const classes = useStyles();
  const [openStandingOrderPopup,setOpenStandingOrderPopup] = React.useState(false);
const addnewStandingOrder = () => {
    setOpenStandingOrderPopup(true);
};

const handleClose =() => {
  console.log("Close has been called..");
    // getStandingOrders();
    setOpenStandingOrderPopup(false);
}
  return (
    <div>
        <h4>Standing Orders</h4>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.stickyHeader}>
          <TableRow>
            <StyledTableCell>Payee</StyledTableCell>
            <StyledTableCell>Reference</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell>Frequency</StyledTableCell>
            <StyledTableCell>Due Date</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell>{row.firstName}</StyledTableCell>
              <StyledTableCell>{row.reference}</StyledTableCell>
              <StyledTableCell>{row.amount}</StyledTableCell>
              <StyledTableCell>{row.frequency}</StyledTableCell>
              <StyledTableCell>{row.nextdue}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <Button variant="contained"  className={classes.button} style={{ backgroundColor: '#0c7f88' }} 
    onClick={addnewStandingOrder} >
    Add New Standing Order
    </Button>
    {openStandingOrderPopup &&
    <AddStandingOrder
    open = {true}
    onClose = {handleClose}
    getStandingOrders={getStandingOrders}
    />
    }
    </div>
  );
}
