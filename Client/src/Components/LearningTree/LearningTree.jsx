import React from "react";
import { PropTypes } from "prop-types";
import LearningNode from "./LearningNode.jsx";
import ReactModal from "react-modal";
import { ExitButton } from "../StyledButton/StyledButton";
import "./LearningTree.css";

export default class LearningTree extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    openThread: PropTypes.func.isRequired,
    showModal: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired
  };

  findTreeNodes(id) {
    let json = require("./../../LearningStack.json");
    const nodes = [];
    for (var i = 0; i < json.Stack.length; i++) {
      if (json.Stack[i].id === id) nodes.push(json.Stack[i]);
    }
    return nodes;
  }
  constructor(props) {
    super(props);
    this.id = props.id;
    this.showModal = props.showModal;
    this.openThread = props.openThread.bind(this);
    this.close = () => {
      console.log("button pressed");
      props.close();
    };

    let nodes = this.findTreeNodes(this.id);
    this.root = nodes.pop(element => {
      return element.parent_id === null;
    });
    this.tree = (
      <LearningNode
        key={"" + this.root.video_id}
        root={this.root}
        openThread={this.openThread}
        nodes={nodes}
      />
    );
  }
  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.showModal.state.isOpenTreeModal}
          contentLabel="Learning Tree"
          className="Modal"
          overlayClassName="Overlay"
          onRequestClose={this.close}
        >
          <ExitButton onClick={this.close} />
          {this.tree}
        </ReactModal>
      </div>
    );
  }
}
