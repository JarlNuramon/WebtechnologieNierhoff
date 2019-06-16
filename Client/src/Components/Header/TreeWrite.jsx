import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";
import TreeLevel from "./TreeLevel";
export default class TreeWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [{ parent: "non", limit: false, nodes: [] }]
    };
  }

  addNodeIdToLevel = (parent, id) => {
    let level = this.state.levels.filter(e => e.parent === parent)[0];
    level.nodes.push(id);
    console.log("addNodeIdToLevel");
    this.setState((state, props) => ({
      levels: state.levels.filter(e => e.parent !== parent).concat(level)
    }));
  };
  createLevel = parent => {
    this.setState((state, props) => ({
      levels: state.levels.concat([{ parent: parent, limit: true, nodes: [] }])
    }));
  };
  post = () => {};
  render() {
    console.info("I am in render of write ");
    console.info(this.state.levels);
    let a = this.state.levels.map(level => (
      <TreeLevel
        onClick={this.createLevel}
        onNodeCreated={this.addNodeIdToLevel}
        parent={level.parent}
        limit={level.limit}
      />
    ));
    return (
      <>
        <div id="Write">
          <center>
            <table>
              <tr />
              <center>{a}</center>
            </table>
          </center>
        </div>
        <NormalButton text="Posten" onClick={this.post} />
      </>
    );
  }
}
