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
    "background-color": "rgba(39,57,61,1)",
    transform: "translate(-50%, -50%)",
    color: "white"
  }
};
export class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.main = props.showModal;
    this.post = this.getPost(props.id);
    console.log(this.post);
    this.onclickAddButton;
    this.onclick = props.handleCloseModal;
    this.handleCloseModal = props.handleCloseModal;
    this.handleOpenModal = props.handleOpenModal;
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
  }
  fav = () => {
    console.log(this.post);
    //let json = require("./Favoriten.json");

    var asdasdd = {
      id: this.post.id,
      date: new Date()
      /*title: this.post.title,
      link: this.post.link,
      text: this.post.text,
      tags: this.post.tags.split(","),
      author: "Jan Nierhoff",
      author_id: this.lookForAuthorId("Jan Nierhoff"),
      section_id: this.lookForSectionId(this.post.ort),
      section: this.post.ort*/
    };
    console.log("War hier2");
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
          {this.post["text"]}
        </ReactModal>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

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
