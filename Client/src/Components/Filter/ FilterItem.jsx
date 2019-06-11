import React from "react";

const td = {
  width: "20%"
};

export class FilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.searchAction = props.searchAction;
    this.name = props.name;
    this.id = props.id;
    this.id = "test";
  }

  render() {
    return (
      <td
        onClick={() => {
          if (this.id != null) this.searchAction(this.name);
        }}
        style={td}
      >
        {this.name}
      </td>
    );
  }
}
