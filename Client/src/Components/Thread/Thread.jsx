import React from "react";
import ReactModal from "react-modal";
import ThreadPost from "./ThreadPost";
import { ExitButton } from "./../StyledButton/StyledButton";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import "./Thread.css";

const axios = require("axios");
const restServer = "http://localhost:300"; //die url des rest servers

export class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "Post",
      fav: false,
      id: 1337,
      json: []
    };
    this.id = props.id;
    this.main = props.showModal;
    this.onclick = props.handleCloseModal;
    this.handleCloseModal = props.handleCloseModal;
    this.handleOpenModal = props.handleOpenModal;
    this.tree = props.tree;
    console.log("BIN IM CONSTRUCTOR");
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
    this.setFav();
  };

  //TODO: Favoriten button ändern wenn fav hinzugefühgt ist
  //      Zweites drücken entfernt den fav
  //      Testen, wenn echte Posts vorhanden
  //      @KK

  /**
   * Wenn Video noch nicht favorisiert dann schickt die function,
   * die Videoid, den Usernamen und den Token an die Api und setzt Favoriete
   * @returns {Promise<void>}
   */
  async setFav() {
    try {
      var cookieList = await this.getCookie();
      await axios.post(restServer + "/api/favorite", {
        post_id: this.id,
        user: cookieList[" user"],
        token: cookieList[" token"]
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.table("über dem render" + this.state.json);
    return (
      <div class="Post">
        <ReactModal
          isOpen={this.main.state.showPostModal}
          contentLabel="Minimal Modal Example"
          className="Modal"
          overlayClassName="Overlay"
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
                postid={this.id}
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

  //TODO: Entfernen?

  /*getPost = id => {
    let json = require("./../../Post.json");
    for (var i = 0; i < json.Posts.length; i++) {
      if (json.Posts[i].id === id) {
        return json.Posts[i];
      }
    }
    return;
  };*/
}
