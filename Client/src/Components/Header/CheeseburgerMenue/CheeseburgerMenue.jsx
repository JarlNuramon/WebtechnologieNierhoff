import React from "react";
import Menu from "cheeseburger-menu";
import { Menue } from "./CheeseburgerMenueSections.jsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -15,
    "background-color": "#131C1E"
  }
};

class CheeseburgerMenue extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = props.handleClick.bind(this);
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
      <div>
        <Menu
          isOpen={this.state.menuIsOpen}
          closeCallback={this.closeMenu}
          backgroundColor="rgba(39, 57, 61, 1)"
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

export default withStyles(styles)(CheeseburgerMenue);
