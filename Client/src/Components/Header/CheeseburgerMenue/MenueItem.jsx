import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import "/src/Components/Header/CheeseburgerMenue/CheeseburgerMenue.css";

export class MenueItem extends React.Component {
  state = {
    open: false
  };
  constructor(props) {
    super(props);
    this.name = props.name;
    this.id = props.id;
    this.child = props.child;
    this.grandchild = props.grandchild;
    this.click = props.onclick.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  render() {
    if (this.child.length < 1)
      return (
        <ListItem className="textInMenue" onClick={() => this.click(this.name)}>
          {this.name}
        </ListItem>
      );
    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <ListItemText>
            <div
              className="textUnderlindesInMenue"
              onClick={() => this.click(this.name)}
            >
              {this.name}
            </div>
          </ListItemText>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <ListItem button>
            <ListItemText>
              <div className="textInMenue">{this.child}</div>
            </ListItemText>
          </ListItem>
        </Collapse>
      </div>
    );
  }
}

export default MenueItem;
