import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";
import { AutoComplete } from "@progress/kendo-react-dropdowns";
export default class TreeAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      suggestions: require("../../Post.json").Posts.map(e => e.title),
      title: "",
      id: -1,
      search: ""
    };
  }
  createNode = () => {};
  render() {
    console.log(this.state.search);
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
            text="Take"
            className="rootNode"
            onClick={this.createNode}
          />
          <NormalButton
            text="Add Node"
            className="rootNode"
            onClick={this.createNode}
          />
        </center>
      </td>
    );
  }
}
