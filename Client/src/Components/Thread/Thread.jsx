import React from "react";
import ReactModal from "react-modal";
import ThreadPost from "./ThreadPost";
import {ExitButton, TreeButton} from "./../StyledButton/StyledButton";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "./Thread.css";
import {favorite, videoInTree} from "../../server";

const axios = require("axios");

export class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "Post",
      fav: false,
      id: -1,
      json: [],
      tree:[],
      treeButton:[]
    };
    this.id = props.id;
    this.main = props.showModal;
    this.onclick = props.handleCloseModal;
    this.handleCloseModal = props.handleCloseModal;
    this.handleOpenModal = props.handleOpenModal;
    this.treeProcessing = props.treeProcessing;
  }


  componentDidMount() {
    this.checkIfisPartOfTree(this.id);

  }

  async generateButton()
  {
    if (this.state.tree.length>0) {

       this.setState({treeButton:this.state.tree.map(element => (
          <TreeButton
              text={element}
              key={element}
              id={element}
              className="Treemaker"
              onClick={this.treeProcessing}
          />
      ))})};
  }
  async checkIfisPartOfTree(id) {
    try{
    await axios.get(videoInTree+id).then(avc => {
      this.setState({tree:avc.data})
    });}catch (error) {
        console.log(error);
      }
    await this.generateButton();


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
      await axios.post(favorite, {
        post_id: this.id,
        user: cookieList[" user"],
        token: cookieList[" token"]
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.state.tree);
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
            <TabPanel>{this.state.treeButton}</TabPanel>
          </Tabs>
        </ReactModal>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
