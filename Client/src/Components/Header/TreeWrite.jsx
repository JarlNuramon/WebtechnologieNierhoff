import React from "react";
import { NormalButton } from "../StyledButton/StyledButton";
import TreeLevel from "./TreeLevel";
import {postTree,postNode} from "../../server.js";
export default class TreeWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [{ parent: null, limit: false, nodes: [] }]
    };
  }

  treeRender = ()=>this.forceUpdate();
  addNodeIdToLevel = (parent, id) => {
    let level = this.state.levels.filter(e => e.parent === parent)[0];
    level.nodes.push(id);
    console.log("addNodeIdToLevel");
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
        "name": "baum3",
        "user":cookie[" user"],
        "token": cookie[" token"]
      })
    })

    for(let level of this.state.levels)
    {
      console.log(`Level:`);
      for(let node of level.nodes){
        console.log(level.nodes)
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
          "title":
              "node",
          "parent_id":
          level.parent,
          "tree_name":
              "baum3",
          "video_id":
          node,
          "user":
              cookie[" user"],
          "token":
              cookie[" token"]
        })
    })}
    }
  }
  render() {
    console.info("I am in render of write ");
    console.info(this.state.levels);
    let a = this.state.levels.map(level => (
      <TreeLevel
        onClick={this.createLevel}
        onNodeCreated={this.addNodeIdToLevel}
        parent={level.parent}
        limit={level.limit}
        treeRender={this.treeRender}
      />
    ));
    return (
      <>
        <div id="Write">
          <center>
            <table>
              <tr />
              <center>{a}</center>
            </table>
          </center>
        </div>
        <NormalButton text="Posten" onClick={this.post} />
      </>
    );
  }
}
