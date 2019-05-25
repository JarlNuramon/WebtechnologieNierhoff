import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { StartButton, NormalButton } from "/src/Components/StyledButton";
import SearchBar from "./SearchBar";

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
        <FormControl fullWidth="true" margin="none">
          <div id="searchDiv">
            <SearchBar
              type="text"
              onChange={this.updateSearch}
              onKeyDown={e => {
                e.key === "Enter" ? this.action(this.state.search) : null;
              }}
            />
          </div>
          <div class="startButtons">
            <div class="twoColumn">
              <StartButton text="Filter" onClick={this.switchFilter} />
            </div>
            <div class="twoColumn">
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
    console.log(props.action);
    this.switchFilter = props.filter;
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
    this.forceUpdate();
  };

  render() {
    return (
      <div id="searchHeader">
        <tr>
          <td>
            <SearchBar
              type="text"
              onChange={this.updateSearch}
              onKeyDown={e => {
                e.key === "Enter" ? this.action(this.state.search) : null;
              }}
            />
          </td>
          <td>
            <NormalButton
              text="Filter"
              onClick={this.switchFilter}
              background="red"
              color="red"
            />
          </td>
        </tr>
      </div>
    );
  }
}
