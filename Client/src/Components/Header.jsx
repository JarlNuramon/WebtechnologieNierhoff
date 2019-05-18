import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CheeseburgerMenu from "cheeseburger-menu";
import { Menue } from "./Menue.jsx";
import { WritePopUp } from "./WritePopUp";
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
    flexGrow: 1
  },
  MuiAppBar: {
    "background-color": "#131C1E"
  },
  grow: {
    flexGrow: 1,
    "background-color": "#131C1E"
  },
  menuButton: {
    marginLeft: -12,
    "background-color": "#131C1E",
    marginRight: 300
  },
  SharePopUp: {}
};

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null,
      menuIsOpen: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleClosePostModal = this.handleClosePostModal.bind(this);
    this.handleOpenPostModal = this.handleOpenPostModal.bind(this);
    this.returnOpenModal = this.returnOpenModal.bind(this);
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
  closeMenu = () => {
    this.setState({ menuIsOpen: false });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleCheeseburger = () => {
    this.setState({ menuIsOpen: true });
  };
  /*
   <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={this.handleChange}
                aria-label="LoginSwitch"
              />
            }
            label={auth ? "Logout" : "Login"}
          />
        </FormGroup>
  */
  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <CheeseburgerMenu
          isOpen={this.state.menuIsOpen}
          closeCallback={this.closeMenu}
          backgroundColor="rgba(39, 57, 61, 1)"
        >
          <Menue />
        </CheeseburgerMenu>

        <AppBar className={classes.MuiAppBar} position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleCheeseburger}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              PidVid
            </Typography>
            <WritePopUp
              className={classes.SharePopUp}
              showModal={this}
              handleCloseModal={this.handleCloseModal}
              handleOpenModal={this.handleOpenModal}
            />
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
