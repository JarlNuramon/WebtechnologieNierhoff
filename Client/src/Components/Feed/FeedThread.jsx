import { FeedPicture } from "./FeedPicture.jsx";
import React from "react";

//TODO: Warning beheben: Warning: Each child in a list should have a unique "key" prop.
export class FeedThread extends React.Component {
  state = {
    search: ""
  };
  constructor(props) {
    super(props);
    this.state.search = props.search;
    this.onclick = props.onclick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ search: nextProps.search });
  }
  render() {
    var x = searchForTag(this.state.search);
    this.SearchPictures = [];

    for (var i = 0; i < x.length; i++) {
      this.SearchPictures.push(
        <div className="SearchResult">
          <div className="twoColumn">
            <FeedPicture
              videoId={x[i].link}
              id={x[i].id}
              onclick={this.onclick}
            />
          </div>
          <div className="twoColumn" id="desc">
            <h4>{x[i].title}</h4> <br />
            {x[i].text}
          </div>
        </div>
      );
    }
    var rows = [];
    for (var j = 0; j < this.SearchPictures.length; j += 2) {
      if (!(j + 1 < this.SearchPictures.length))
        rows.push(
          <div className="twoColumnSearch">
            {this.SearchPictures[j]}
            {<div className="SearchResult" />}
          </div>
        );
      else
        rows.push(
          <div className="twoColumnSearch">
            {this.SearchPictures[j]}
            {this.SearchPictures[j + 1]}
          </div>
        );
    }
    console.log(rows.length);
    return <div className="result">{rows}</div>;
  }
}
function searchForTag(search) {
  let json = require("/src/Post.json");
  console.log(search);
  var x = [];
  for (var i = 0; i < json.Posts.length; i++) {
    if (json.Posts[i].tags.includes(search)) {
      x.push(json.Posts[i]);
      console.log(json.Posts[i]);
    }
  }
  return x;
}
