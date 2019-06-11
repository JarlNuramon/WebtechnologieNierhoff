import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { WritePopUp } from "./WritePopUp";
import { ToStartPage } from "./ToStartPage";
import CheeseburgerMenu from "./CheeseburgerMenue/CheeseburgerMenue";
import { SearchHeader } from "./../Search/Search.jsx";
import "./Header.css";

/*
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
<div className="my-menu-content">
    <ul>
      <li><Link to="/thing1" onClick={this.closeMenu}>Menu item 1</Link></li>
      <li><Link to="/thing2" onClick={this.closeMenu}>Menu item 2</Link></li>
    </ul>
  </div>
  */

const styles = {
  root: {
    flexGrow: 1,
    paddingBottom: "64px"
  },
  MuiAppBar: {
    backgroundColor: "#212121"
  },
  grow: {
    flexGrow: 1,
    backgroundColor: "#212121"
  }
};

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null,
      returnToStartPage: false,
      onStartPage: props.onStartPage
    };

    this.action = props.action;
    this.searchAction = props.searchAction;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleClosePostModal = this.handleClosePostModal.bind(this);
    this.handleOpenPostModal = this.handleOpenPostModal.bind(this);
    this.returnOpenModal = this.returnOpenModal.bind(this);
    this.handleClick = props.handleClick;

    this.switchFilter = props.filter;
    this.searchFav = props.searchFav;
  }

  returnOpenModal() {
    return this.state.showModal;
  }
  handleOpenModal() {
    this.setState({ showWriteModal: true });
  }

  handleCloseModal() {
    this.setState({ showWriteModal: false });
  }
  handleOpenPostModal() {
    this.setState({ showPostModal: true });
  }

  handleClosePostModal() {
    this.setState({ showPostModal: false });
  }
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  static getDerivedStateFromProps(props) {
    return { onStartPage: props.onStartPage };
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    let logo = "";
    let search = "";
    if (this.state.onStartPage === false) {
      logo = <ToStartPage action={this.action} />;
      search = (
        <SearchHeader action={this.searchAction} filter={this.switchFilter} />
      );
    } else {
      logo = "";
      search = "";
    }

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          className={classes.MuiAppBar}
          style={{ position: "fixed", "max-height": "64px" }}
        >
          <Toolbar id="Toolbar">
            <ul id="toolUl">
              <li id="toolLi">
                <CheeseburgerMenu
                  handleClick={this.handleClick}
                  searchFav={this.searchFav}
                />
              </li>
              <li id="toolLi">{logo}</li>
            </ul>
            <ul id="toolUl" className={classes.grow} align="center">
              <li id="toolLi">{search}</li>
            </ul>
            <ul id="toolUl">
              <li id="toolLi">
                <WritePopUp
                  className={classes.SharePopUp}
                  showModal={this}
                  handleCloseModal={this.handleCloseModal}
                  handleOpenModal={this.handleOpenModal}
                />
              </li>
              <li id="toolLi">
                {auth && (
                  <div>
                    <IconButton
                      aria-owns={open ? "menu-appbar" : undefined}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem color="inherit" onClick={this.handleClose}>
                        Profile
                      </MenuItem>
                      <MenuItem color="inherit" onClick={this.handleClose}>
                        My account
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </li>
            </ul>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
