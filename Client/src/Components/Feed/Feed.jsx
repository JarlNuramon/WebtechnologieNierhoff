import React from "react";
import { FeedPicture } from "./FeedPicture.jsx";
import { Text, View, ScrollView } from "react-native";

const classes = {
  root: {
    alignItems: "center",
    paddingLeft: "12.5%",
    paddingRight: "12.5%",
    paddingTop: "20px",
    paddingBottom: "20px",
    alignContent: "center",
    width: "75%"
  },
  item: {
    flexDirection: "column",
    borderColor: "rgba(25,157,116,1)",
    borderWidth: 1,
    backgroundColor: "#212121",
    margin: 5,
    width: "160px",
    height: "200px",
    textAlign: "left"
  },
  text: {
    alignItems: "flex-start",
    padding: 5,
    paddingTop: "0px",
    color: "white",
    wordWrap: "break-word",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "90%",
    textOverflow: "ellipsis",
    lineHeight: 1.0
  }
};

export class Feed extends React.Component {
  constructor(props) {
    super(props);
    let json = require("../../Post.json");
    this.feedPictures = [];
    for (var i = 0; i < json.Posts.length; i++) {
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
