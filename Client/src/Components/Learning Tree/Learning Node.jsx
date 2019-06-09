import React from "react";
import { PropTypes } from "prop-types";
import SteppedLineTo from "react-lineto";
export default class LearningNode extends React.Component {
  static propTypes = {
    root: PropTypes.object.isRequired,
    nodes: PropTypes.array.isRequired,
    openThread: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.root = props.root;
    this.openThread = props.openThread;
    const nodes = props.nodes;
    const children = [];
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].parent_id === this.root.video_id) children.push(nodes[i]);
    }
    this.jsxChildren = children.map(element => {
      return (
        <LearningNode
          key={"" + element.video_id}
          root={element}
          nodes={nodes}
          openThread={props.openThread}
        />
      );
    });
    this.lines = children.map(element => {
      return (
        <SteppedLineTo
          from={"" + this.root.video_id}
          toAnchor="top 15%"
          fromAnchor="top 100%"
          to={"" + element.video_id}
          borderColor="rgba(25,157,116,1)"
          delay={true}
          borderWidth={2}
          orientation="h"
          key={this.root.video_id + "x" + element.video_id}
        />
      );
    });
  }
  render() {
    return (
      <div className="tree">
        <div
          id="parent"
          onClick={() => this.openThread(this.root.video_id)}
          className={this.root.video_id}
        >
          {this.root.title}
        </div>
        <br />
        <br />
        <div id="children">{this.jsxChildren}</div>
        {this.lines}
      </div>
    );
  }
}
