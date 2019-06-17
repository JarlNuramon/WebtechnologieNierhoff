import React from "react";
import Input from "@material-ui/core/Input";
import "./StyledInput.css";

/**
 * Gives you the standardlayout of PidVid Searchbar
 * @param onChange Has onChange for the onChange function of the Input
 */
export default function DefaultInput(props) {
  return (
    <Input
      type="text"
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      inputProps={props.inputProps}
      fullWidth={true}
      id="Input"
      className="Input"
    />
  );
}
