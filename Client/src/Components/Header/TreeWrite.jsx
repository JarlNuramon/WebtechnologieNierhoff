import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";
import TreeLevel from "./TreeLevel";
import {postTree,postNode} from "../../server.js";
import DataInput from "../StyledInput/StyledInput.jsx";

export default class TreeWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [{ parent: null, limit: false, nodes: [] }]
    };
	this.close = props.close;
  }

  addNodeIdToLevel = (parent, id) => {
    let level = this.state.levels.filter(e => e.parent === parent)[0];
    level.nodes.push(id);
    this.setState((state, props) => ({
      levels: state.levels.filter(e => e.parent !== parent).concat(level)
    }));
  };
  createLevel = parent => {
    this.setState((state, props) => ({
      levels: state.levels.concat([{ parent: parent, limit: true, nodes: [] }])
    }));
  };
  getCookie() {
    var cookieList = document.cookie ? document.cookie.split(";") : [];
    var cookieValues = {};
    for (var i = 0, n = cookieList.length; i !== n; ++i) {
      var cookie = cookieList[i];
      var f = cookie.indexOf("=");
      if (f >= 0) {
        var cookieName = cookie.substring(0, f);
        var cookieValue = cookie.substring(f + 1);
        if (!cookieValues.hasOwnProperty(cookieName)) {
          cookieValues[cookieName] = cookieValue;
        }
      }
    }
    return cookieValues;
  }


  post = async () => {
    var cookie = this.getCookie();
    await fetch(postTree, {
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
        "name": this.name,
        "user":cookie[" user"],
        "token": cookie[" token"]
      })
    })
	this.forceUpdate();
      for (let level of this.state.levels) {
          for (let node of level.nodes) {
              console.log(level.nodes);
              await fetch(postNode, {
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
                      title: node.title,
                      parent_id: level.parent,
                      tree_name: this.name,
                      video_id: node.id,
                      user: cookie[" user"],
                      token: cookie[" token"]
                  })
              });
          }
      }

      this.close();
  };
  render() {
	console.info("Levels");
    console.info(this.state.levels);
    let treeLevels = this.state.levels.map(level => (
      <TreeLevel
        onClick={this.createLevel}
        onNodeCreated={this.addNodeIdToLevel}
        parent={level.parent}
        limit={level.limit}
      />
    ));
    return (
      <>
        <div id="Write">
            Name of tree:
            <DataInput onChange={e => (this.name = e.target.value)} />
            <center>
            <table>
              <tr />
              <center>{treeLevels}</center>
            </table>
          </center>
        </div>
        <NormalButton text="Posten" onClick={this.post} />
      </>
    );
  }
}
