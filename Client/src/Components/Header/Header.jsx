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
import { SearchHeader } from "/src/Components/Search/Search";

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
  }
  searchStarted = searchValue => {
    console.log(searchValue);
    this.setState({ search: searchValue, page: "thread" });
    this.render();
  };
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

    let logo = "";
    let search = "";
    if (this.state.onStartPage === "false") {
      logo = <ToStartPage action={this.action} />;
      search = <SearchHeader action={this.searchAction} />;
    } else {
      logo = "";
      search = "";
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.MuiAppBar}>
          <Toolbar>
            <tr>
              <td>
                <CheeseburgerMenu handleClick={this.handleClick} />
              </td>
              <td>{logo}</td>
            </tr>
            <tr className={classes.grow} align="center">
              <td>{search}</td>
            </tr>
            <tr>
              <td>
                <WritePopUp
                  className={classes.SharePopUp}
                  showModal={this}
                  handleCloseModal={this.handleCloseModal}
                  handleOpenModal={this.handleOpenModal}
                />
              </td>
              <td>
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
              </td>
            </tr>
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
