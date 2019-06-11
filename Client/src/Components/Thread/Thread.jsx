import React from "react";
import ReactModal from "react-modal";
import ThreadPost from "./ThreadPost";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import "./tab.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    backgroundColor: "#212121",
    transform: "translate(-50%, -50%)",
    color: "white",
    width: "50vw"
  },
  text: {
    height: "100px",
    "overflow-y": "auto",
    "overflow-x": "none",
    color: "white"
  }
};
export class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "Post"
    };
    this.main = props.showModal;
    this.post = this.getPost(props.id);
    this.onclick = props.handleCloseModal;
    this.handleCloseModal = props.handleCloseModal;
    this.handleOpenModal = props.handleOpenModal;
    this.tree = props.tree;
  }
  /**
   * Bei klick auf den Button AddButton wird ein Objekt erstellt.
   * Dieses besitzt die ID des Posts aus der Post.json
   * und das Datum beim erstellen.
   */
  fav = () => {
    var favObj = {
      id: this.post.id,
      date: new Date()
    };
    //TODO: Integration
    console.log(favObj);
  };

  render() {
    return (
      <div class="Post">
        <ReactModal
          isOpen={this.main.state.showPostModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          onRequestClose={this.onclick}
        >
          <Tabs>
            <TabList>
              <Tab>Post</Tab>
              <Tab>More</Tab>
            </TabList>
            <TabPanel>
              <ThreadPost
                onclick={this.onclick}
                fav={this.fav}
                _onReady={this._onReady}
                customStyles={customStyles}
                post={this.post}
              />
            </TabPanel>
            <TabPanel>{this.tree}</TabPanel>
          </Tabs>
        </ReactModal>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  //TODO: Integration Request info for one Post
  getPost = id => {
    let json = require("/src/Post.json");
    for (var i = 0; i < json.Posts.length; i++) {
      if (json.Posts[i].id === id) {
        return json.Posts[i];
      }
    }
    return;
  };
}
