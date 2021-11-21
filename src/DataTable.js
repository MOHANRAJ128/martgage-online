import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  titletext:{
    height: '50px',
    lineHeight: '50px',
    color:'#42145F',
    fontWeight:'bold',
 
  },
});

function createData(serialno, howOrdered, dateOrdered) {  
  return { serialno, howOrdered, dateOrdered };
}

const rows = [
  createData('321-340', 'ATM', '14/07/2009'),
  createData('341-360', 'Automatic', '14/07/2009'),
  createData('361-380', 'ATM', '15/07/2009'),
  createData('381-400', 'ATM', '14/09/2009'),
  
];

export default function DataTable() {
//   var rows=[];
// function getStoppedCheques()
// {
//   rows=[];
//   Axios.get("http://65.1.124.94:8080/api/getChequeBooks/1")
//     .then(res=>{
//       console.log(res.data);
//       rows=res.data;
      
//     })
    
// }
// getStoppedCheques();
  const classes = useStyles();

  return (
      <div>
          <h3 className={classes.titletext}>Show Books</h3>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell >Source</TableCell>
            <TableCell >Date Ordered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.serialno}
              </TableCell>
              <TableCell >{row.howOrdered}</TableCell>
              <TableCell >{row.dateOrdered}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
