import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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
  WhatItem() {
    return (
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        <ListItem button>
          <ListItemText>
            <div>{this.child}</div>
          </ListItemText>
        </ListItem>
      </Collapse>
    );
  }
  render() {
    if (this.child.length < 1)
      return (
        <div className="MenueItem" onClick={() => this.click(this.name)}>
          {this.name}
        </div>
      );
    return (
      <div>
        <List>
          <ListItem button onClick={this.handleClick}>
            <ListItemText>
              <div className="MenueItem" onClick={() => this.click(this.name)}>
                {this.name}
              </div>
            </ListItemText>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {this.WhatItem()}
        </List>
      </div>
    );
  }
}

export default MenueItem;
