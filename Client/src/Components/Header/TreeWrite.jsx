import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";
import TreeAdd from "./TreeAdd";
import TreeLevel from "./TreeLevel";
export class TreeWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [{ title: "", video_id: 1, parent_id: null }],
      levels: [
        <TreeLevel onClick={this.createLevel} parent={null} limit={false} />
      ]
    };
  }
  createLevel = parent => {
    this.setState((state, props) => ({
      levels: state.levels.concat([
        <TreeLevel onClick={this.createLevel} parent={parent} limit={true} />
      ])
    }));
  };
  createNode = () => {};
  render() {
    return (
      <>
        <div id="Write">
          <center>
            <table>
              <tr />
              <center>{this.state.levels}</center>
            </table>
          </center>
        </div>
        <NormalButton text="Posten" />
      </>
    );
  }
}
