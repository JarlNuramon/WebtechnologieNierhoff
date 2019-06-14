import React from "react";
import { FeedPicture } from "./FeedPicture.jsx";
import { Text, View, ScrollView } from "react-native";
import "./Feed.css";


const axios = require("axios");
const restServer = "http://localhost:300"; //die url des rest servers

export class Feed extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          json: [],
          feedPictures: []
      };
      this.onClick = props.onclick;
  }

  componentDidMount() {
        this.getPost();
    }

  jsonToHTML(){
        for (var i = 0; i < this.state.json.length; i++) {
            var x = this.state.json[i];
            this.setState(prevState => {
                    return {
                        feedPictures: prevState.feedPictures.concat(
                            <View key={x["_id"]} className="item">
                                <FeedPicture
                                    videoId={x["link"]}
                                    id={x["_id"]}
                                    onclick={this.onClick}
                                />
                                <Text id="text">
                                    <h4>{x["title"]}</h4>
                                    <font size="1">by: {x["author_id"]}</font>
                                    <p>{x["text"]}</p>
                                </Text>
                            </View>
                        )
                    }
            })
        }

    }

  async getPost(){
        await axios.get(restServer+"/api/post/newest").then(response => {
            this.setState({json: response.data});
        });
        await this.jsonToHTML();
    };

  render() {
    return (
      <div id="feedRoot">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
              this.state.feedPictures
          }
        </ScrollView>
      </div>
    );
  }
}
