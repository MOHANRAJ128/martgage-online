import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import ListSubheader from '@material-ui/core/ListSubheader';
import Drawer from "@material-ui/core/Drawer";
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from './Table.js';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EuroIcon from '@material-ui/icons/Euro';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CustomizedTables from './StandingOrderTable';
import { green } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
      backgroundColor:'#42145f',
      fontWeight:'bold',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  highLight:{
    color:green,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  avatar:{
    marginLeft: "auto",
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [openBook, setOpenBook] = useState(true);
  const [openTansactions, setopenTansactions] = useState(true);
  const [table,showTable] = useState("Welcome ! Click on the Menu Bar to explore the ABC Mortgage banking Services");
  const [clickCheque,onClickedCheque] = useState(0);
  const [clickPayin,onClickedPayin] = useState(0);
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAvatar = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleBookCkick = () => {
    setOpenBook(!openBook);
  };  
  const handleTransactionClick = () => {
    setopenTansactions(!openTansactions);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const showChequeBooks = (e) => {
    showTable(<Table
        selected = 'ChequeBook'
    />);
    onClickedCheque(1);
    onClickedPayin(0);
    handleListItemClick(e,0)
  }
  const showPayinBooks = (e) => {
    showTable(<Table
        selected = 'CreditBook'
    />);
    onClickedCheque(0);
    onClickedPayin(1);
    handleListItemClick(e,1)
  }
  const showStandingOrder = (e) => {
    showTable(<CustomizedTables/>);
    onClickedCheque(0);
    onClickedPayin(1);
    handleListItemClick(e,3)
  }
  const showStoppedCheque = (e) => {
    showTable(<Table
      selected = 'StoppedCheque'
  />);
    handleListItemClick(e,2)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
          ABC Mortgage
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            marginLeft="auto"
            aria-controls={menuId}
            onClick={handleMenu}
            className={classes.avatar}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openAvatar}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleClose}>Sign Out</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Account Details" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText primary="Cards" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Account Information" />
      </ListItem>
      <ListItem button style={{backgroundColor: "#b19cd9",color:"white"}} onClick={handleTransactionClick}>
        <ListItemIcon>
          <EuroIcon />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
        {openTansactions ? <ExpandMore /> : <ExpandLess /> }
      </ListItem>
      <Collapse in={!openTansactions} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button 
          selected={selectedIndex === 3} 
          className={classes.nested} onClick={showStandingOrder}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Standing Orders"  />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button style={{backgroundColor: "#b19cd9",color:"white"}} onClick={handleBookCkick}>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="Books" />
        {openBook ? <ExpandMore /> : <ExpandLess /> }
      </ListItem>
      <Collapse in={!openBook} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button 
          selected={selectedIndex === 0} 
          className={classes.nested} onClick={showChequeBooks}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Cheque book"  />
          </ListItem>
          <ListItem button selected={selectedIndex === 1} className={classes.nested} onClick={showPayinBooks }>
            <ListItemIcon>
              <BookOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Pay-in book" />
          </ListItem>
          <ListItem button selected={selectedIndex === 2} className={classes.nested} onClick={showStoppedCheque}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Show Stopped Cheque" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button>
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText primary="Payments" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" />
      </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {table}        
      </main>
    </div>
  );
}

