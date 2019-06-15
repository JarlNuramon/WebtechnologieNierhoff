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
    this.level = props.level;
  }
  createNode = () => {
    console.log("creating node for this level");
    this.setState((state, props) => ({
      nodes: state.nodes.concat([
        <TreeAdd createNodeForLevel={this.createNode} />
      ])
    }));
  };

  createLevel = () => {
    console.log("Creating new level");
    this.setState((state, props) => ({
      active: true,
      nodes: state.nodes.concat([
        <TreeAdd createNodeForLevel={this.createNode} />
      ])
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
              onClick={this.createLevel}
            />
          ) : (
            this.state.nodes
          )}
        </center>
      </tr>
    );
  }
}
