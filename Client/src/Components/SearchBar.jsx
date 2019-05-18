import React from "react";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";

const StyledSearchBar = withStyles({
  root: {
    background: "rgba(255,255,255,1)",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 40,
    padding: "0 10px 0 10px",
    margin: "auto"
  },
  underline: {
    "&:after": {
      borderBottomColor: "rgba(25,157,116,1)"
    }
  }
})(Input);

/**
 * Gives you the standardlayout of PidVid Searchbar
 * @param onChange Has onChange for the onChange function of the Input
 */
export default function Searchbar(props) {
  return (
    <StyledSearchBar
      placeholder="Search..."
      onChange={props.onChange}
      fullWidth="true"
    />
  );
}
