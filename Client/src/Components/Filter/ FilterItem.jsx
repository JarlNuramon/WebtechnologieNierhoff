import React from "react";
import "./Filter.css";

export class FilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.searchAction = props.searchAction;
    this.name = props.name;
    this.id = "test";
  }

  render() {
    return (
      <td
        onClick={() => {
          if (this.id != null) this.searchAction(this.name);
        }}
      >
        {this.name}
      </td>
    );
  }
}
