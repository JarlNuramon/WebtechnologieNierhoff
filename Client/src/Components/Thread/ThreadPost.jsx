import React from "react";
import YouTube from "react-youtube";
import {
  ExitButton,
  AddButton
} from "/src/Components/StyledButton/StyledButton";
import PropTypes from "prop-types";
export default class ThreadPost extends React.Component {
  render() {
    return (
      <div>
        <ExitButton onClick={this.props.onclick} />
        <AddButton onClick={this.props.fav} />
        {this.props.post["title"]}
        <YouTube
          videoId={this.props.post["link"].replace(
            "https://www.youtube.com/watch?v=",
            ""
          )}
          onReady={this.props._onReady}
        />
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
