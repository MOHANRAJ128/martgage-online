import React from 'react';
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

const columns = [
  { id: 'whoto', label: 'Payee', minWidth: 100 },
  { id: 'howOrdered', label: 'Source', minWidth: 100 },
  { id: 'dateOrdered', label: 'Date Ordered', minWidth: 100 },
];

function createData(serialno, howOrdered, dateOrdered) {  
  return { serialno, howOrdered, dateOrdered };
}

const rows = [
  createData('321-340', 'ATM', '14/07/2009'),
  createData('341-360', 'Automatic', '14/07/2009'),
  createData('361-380', 'ATM', '15/07/2009'),
  createData('381-400', 'ATM', '14/09/2009'),
  createData('321-340', 'Automatic', '14/07/2020'),
  createData('321-340', 'ATM', '14/07/2009'),
  createData('321-340', 'ATM', '14/07/2009'),
  createData('321-340', 'Automatic', '14/07/2009'),
  createData('321-340', 'ATM', '14/07/2009'),
  createData('321-340', 'Automatic', '14/07/2009'),
  createData('321-340', 'ATM', '14/07/2009'),
  createData('321-340', 'Automatic', '14/07/2009'),
  createData('321-340', 'ATM', '14/07/2009'),
  createData('321-340', 'ATM', '14/07/2009'),
  createData('321-340', 'ATM', '14/07/2009'),
];


const useStyles = makeStyles({
  root: {
    width: '100%',
    alignContent: 'centre',
  },
  container: {
    maxHeight: 440,
  },
  button:{
    margin: '10px',
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <div>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
    <Button variant="contained" color="primary" className={classes.button}
    onClick={() => alert("TBD")} >
    Order New Cheque Book
    </Button>

    </div>
  );
}
