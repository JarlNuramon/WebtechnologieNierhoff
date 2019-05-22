import React from "react";
import { FeedPicture } from "./FeedPicture.jsx";

export class Feed extends React.Component {
  constructor(props) {
    super(props);
    let json = require("/src/Post.json");
    this.feedPictures = [];
    for (var i = 0; i < 4; i++) {
      var x = json.Posts[i];
      this.feedPictures.push(
        <div className="FeedThread" key={x["id"]}>
          <FeedPicture
            videoId={x["link"]}
            id={x["id"]}
            onclick={props.onclick.bind(this)}
          />
          <div className="title">{x["title"]}</div>
          <div className="author">von {x["author"]}</div>
        </div>
      );
    }
    console.log(this.feedPictures);
  }
  render() {
    return <div className="Feed">{this.feedPictures}</div>;
  }
}
