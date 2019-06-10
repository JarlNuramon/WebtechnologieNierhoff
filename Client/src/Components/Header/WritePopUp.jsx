import React from "react";
import ReactModal from "react-modal";
import {
  NormalButton,
  ExitButton,
  ShareButton
} from "/src/Components/StyledButton";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import "/src/Author.json";
import "./Header.css";

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

  render() {
    return (
      <div id="Write">
        <ShareButton onClick={this.handleOpenModal} />
        <ReactModal
          isOpen={this.main.state.showWriteModal}
          contentLabel="Minimal Modal Example"
          className="Modal"
          overlayClassName="Overlay"
        >
          <ExitButton onClick={this.handleCloseModal} /> <br />
          <FormControl className="Posting">
            <br />
            <b id="formText">Titel</b>
            <br />
            <Input
              type="text"
              placeholder="title"
              name="title"
              onChange={this.updateInput}
              className="Input"
            />{" "}
            <br />
            <b id="formText">Beschreibung</b>
            <br />
            <Input
              type="text"
              placeholder="text"
              name="text"
              onChange={this.updateInput}
              className="Input"
            />
            <br />
            <b id="formText">Link</b>
            <br />
            <Input
              type="text"
              placeholder="https://www.youtube.com/watch?v=example"
              name="link"
              onChange={this.updateInput}
              className="Input"
            />
            <br />
            <b id="formText">Ort</b>
            <br />
            <Input
              type="text"
              placeholder="Ort"
              name="ort"
              onChange={this.updateInput}
              className="Input"
            />
            <br />
            <b id="formText">Tags</b>
            <br />
            <Input
              type="text"
              name="tags"
              placeholder="Tag1, Tag2 ..."
              onChange={this.updateInput}
              className="Input"
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
  post() {
    let json = require("/src/Post.json");
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
  lookForAuthorId(str) {
    let json = require("/src/Author.json");
    for (var i = 0; i < json.Author.length; i++) {
      if (json.Author[i].name === str) {
        return json.Author[i].id;
      }
    }
  }
  lookForSectionId(str) {
    let json = require("/src/Section.json");
    for (var i = 0; i < json.Section.length; i++) {
      if (json.Section[i].name === str) {
        return json.Section[i].id;
      }
    }
  }

  updateInput(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
}
