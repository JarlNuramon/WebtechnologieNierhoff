import { FeedPicture } from "./FeedPicture.jsx";
import React from "react";
import "./Feed.css";
import { search, favoriteget } from "../../server";

const axios = require("axios");

//TODO: Warning beheben: Warning: Each child in a list should have a unique "key" prop.
export class FeedThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      json: []
    };
    this.onclick = props.onclick;
    this.getCookie = props.cookie
  }

  closeTree = () => {
    this.setState({ isOpenTreeModal: false });
  };

  async searchForTag(searchvalue) {
    if(searchvalue === "Favoriten"){
      this.returnFavorite();
    } else
    await axios.get(search+searchvalue).then(avc => {
      this.setState({
        json: avc.data
      })
    });
  }

  componentDidMount() {
    this.setState({
      search: this.props.search
    })
    this.searchForTag(this.props.search);
  }

  componentDidUpdate(prevProps){
    if(this.props.search !== prevProps.search)
    {
      this.searchForTag(this.props.search);
    }
  }

  async returnFavorite() {
    //TODO: Server soll hier alle fav. Videos zurück geben.
    var cookieValue = await this.getCookie();
    fetch(favoriteget, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({
        user: cookieValue[" user"],
        token: cookieValue[" token"]
      })
    }).then(response => {
      return response.json();
    }).then(response => {
      this.setState({
        json: response
      })
    })
  }

  render() {
    this.SearchPictures = [];
    for (var i = 0; i < this.state.json.length; i++) {
      //console.log("ID "+this.state.json)
      this.SearchPictures.push(
        <div className="SearchResult">
          <div className="twoColumn">
            <FeedPicture
              videoId={this.state.json[i].link}
              id={this.state.json[i]._id}
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
