import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { StartButton, NormalButton } from "../StyledButton/StyledButton";
import SearchBar from "../StyledInput/StyledInput";
import "./Search.css";

export class Search extends React.Component {
  state = {
    search: ""
  };
  constructor(props) {
    super(props);
    this.action = props.action;
    this.switchFilter = props.filter;
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
    this.forceUpdate();
  };

  render() {
    return (
      <div id="search">
        <FormControl fullWidth={true} margin="none">
          <div id="searchDiv">
            <SearchBar
              type="text"
              placeholder="Search..."
              className="SearchBarInSearch"
              onChange={this.updateSearch}
              onKeyDown={e => {
                if (e.key === "Enter") this.action(this.state.search);
              }}
            />
          </div>
          <div className="startButtons">
            <div className="twoColumn">
              <StartButton text="Filter" onClick={this.switchFilter} />
            </div>
            <div className="twoColumn">
              <StartButton
                text="Search"
                onClick={() => {
                  this.action(this.state.search);
                }}
              />
            </div>
          </div>
        </FormControl>
      </div>
    );
  }
}

export class SearchHeader extends React.Component {
  state = {
    search: ""
  };
  constructor(props) {
    super(props);
    this.action = props.action;
    this.switchFilter = props.filter;
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
    this.forceUpdate();
  };

  render() {
    return (
      <div id="searchHeader">
        <ul abc="hallo">
          <li>
            <SearchBar
              type="text"
              placeholder="Search..."
              onChange={this.updateSearch}
              onKeyDown={e => {
                if (e.key === "Enter") this.action(this.state.search);
              }}
            />
          </li>
          <li>
            <NormalButton text="Filter" onClick={this.switchFilter} />
          </li>
        </ul>
      </div>
    );
  }
}
