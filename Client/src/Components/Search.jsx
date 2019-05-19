import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { StartButton } from "./StyledButton";
import SearchBar from "./SearchBar";
const styles = {
  root: {
    flexGrow: 1
  },
  MuiAppBar: {
    "background-color": "rgba(25,157,116,1)"
  },
  grow: {
    flexGrow: 1,
    background: "rgba(25,157,116,1)"
  },
  menuButton: {
    marginLeft: -12,
    background: "rgba(25,157,116,1)",
    marginRight: 20
  }
};
export class Search extends React.Component {
  state = {
    search: ""
  };
  constructor(props) {
    super(props);
    this.action = props.action;
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
            <SearchBar onChange={this.updateSearch} />
          </div>
          <div class="startButtons">
            <div class="twoColumn">
              <StartButton text="Filter" onClick={this.post} />
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
