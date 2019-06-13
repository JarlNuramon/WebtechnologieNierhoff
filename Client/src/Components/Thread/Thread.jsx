import React from "react";
import ReactModal from "react-modal";
import ThreadPost from "./ThreadPost";
import { ExitButton } from "./../StyledButton/StyledButton";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import "./tab.css";

const restServer = "http://localhost:300"; //die url des rest servers
const axios = require('axios')

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
    width: "50vw",
    minHeight: "550.8px"
  },
  text: {
    height: "100px",
    overflowY: "auto",
    overflowX: "none",
    color: "white"
  }
};
export class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "Post",
      fav: false,
      id: 1
    };
    this.main = props.showModal;
    this.post = this.getPost(props.id);
    this.onclick = props.handleCloseModal;
    this.handleCloseModal = props.handleCloseModal;
    this.handleOpenModal = props.handleOpenModal;
    this.tree = props.tree;
  }

  async getCookie() {
    var cookieList = document.cookie ? document.cookie.split(";") : [];
    var cookieValues = {};
    for (var i = 0, n = cookieList.length; i !== n; ++i) {
      var cookie = cookieList[i];
      var f = cookie.indexOf("=");
      if (f >= 0) {
        var cookieName = cookie.substring(0, f);
        var cookieValue = cookie.substring(f + 1);
        //console.log("cookieName=" + cookieName + " cookieValue=" + cookieValue);
        if (!cookieValues.hasOwnProperty(cookieName)) {
          cookieValues[cookieName] = cookieValue;
        }
      }
    }
    return cookieValues;
  }

  /**
   * Bei klick auf den Button AddButton wird ein Objekt erstellt.
   * Dieses besitzt die ID des Posts aus der Post.json
   * und das Datum beim erstellen.
   */
  fav = () => {
    this.id = this.post.id;
    this.setFav()
  }

  async  setFav() {
    try {
      var cookieList = await this.getCookie();
      await axios.post(restServer + "/api/favorite", {
        post_id: this.id,
        user: cookieList[" user"],
        token: cookieList[" token"],
      });
      this.setState({fav:true});
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div class="Post">
        <ReactModal
          isOpen={this.main.state.showPostModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          onRequestClose={this.onclick}
        >
          <div id="ButtonModal">
            <ExitButton onClick={this.onclick} id="Exit" />
          </div>
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
    let json = require("./../../Post.json");
    for (var i = 0; i < json.Posts.length; i++) {
      if (json.Posts[i].id === id) {
        return json.Posts[i];
      }
    }
    return;
  };
}
