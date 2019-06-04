import React from "react";
import { FeedPicture } from "./FeedPicture.jsx";
import { Text, View, StyleSheet, ScrollView } from "react-native";

const classes = {
  root: {
    "padding-left": "40px",
    "padding-right": "40px",
    "padding-top": "20px",
    "padding-bottom": "20px"
  },
  item: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    overflow: "hidden",
    borderColor: "rgba(25,157,116,1)",
    borderWidth: 1,
    backgroundColor: "#212121",
    margin: 5,
    width: "160px",
    height: "200px"
  },
  text: {
    "padding-top": "0px",
    alignItems: "flex-start",
    padding: 5,
    color: "white",
    "word-wrap": "break-word",
    "white-space": "nowrap",
    overflow: "hidden",
    width: "90%",
    "text-overflow": "ellipsis",
    "line-height": 1.5
  }
};

export class Feed extends React.Component {
  constructor(props) {
    super(props);
    let json = require("/src/Post.json");
    this.feedPictures = [];
    for (var i = 0; i < 4; i++) {
      var x = json.Posts[i];
      this.feedPictures.push(
        <View key={x["id"]} style={classes.item}>
          <FeedPicture
            videoId={x["link"]}
            id={x["id"]}
            onclick={props.onclick.bind(this)}
          />
          <Text style={classes.text}>
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
      <div style={classes.root}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.feedPictures.map(feedPicture => feedPicture)}
        </ScrollView>
      </div>
    );
  }
}
