import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";

export class TreeWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [{ title: "", video_id: 1, parent_id: null }]
    };
  }
  createNode = () => {};
  render() {
    return (
      <div id="Write">
        <table>
          <tr>
            <td>
              <center>
                <NormalButton
                  text="+"
                  className="rootNode"
                  onClick={this.createNode}
                />
              </center>
            </td>
          </tr>
        </table>
        <NormalButton text="Post" />
      </div>
    );
  }
}
