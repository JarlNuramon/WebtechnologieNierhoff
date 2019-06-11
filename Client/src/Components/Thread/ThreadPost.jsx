import React from "react";
import YouTube from "react-youtube";
import { AddButton } from "./../StyledButton/StyledButton";
import PropTypes from "prop-types";
export default class ThreadPost extends React.Component {
  render() {
    return (
      <div>
        <div id="ButtonModal">
          <AddButton onClick={this.props.fav} />
        </div>
        <center>
          <div className="title">{this.props.post["title"]}</div>
          <YouTube
            videoId={this.props.post["link"].replace(
              "https://www.youtube.com/watch?v=",
              ""
            )}
            onReady={this.props._onReady}
          />
        </center>
        <div style={this.props.customStyles.text}>
          {this.props.post["text"]}{" "}
        </div>
      </div>
    );
  }
}
ThreadPost.propTypes = {
  onclick: PropTypes.func.isRequired,
  fav: PropTypes.func.isRequired,
  _onReady: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  customStyles: PropTypes.object.isRequired
};
