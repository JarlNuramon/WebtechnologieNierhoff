import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";
import { AutoComplete } from "@progress/kendo-react-dropdowns";
import {postAll} from "../../server";

const axios = require("axios");


export default class TreeAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      hasLevel: false,
      suggestions: [],
      title: "",
      id: -1,
      search: "",
      posts:[]
    };
    this.onClick = props.createNodeForLevel;
    this.addChild = props.addChild;
    this.treeRender = props.treeRender;
  }

  componentDidMount() {
    this.getPost()

  }
  async getPost() {
    console.log("I am in a get post function")
    await axios.get(postAll).then(avc => {
      console.log(`GetPost ${avc.data}`);
      this.setState({suggestions: avc.data.map(e => e.title),posts:avc.data});
    });
    this.treeRender()
  };

  createNode = () => {
    let id = this.state.posts.filter(
      e => this.state.search === e.title
    )[0]._id;
    if (this.state.search !== null)
      this.setState((state, props) => ({
        active: true,
        title: state.search,
        id: id
      }));
    console.log(id);
    this.onClick(id);
  };
  render() {
    console.log("my suggs"+this.state.suggestions);
    console.log("my posts"+this.state.posts);
    if (!this.state.active)
      return (
        <td>
          <center>
            <AutoComplete
              data={this.state.suggestions.filter(s =>
                s.includes(this.state.search)
              )}
              placeholder="e.g. React"
              onChange={e => this.setState({ search: e.target.value })}
            />
            <NormalButton
              text="Add Node"
              className="rootNode"
              onClick={this.createNode}
            />
          </center>
        </td>
      );
    return (
      <td>
        <center>{this.state.title}</center>
        {!this.state.hasLevel ? (
          <NormalButton
            text="Add Level"
            className="rootNode"
            onClick={() => {
              this.setState({ hasLevel: true });
              this.addChild(this.state.id);
            }}
          />
        ) : (
          ""
        )}
      </td>
    );
  }
}
