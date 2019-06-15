import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { WritePopUp } from "./WritePopUp";
import { ToStartPage } from "./ToStartPage";
import CheeseburgerMenu from "./CheeseburgerMenue/CheeseburgerMenue";
import { SearchHeader } from "./../Search/Search";
import "./Header.css";

export default class Header extends React.Component {
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
    this.toLogin = props.toLogin.bind(this);
    this.switchFilter = props.filter;
    this.searchFav = props.searchFav;
    this.cockie = props.cookie;
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


  handleLogOut = () => {
    //TODO REQUEST OF LOG OUT
    this.toLogin();
    this.setState({ anchorEl: null });

  };
  static getDerivedStateFromProps(props) {
    return { onStartPage: props.onStartPage };
  }



  getWritePopUp(){
    var cookieList = this.cockie();
    if(cookieList[" group"]!=="student"){
      return (<WritePopUp
          className="SharePopUp"
          showModal={this}
          handleCloseModal={this.handleCloseModal}
          handleOpenModal={this.handleOpenModal}
      />)
    }
  }

  render() {
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
      <div className="root">
        <AppBar position="static" id="MuiAppBar">
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
            <ul id="grow">{search}</ul>
            <ul id="toolUl">
              <li id="toolLi">
                {this.getWritePopUp()}
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
                      <MenuItem color="inherit" onClick={this.handleLogOut}>
                        Log out
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
