import React from "react";
import YouTube from "react-youtube";
import ReactModal from "react-modal";
import { ExitButton, AddButton } from "./Components/StyledButton";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    "background-color": "#212121",
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
    this.main = props.showModal;
    this.post = this.getPost(props.id);
    this.onclick = props.handleCloseModal;
    this.handleCloseModal = props.handleCloseModal;
    this.handleOpenModal = props.handleOpenModal;
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
        >
          <ExitButton onClick={this.onclick} />
          <AddButton onClick={this.fav} />
          {this.post["title"]}
          <YouTube
            videoId={this.post["link"].replace(
              "https://www.youtube.com/watch?v=",
              ""
            )}
            opts={this.opts}
            onReady={this._onReady}
          />
          <div style={customStyles.text}>{this.post["text"]} </div>
        </ReactModal>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  //TODO: Integration Request info for one Post
  getPost(id) {
    let json = require("./Post.json");
    for (var i = 0; i < json.Posts.length; i++) {
      if (json.Posts[i].id === id) {
        return json.Posts[i];
      }
    }
    return;
  }
}
