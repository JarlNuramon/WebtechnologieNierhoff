import React from "react";
import { PropTypes } from "prop-types";
import LearningNode from "./LearningNode.jsx";
import ReactModal from "react-modal";
import { ExitButton } from "../StyledButton/StyledButton";
import "./LearningTree.css";
import {treeNode} from "../../server";

const axios = require("axios");
export default class LearningTree extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    openThread: PropTypes.func.isRequired,
    showModal: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired
  };

  async findTreeNodes(id) {

    await axios.get(treeNode+id).then(avc=>{
      this.setState({tree: avc.data})

   })
    await this.buildRoot();
  }
  constructor(props) {
    super(props);
    this.state ={
      tree: [],
      root:null,
    }
    this.id = props.id;
    this.showModal = props.showModal;
    this.openThread = props.openThread.bind(this);
    this.close = () => {

      props.close();
    };
  }
  componentDidMount() {
    this.findTreeNodes(this.id);
  }

  async buildRoot(){
     let root = this.state.tree.filter(e=>e.parent_id===null)[0];
     this.setState({
       root:<LearningNode
           key={"" + root.video_id}
           root={root}
           openThread={this.openThread}
           nodes={this.state.tree}
       />
     })

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
          {this.state.root}
        </ReactModal>
      </div>
    );
  }
}
