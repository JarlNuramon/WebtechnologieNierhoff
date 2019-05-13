import React from "react";
import { MenueItem } from "./MenueItem.jsx";
export class Menue extends React.Component {
  handleClick = id => {
    console.log(id);
  };
  constructor(props) {
    super(props);
    let json = require("../Section.json");
    this.root = this.getRootSections(json);
    this.menue = [];
    for (var i = 0; i < this.root.length; i++) {
      var x = this.root[i];
      this.menue.push(
        <MenueItem
          name={x.name}
          id={x.id}
          child={this.getChildSections(x.id, json)}
          onclick={this.handleClick}
        />
      );
    }
  }
  render() {
    return (
      <div className="Sections">
        <ul>{this.menue}</ul>
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
            child={this.getChildSections(json.Section[i].id, json)}
            onclick={this.handleClick}
          />
        );
    }
    return child;
  }
}
