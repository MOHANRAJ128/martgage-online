import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from './Dialog.js';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import ConfirmationDialogRaw from './Dialog';
import Axios from 'axios';
import GetLeaflet from './GetLeaflets';
const columnsCheqPayin = [
  { id: 'serialNo', label: 'Serial Nos.', minWidth: 100 },
  { id: 'howOrdered', label: 'Source', minWidth: 100 },
  { id: 'dateOrdered', label: 'Date Ordered', minWidth: 100 },
];

const columnsStoppedCheque = [
  { id: 'whoTo', label: 'Payee', minWidth: 100 },
  { id: 'amount', label: 'Amount', minWidth: 100 },
  { id: 'firstChequeNo', label: 'First Cheque No.', minWidth: 100 },
  { id: 'lastChequeNo', label: 'Last Cheque No.', minWidth: 100 },
  { id: 'dateAdvised', label: 'Date Issued', minWidth: 100 }
];

function createStoppedCheqData(whoTo, amount, firstChequeNo, lastChequeNo, dateAdvised) {  
  return { whoTo, amount, firstChequeNo, lastChequeNo, dateAdvised };
}
// function createData(serialno, howOrdered, dateOrdered) {  
//   return { serialno, howOrdered, dateOrdered };
// }

var click=localStorage.getItem("click");
var rowsCheque=[];
var leafNo=0;
var cheque={};
var payIn={};
function getChequeBooks(){
  rowsCheque=[];
  Axios.get("http://192.168.43.62:8080/api/getChequeBooks/1")
          .then(res=>{
              console.log(res.data);
              res.data.map(book=>{
                var temp={
                    serialNo:book.startLeafNo+"-"+book.endLeafNo,
                    howOrdered:book.comments,
                    dateOrdered:book.lastUpdated
                }
                cheque=book;
                rowsCheque=[...rowsCheque,temp]
              })
              // rows=res.data;
          })
          console.log(rowsCheque);
}
getChequeBooks();
var rowsPayin=[];
function getPayingInBooks(){
  rowsPayin=[];
  Axios.get("http://192.168.43.62:8080/api/getPayingInBooks/22")
          .then(res=>{
              console.log(res.data);
              res.data.map(book=>{
                var temp={
                    serialNo:book.startLeafNo+"-"+book.endLeafNo,
                    howOrdered:book.comments,
                    dateOrdered:book.lastUpdated
                }
                payIn=book;
                rowsPayin=[...rowsPayin,temp]
              })
              // rows=res.data;
          })
          console.log(rowsPayin);
}
getPayingInBooks();
function handleNewBooks(selected){
  let currentDate = new Date();
  let d = currentDate.getDate() <10 ? '0'+(currentDate.getDate()) : currentDate.getDate();
  let m = currentDate.getMonth()<10 ? '0'+(currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
  let y = currentDate.getFullYear();
  let date=y+"-"+m+"-"+d;
  click=(click == "false") ?true:false;
  localStorage.setItem("click",click);
  // var startLeaf=(rowsCheque[(rowsCheque.length)-1].endLeafNo)+1;
  // var endLeaf=(rowsCheque[(rowsCheque.length)-1].endLeafNo)+leafNo;
  console.log(cheque.endLeafNo);
  // console.log(leafNo+","+startLeaf+","+endLeaf);

  if(selected== 'ChequeBook')
  {
    var newChequeBook={
      "bookNo": 106,
      "custID": 1,
      "sortCodeNo": 106,
      "accNo": 206,
      "bookCategoryCode": 23,
      "createdSource": "cs2",
      "lang": "eng",
      "primaryAuthDesc": "pad",
      "secondaryAuthDesc": "sad",
      "orderRefNo": 3,
      "startLeafNo": parseInt(cheque.endLeafNo)+1,
      "endLeafNo": parseInt(cheque.endLeafNo)+parseInt(leafNo),
      "lastUpdated": date,
      "totalNoBook": 5,
      "comments": click ? "ATM" : "Branch",
      "minNoLeaf": "mnl"
  }
  Axios.post("http://192.168.43.62:8080/api/orderNewChequeBook",newChequeBook)
    .then(res=>{
     // window.location.reload(false);
        getChequeBooks();
    });
  }
  else
  {
    var PayInBook={
      "bookNo": 106,
      "custID": 2,
      "sortCodeNo": 106,
      "accNo": 206,
      "bookCategoryCode": 22,
      "createdSource": "cs2",
      "lang": "eng",
      "primaryAuthDesc": "pad",
      "secondaryAuthDesc": "sad",
      "orderRefNo": 3,
      "startLeafNo": parseInt(payIn.endLeafNo)+1,
      "endLeafNo": parseInt(payIn.endLeafNo)+parseInt(leafNo),
      "lastUpdated": date,
      "totalNoBook": 5,
      "comments": click ? "Online" : "Branch",
      "minNoLeaf": "mnl"
  }
  Axios.post("http://192.168.43.62:8080/api/orderNewPayingInBook",PayInBook)
  .then(res=>{
    //window.location.reload(false);
    getPayingInBooks();
  });
}
  
}

// const rowsCheque = [
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('341-360', 'Automatic', '14/07/2009'),
//   createData('361-380', 'ATM', '15/07/2009'),
//   createData('381-400', 'ATM', '14/09/2009'),
//   createData('321-340', 'Automatic', '14/07/2020'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'Automatic', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'Automatic', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'Automatic', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
// ];

// const rowsPayin = [
//   createData('321-340', 'Online', '14/07/2009'),
//   createData('341-360', 'Online', '13/07/2009'),
//   createData('361-380', 'Online', '11/07/2009'),
//   createData('381-400', 'Online', '09/09/2009'),
//   createData('321-340', 'Automatic', '14/07/2020'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'Online', '14/07/2009'),
//   createData('321-340', 'Automatic', '09/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'Automatic', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'Automatic', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
//   createData('321-340', 'ATM', '14/07/2009'),
// ];
var rowsStoppedCheq=[];
function getStoppedCheques()
{
  rowsStoppedCheq=[];
  Axios.get("http://192.168.43.62:8080/api/getStoppedCheques")
    .then(res=>{
      console.log(res.data);
      rowsStoppedCheq=res.data;
      
    })
    
}
getStoppedCheques();
// const rowsStoppedCheq = [
//   createStoppedCheqData('John', '200', 123 , 65, '13/07/2009'),
//   createStoppedCheqData('Bob', '500', 113 , 15, '19/09/2010'),
//   createStoppedCheqData('Will', '1000', 125 , 45, '13/07/2009'),
//   createStoppedCheqData('David', '500', 129 , 65, '13/07/2009'),
// ];

const useStyles = makeStyles({
  root: {
    width: '100%',
    alignContent: 'centre',
    margin: '25px 0px',
   
  },
  container: {
    maxHeight: 440,
  },
  button:{
    margin: '10px',
    backgroundColor:"#0c7f88",
    color:'White',
     "&:hover": {
      textDecoration: 'underline !important',
    }
  },
  stickyHeader:{
    backgroundColor: '#42145F !important',
    color: '#FFFFFF !important',
   
}
  
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = props.selected == 'ChequeBook' ?
   rowsCheque : (props.selected == 'StoppedCheque' ? rowsStoppedCheq : rowsPayin );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showToast,setShowToast] = useState(false);
  const [openOrder, setOpenOrder] = React.useState(false);
  const columns = props.selected == 'StoppedCheque' ? columnsStoppedCheque : columnsCheqPayin;
  console.log("columns")
  console.log(columns)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const addNewStop = () => {
      setOpenDialog(true);
  };

  const onClickLeafOrder = (e) => {
   
    if(e == false){
      setOpenOrder(false)
    }
    else{
    leafNo=e;
    handleNewBooks(props.selected);
    setOpenOrder(false);
    setShowToast(true);
    }
    
  }

  // const onChequeBookOrder = () => {
  //   //setOpenDialog(true);
  //   handleNewBooks("ChequeBook");
  //   setShowToast(true);
  // };

  const onChequeBookOrder = () => {
    //setOpenDialog(true);
    
    // handleNewBooks("ChequeBook");
    setOpenOrder(true);
    //setShowToast(true);
    
  };
  
  const onPayinBookOrder = () => {
    // handleNewBooks("PayinBook");
    setOpenOrder(true);
    //setShowToast(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseDialog = (index) => {
    setOpenDialog(false);
  };

  const handleCloseToast = (event, reason) => {
    setShowToast(false);
  };

  return (
      <div>
        <div><h3>{props.selected == 'ChequeBook' ? 'Your Cheque Book Details' :(props.selected=='StoppedCheque' ? 'Your stopped cheque Details' : 'Your Pay-In Book Details')}</h3></div>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table >
          <TableHead  className={classes.stickyHeader}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color:'White' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

    </Paper>
    <Button variant="contained"  className={classes.button} style={{ backgroundColor: '#0c7f88' }} 
    onClick={props.selected == 'ChequeBook' ? onChequeBookOrder : (props.selected == 'StoppedCheque' ? addNewStop : onPayinBookOrder ) } >
    {props.selected == 'ChequeBook' ? 'Order New Cheque Book' : (props.selected == 'StoppedCheque' ? 'Add New Stop' : 'Order New Payin Book' )}
    </Button>
    {openOrder &&
    <GetLeaflet
    openOrder
    onClickLeafOrder={ onClickLeafOrder}
    />
    }
    {showToast &&
      // <Dialog
      //   openDialog 
      //   handleCloseDialog = {handleCloseDialog}
      // />
      <Snackbar anchorOrigin={ {vertical: "top", horizontal: 'right'} } 
      open={showToast} 
      autoHideDuration={6000} onClose={handleCloseToast}>
  <Alert variant="filled" onClose={handleCloseToast} severity="success">
  {props.selected == 'ChequeBook' ? 'Cheque Book Ordered successfully' : (props.selected == 'StoppedCheque' ? 'There is no records found' : 'Credit Book Ordered Sucessfully' )}
  {/* {alertStatus=='ChequeBook' ? 'Cheque Book Ordered successfully' : 'Credit Book Ordered Sucessfully'} */}
  </Alert>
</Snackbar>
    }  
    {openDialog &&
      <ConfirmationDialogRaw
        openDialog
        onClose={handleCloseDialog}
        rows={rowsCheque}
        columns={columnsCheqPayin}
      />
    }     
    </div>
  );
}
