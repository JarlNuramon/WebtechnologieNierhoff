import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";
import { AutoComplete } from "@progress/kendo-react-dropdowns";

export default class TreeAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      hasLevel: false,
      suggestions: require("../../Post.json").Posts.map(e => e.title),
      title: "",
      id: -1,
      search: ""
    };
    this.onClick = props.createNodeForLevel;
    this.addChild = props.addChild;
  }
  createNode = () => {
    if (this.state.search !== null)
      this.setState((state, props) => ({
        active: true,
        title: state.search,
        id: require("../../Post.json").Posts.filter(
          e => state.search === e.title
        )[0].id
      }));
    this.onClick();
  };
  render() {
    console.log(this.state.search);
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
