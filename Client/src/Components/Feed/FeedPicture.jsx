import React from "react";
import "./Feed.css";
/**
 * Returns you the thumbnail of a Youtube video as an img.
 * @param onclick Has onclick which will be applied to the Thumbnail
 * @param id Has an id for its data to give it to the onclick function.
 * @param videoId Has videoId is an url to a youtube video which the thumbnail should be taken.
 */
export class FeedPicture extends React.Component {
  constructor(props) {
    super(props);
    this.picture = props.videoId
      .replace(
        "https://www.youtube.com/watch?v=",
        "https://img.youtube.com/vi/"
      )
      .concat("/0.jpg");
    this.onclick = props.onclick;
    this.id = props.id;
  }
  render() {
    return (
      <img
        alt=""
        src={this.picture}
        onClick={() => this.onclick(this.id)}
        className="FeedPicture"
      />
    );
  }
}
