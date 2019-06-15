import React from "react";
import Menu from "cheeseburger-menu";
import { Menue } from "./CheeseburgerMenueSections.jsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import "./CheeseburgerMenue.css";

export default class CheeseburgerMenue extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = props.handleClick;
    this.searchFav = props.searchFav;
    this.state = {
      menuIsOpen: false
    };
  }

  closeMenu = () => {
    this.setState({ menuIsOpen: false });
  };

  handleCheeseburger = () => {
    this.setState({ menuIsOpen: true });
  };

  render() {
    return (
      <div className="CheeseburgerMenueRoot" >
        <Menu
          isOpen={this.state.menuIsOpen}
          closeCallback={this.closeMenu}
          backgroundColor="#131c1e"
        >
          <Menue handleClick={this.handleClick} searchFav={this.searchFav} />
        </Menu>

        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={this.handleCheeseburger}
        >
          <MenuIcon />
        </IconButton>
      </div>
    );
  }
}

CheeseburgerMenue.propTypes = {
  classes: PropTypes.object.isRequired
};
