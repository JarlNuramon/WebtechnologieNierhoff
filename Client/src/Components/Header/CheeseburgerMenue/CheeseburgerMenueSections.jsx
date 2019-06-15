import React from "react";
import { MenueItem } from "./MenueItem.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorder from "@material-ui/icons/StarBorder";
import "./CheeseburgerMenue.css";
import { section } from "../../../server.js";

export class Menue extends React.Component {
  async getSection() {
    return fetch(section, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin"
    })
        .then(response => {
          return response.json();
        })
        .then(response => {
          if (response !== undefined) {
            return response
          } else {
            console.log("Error, no sections")
          }
        })
  }

  async lel() {
    this.json = await this.getSection();
    this.root = this.getRootSections(this.json)
    for (var i = 0; i < this.root.length; i++) {
      var x = this.root[i];
      this.menue.push(
          <MenueItem
              name={x.name}
              id={x._id}
              child={this.getChildSections(x._id, this.json)}
              key={x._id}
              onclick={this.handleClick}
          />
      );
    }
  }

  constructor(props) {
    super(props);
    this.loading =true;
    this.menue = [];
    this.search = props.search;
    this.searchFav = props.searchFav;
    this.handleClick = props.handleClick;
    this.lel();
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
    for (var i = 0; i < json.length; i++) {
      if (json[i].parent_id === null) {
        root.push(json[i]);
      }
    }
    return root;
  }

  getChildSections(id, json) {
    var child = [];
    for (var i = 0; i < json.length; i++) {
      if (json[i].parent_id === id)
        child.push(
          <MenueItem
            name={json[i].name}
            id={json[i]._id}
            key={json[i]._id}
            child={this.getChildSections(json[i]._id, json)}
            onclick={this.handleClick}
          />
        );
    }
    return child;
  }
}

export default Menue;
