import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";
import TreeAdd from "./TreeAdd";
import TreeLevel from "./TreeLevel";
export class TreeWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [{ title: "", video_id: 1, parent_id: null }],
      level: 1,
      levels: [<TreeLevel onClick={this.createLevel} level={0} />]
    };
  }
  createLevel = () => {
    this.setState((state, props) => ({
      level: state.level + 1,
      levels: state.levels.concat([
        <TreeLevel onClick={this.createLevel} level={state.level} />
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
              <tr>
                <TreeAdd />
              </tr>
              <center>{this.state.levels}</center>
            </table>
          </center>
        </div>
        <NormalButton text="Posten" />
      </>
    );
  }
}
