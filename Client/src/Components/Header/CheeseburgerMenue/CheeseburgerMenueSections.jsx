import React from "react";
import { MenueItem } from "./MenueItem.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorder from "@material-ui/icons/StarBorder";
import "./CheeseburgerMenue.css";

export class Menue extends React.Component {
  constructor(props) {
    super(props);
    //TODO integration SECTIONS
    let json = require("/src/Section.json");
    this.root = this.getRootSections(json);
    this.menue = [];
    this.search = props.search;
    this.searchFav = props.searchFav;
    this.handleClick = props.handleClick.bind(this);
    for (var i = 0; i < this.root.length; i++) {
      var x = this.root[i];
      this.menue.push(
        <MenueItem
          name={x.name}
          id={x.id}
          child={this.getChildSections(x.id, json)}
          key={x.id}
          onclick={this.handleClick}
        />
      );
    }
  }
  render() {
    return (
      <div>
        <List>
          <ListItem onClick={() => this.searchFav()} button>
            <ListItemIcon>
              <div className="starIconInMenue">
                <StarBorder />
              </div>
            </ListItemIcon>
            <ListItemText>
              <div className="textInMenue">Favoriten</div>
            </ListItemText>
          </ListItem>
          <ul>{this.menue}</ul>
        </List>
      </div>
    );
  }
  getRootSections(json) {
    var root = [];
    for (var i = 0; i < json.Section.length; i++) {
      if (json.Section[i].parent_id === null) {
        root.push(json.Section[i]);
      }
    }
    return root;
  }
  getChildSections(id, json) {
    var child = [];
    for (var i = 0; i < json.Section.length; i++) {
      if (json.Section[i].parent_id === id)
        child.push(
          <MenueItem
            name={json.Section[i].name}
            id={json.Section[i].id}
            key={json.Section[i].id}
            child={this.getChildSections(json.Section[i].id, json)}
            onclick={this.handleClick}
          />
        );
    }
    return child;
  }
}

export default Menue;
