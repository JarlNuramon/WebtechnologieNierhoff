import React from "react";
import YouTube from "react-youtube";
import { AddButton } from "./../StyledButton/StyledButton";
import PropTypes from "prop-types";
import "./Thread.css";
import { server_adress } from "../../server";

const axios = require("axios");
const restServer = server_adress; //die url des rest servers

export default class ThreadPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null
    };
    this.id = props.postid;
    this.fav = props.fav;
    this._onReady = props._onReady;
  }

  componentDidMount() {
    this.getPost();
  }

  //TODO: Integration Request info for one Post
  getPost() {
    console.log("bin in getPost");
    axios
      .get(restServer + "/api/post/id/5d028fbc9f18f61f440c5247")
      .then(avc => {
        console.log(avc.data);
        this.setState({ json: avc.data });
      });
  }

  render() {
    console.log("bin in ThreadPost");
    console.log(this.id);
    console.log(this.state.json);
    if (this.state.json !== null)
      return (
        <div>
          <div id="ButtonModal">
            <AddButton onClick={this.fav} />
          </div>
          <center>
            <div className="title">{this.state.json["title"]}</div>
            <YouTube
              videoId={this.state.json["link"].replace(
                "https://www.youtube.com/watch?v=",
                ""
              )}
              onReady={this._onReady}
            />
          </center>
          <div className="Text">{this.state.json["text"]} </div>
        </div>
      );
    return <div />;
  }
}
ThreadPost.propTypes = {
  onclick: PropTypes.func.isRequired,
  fav: PropTypes.func.isRequired,
  _onReady: PropTypes.func.isRequired,
  postid: PropTypes.string.isRequired,
  customStyles: PropTypes.object.isRequired
};
