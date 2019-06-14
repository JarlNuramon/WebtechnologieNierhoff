import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";
import TreeAdd from "./TreeAdd";

export default class TreeLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      nodes: []
    };
    this.onClick = props.onClick;
  }
  createNode = () => {
    console.log("Creating node");
    this.setState((state, props) => ({
      active: true,
      nodes: state.nodes.concat([<TreeAdd />])
    }));
    this.onClick();
    console.table(this.state);
  };
  render() {
    return (
      <tr>
        <center>
          {this.state.nodes.length < 1 ? (
            <NormalButton
              text="Add Level"
              className="rootNode"
              onClick={this.createNode}
            />
          ) : (
            this.state.nodes
          )}
        </center>
      </tr>
    );
  }
}
