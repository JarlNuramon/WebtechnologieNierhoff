import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ShareIcon from "/public/Pictures/share.png";
import LogoIcon from "/public/Pictures/Logo.png";

const StyledButton = withStyles({
  root: {
    background: "rgba(25,157,116,1)",
    borderRadius: 1,
    border: 0,
    color: "black",
    height: 40,
    padding: "0 30px",
    margin: "center"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);
/**
 * Gives you the standardlayout of PidVid buttons
 * @param onClick Has onClick for the onClick function of the buttons
 * @param text Has text which is used to render the text onto the button.
 */
export function NormalButton(props) {
  return (
    <StyledButton onClick={props.onClick} className={props.className}>
      {props.text}
    </StyledButton>
  );
}
const X = withStyles({
  root: {
    background: "rgba(25,157,116,0)",
    borderRadius: 1,
    border: 0,
    color: "rgba(25,157,116,1)",
    height: 40,
    padding: "0 30px"
  },
  label: {
    textTransform: "capitalize"
  },
  LogoButton: {
    size: "small"
    //height: 8
  }
})(Button);

export function StartButton(props) {
  return <Start onClick={props.onClick}>{props.text}</Start>;
}
const Start = withStyles({
  root: {
    background: "rgba(25,157,116,0)",
    border: "1px solid",
    "border-color": "rgba(25,157,116,1)",
    "border-style": "solid",
    height: 40,
    padding: "0 30px",
    color: "rgba(25, 157, 116, 1)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

/**
 * Gives you the standardlayout of PidVid exit buttons
 * @param onClick Has onClick for the onClick exit function
 */
export function ExitButton(props) {
  return (
    <X variant="outlined" onClick={props.onClick}>
      x
    </X>
  );
}
const StyleLogoButton = withStyles({
  root: {
    width: 140,
    padding: "center"
  }
})(Button);
/**
 * Gives you the PidVid Logo as a Button
 * @param onClick Has onClick for the onClick ToStartPage Class
 */
export function LogoButton(props) {
  return (
    <StyleLogoButton onClick={props.onClick}>
      <img src={LogoIcon} alt="logo" />
    </StyleLogoButton>
  );
}
const StyleShareButton = withStyles({
  root: {
    width: 0
  }
})(Button);
/**
 * Gives you a ShareButton in PidVid Green
 * @param onClick Has onClick for the onClick to function
 */
export function ShareButton(props) {
  return (
    <StyleShareButton onClick={props.onClick}>
      <img src={ShareIcon} alt="ShareButton" width="30px" />
    </StyleShareButton>
  );
}
