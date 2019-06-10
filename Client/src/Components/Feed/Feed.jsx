import React from "react";
import { FeedPicture } from "./FeedPicture.jsx";
import { Text, View, ScrollView } from "react-native";
import "./Feed.css";

export class Feed extends React.Component {
  constructor(props) {
    super(props);
    let json = require("/src/Post.json");
    this.feedPictures = [];
    for (var i = 0; i < json.Posts.length; i++) {
      var x = json.Posts[i];
      this.feedPictures.push(
        <View key={x["id"]} className="item">
          <FeedPicture
            videoId={x["link"]}
            id={x["id"]}
            onclick={props.onclick.bind(this)}
          />
          <Text id="text">
            <h4>{x["title"]}</h4>
            <font size="1">by: {x["author"]}</font>
            <p>{x["text"]}</p>
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <div id="feedRoot">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.feedPictures.map(feedPicture => feedPicture)}
        </ScrollView>
      </div>
    );
  }
}
