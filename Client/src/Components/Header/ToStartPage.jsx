import React from "react";
import { LogoButton } from "./../StyledButton.jsx";

export class ToStartPage extends React.Component {
  constructor(props) {
    super(props);
    this.action = props.action;
  }

  render() {
    return (
      <LogoButton
        onClick={() => {
          this.action(
            this.setState({
              page: "start",
              id: null
            })
          );
        }}
      />
    );
  }
}
