import React, { Component, Fragment } from 'react'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link, withRouter } from 'react-router-dom'
import { MenuList, MenuItem } from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#3d4977",
    minHeight: "70px"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background: "#f4f5fd",
    fontSize: "1rem",
    fontFamily: "Roboto",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#f4f5fd"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  menuLink: {
    fontWeight: "normal",
  },
  account: {
    float: "right"
  }
});

class Layout extends Component {
  constructor(props) {
    super(props);
    localStorage.clear()
    this.state = {
      anchorEl: null
    }
    this.handleClose= this.handleClose.bind(this);
    this.handleMenu= this.handleMenu.bind(this);
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  handleMenu = (event) => {
    this.state.ancherEl
          ? this.setState({ anchorEl: null })
          : this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { classes, location: { pathname }, children } = this.props
    const { anchorEl } = this.state;

    return <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography component="div" variant="h6">
              SeF App (Search Facility Near Me)
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <MenuList>
            <MenuItem component={Link} to="/" selected={'/' === pathname}
              className={classes.menuLink}>
              <ListItemIcon>
                <SearchIcon fontSize="small" />
              </ListItemIcon>
              <span> Search Facility </span>
            </MenuItem>
          </MenuList>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      </Fragment>
  }
}
export default compose(
  withRouter,
  withStyles(styles)
)(Layout)
