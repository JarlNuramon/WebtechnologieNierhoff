import { FeedPicture } from "./FeedPicture.jsx";
import React from "react";
import "./Feed.css";

const axios = require('axios');
const restServer = "http://localhost:300"; //die url des rest servers


//TODO: Warning beheben: Warning: Each child in a list should have a unique "key" prop.
export class FeedThread extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      json: []
    };
    this.state.search = props.search;
    this.onclick = props.onclick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ search: nextProps.search });
  }
  closeTree = () => {
    this.setState({ isOpenTreeModal: false });
  };

  searchForTag(search) {
    var json;
    console.log("search");

    axios.get(restServer+"/api/post/search/"+search).then(avc => {
      console.log(avc.data)
      this.setState({
            json: avc.data
          }
      );
    });
    console.log(this.state.json);
  }
  componentDidMount() {
    this.searchForTag(this.state.search);
  }

  render() {
    this.SearchPictures = [];
    for (var i = 0; i < this.state.json.length; i++) {
      this.SearchPictures.push(
        <div className="SearchResult">
          <div className="twoColumn">
            <FeedPicture
              videoId={this.state.json[i].link}
              id={this.state.json[i].id}
              onclick={this.onclick}
            />
          </div>
          <div className="twoColumn" id="desc">
            <h4>{this.state.json[i].title}</h4> <br />
            {this.state.json[i].text}
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
    return (
      <center>
        <div className="result">{rows}</div>
      </center>
    );
  }




}

