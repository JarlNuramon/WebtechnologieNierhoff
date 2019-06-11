import React from "react";
import ReactModal from "react-modal";
import {
  NormalButton,
  ExitButton,
  ShareButton
} from "./../StyledButton";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import "./Author.json";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "50%",

    backgroundColor: "#212121",
    transform: "translate(-50%, -50%)"
  }
};
const StyledInput = withStyles({
  root: {
    background: "rgba(255,255,255,1)",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 40,
    padding: "0 10px 0 10px",
    margin: "left"
  },
  underline: {
    "&:after": {
      borderBottomColor: "rgba(25,157,116,1)"
    }
  }
})(Input);

const restServer = "http://localhost:300"; //die url des rest servers



export class WritePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.main = props.showModal;
    this.handleCloseModal = props.handleCloseModal;
    this.handleOpenModal = props.handleOpenModal;
    this.updateInput = this.updateInput.bind(this);
    this.post = this.post.bind(this);

    this.state = {
      title: "",
      link: "",
      text: "",
      tags: "",
      ort: ""
    };
  }
  static getCookie(){
    var cookieList = (document.cookie) ? document.cookie.split(';') : [];
    var cookieValues = {};
    for (var i = 0, n = cookieList.length; i !== n; ++i) {
      var cookie = cookieList[i];
      var f = cookie.indexOf('=');
      if (f >= 0) {
        var cookieName = cookie.substring(0, f);
        var cookieValue = cookie.substring(f + 1);

        console.log ("cookieName=" + cookieName + " cookieValue=" + cookieValue);

        if (!cookieValues.hasOwnProperty(cookieName)) {
          cookieValues[cookieName] = cookieValue;
        }
      }
    }
    return cookieValues;
  }
  //@TODO: section hardcode entfernen
  post(){
    var cookieList = this.getCookie();
    fetch(restServer + "/api/post", {
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
        title: this.state.title,
        link: this.state.link,
        text: this.state.text,
        post_date: new Date(),
        tags: this.state.tags.split(","),
        author: cookieList[" user"],
        section: this.state.session,
        token: cookieList[" token"]
      })
    });
  }

  render() {
    return (
      <div id="Write">
        <ShareButton onClick={this.handleOpenModal} />
        <ReactModal
          isOpen={this.main.state.showWriteModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
        >
          <ExitButton onClick={this.handleCloseModal} /> <br />
          <FormControl className="Posting">
            <br />
            <b id="formText">Titel</b>
            <br />
            <StyledInput
              type="text"
              placeholder="title"
              name="title"
              onChange={this.updateInput}
            />{" "}
            <br />
            <b id="formText">Beschreibung</b>
            <br />
            <StyledInput
              type="text"
              placeholder="text"
              name="text"
              onChange={this.updateInput}
            />
            <br />
            <b id="formText">Link</b>
            <br />
            <StyledInput
              type="text"
              placeholder="https://www.youtube.com/watch?v=example"
              name="link"
              onChange={this.updateInput}
            />
            <br />
            <b id="formText">Ort</b>
            <br />
            <StyledInput
              type="text"
              placeholder="Ort"
              name="ort"
              onChange={this.updateInput}
            />
            <br />
            <b id="formText">Tags</b>
            <br />
            <StyledInput
              type="text"
              name="tags"
              placeholder="Tag1, Tag2 ..."
              onChange={this.updateInput}
            />
            <br />
          </FormControl>
          <br />
          <div>
            <NormalButton
              text="Posten"
              onClick={this.post}
              className="Poster"
            />
          </div>
        </ReactModal>
      </div>
    );
  }

  /*
  post() {
    let json = require("./../../Post.json");
    var post = {
      id: Math.random()
        .toString(16)
        .replace("0.", ""),
      title: this.state.title,
      link: this.state.link,
      text: this.state.text,
      post_date: new Date(),
      tags: this.state.tags.split(","),
      author: "Jan Nierhoff",
      author_id: this.lookForAuthorId("Jan Nierhoff"),
      section_id: this.lookForSectionId(this.state.ort),
      section: this.state.ort
    };

    console.log(post);
    json.Posts.push(post);
    this.handleCloseModal();
  }


  lookForAuthorId(str){
    let json = require("./Author.json");
    for (var i = 0; i < json.Author.length; i++) {
      if (json.Author[i].name === str) {
        return json.Author[i].id;
      }
    }
  }
  lookForSectionId(str){
    let json = require("./../../Section.json");
    for (var i = 0; i < json.Section.length; i++) {
      if (json.Section[i].name === str) {
        return json.Section[i].id;
      }
    }
  }
*/

  updateInput(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }


  //TODO: Aufräumen
  /*lookForSectionId(Section){
  fetch(restServer + "/api/section", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    referrer: "no-referrer"
  })
      .then(response => {
        return response.text();
      })
      .then(response => {
        if (response !== "Nope") {
          console.log(response);
        } else {
          console.log(response);
        }
      });
}*/
  }

