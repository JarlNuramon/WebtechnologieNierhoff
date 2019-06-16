import React from "react";
import { ScrollView } from "react-native";
import { NormalButton } from "../StyledButton/StyledButton.jsx";
import SearchBar from "../StyledInput/StyledInput.jsx";
import "./TagManager.css";
import { searchTags } from "../../server";
const axios = require("axios");

export default class TagManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsBefore: [],
      tags: [],
      searchValue: ""
    };
    this.onFinish = props.onFinish;
  }

  async componentDidMount() {
    await this.getTags();
  }

  async getTags(){
    await axios.get("http://zweipluseins.de:300/api/tags").then(avc => {
      this.setState({tagsBefore: avc.data});
    });
    await this.verarbeiteTags();
  }

  async verarbeiteTags(){
    var x = this.state.tagsBefore.map(element => {
      console.log(element);
      return {
        name: element,
        button: (
            <NormalButton
                text={element}
                onClick={() => this.addTagProcess(element)}
            />
        ),
        isClicked: false
      };
    });
    this.setState({
      tags: x
    })
  }

  addTag = text => {
    this.setState(
      this.state.tags.map(tag =>
        tag.name === text ? (tag.isClicked = !tag.isClicked) : null
      )
    );
  };

  addNewTag = input => {
    if (input !== "")
      this.setState(prevState => {
        return {
          tags: prevState.tags.concat({
          name: input,
          button: (
             <NormalButton
               text={input}
               nClick={() => this.addTagProcess(input)}
             />
            ),
            isClicked: true
          })
        };
      });
    console.log(this.state.tags);
  };

  updateTagBar = e => {
    const value = e.target.value;
    this.setState({
      searchValue: value
    });
  };

  addTagProcess = text => {
    this.addTag(text);
    this.onFinish(
      this.state.tags.filter(tag => tag.isClicked).map(tag => tag.name)
    );
  };

  addNewTagProcess = input => {
    this.addNewTag(input);
    this.onFinish(
      this.state.tags.filter(tag => tag.isClicked).map(tag => tag.name)
    );
  };

  render() {
    return (
      <>
        <ul className="Taglist">
          <li className="TagSearch">
            <SearchBar
              className="TagSearch"
              onChange={this.updateTagBar}
              name="tags"
              placeholder="Search Tag"
            />
          </li>
          <li>
            <NormalButton
              text="add"
              onClick={() => {
                this.addNewTagProcess(this.state.searchValue);
                this.setState({
                  searchValue: ""
                });
              }}
            />
          </li>
        </ul>
        <ScrollView
          className="TagScrollView"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {this.state.tags.map(tag =>
            tag.isClicked === true ? (
              <div className="Selected">{tag.button}</div>
            ) : null
          )}
          {this.state.tags
            .filter(
              tag =>
                (this.state.searchValue === "" && tag.isClicked === false) ||
                (this.state.searchValue !== "" &&
                  tag.isClicked === false &&
                  tag.name.toUpperCase() ===
                    this.state.searchValue.toUpperCase())
            )
            .map(tag => tag.button)}
        </ScrollView>
      </>
    );
  }
}
