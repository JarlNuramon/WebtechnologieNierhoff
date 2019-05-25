import React from "react";
import "./css/Login.css";
import { NormalButton } from "./StyledButton";
import Input from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const StyledInput = withStyles({
  root: {
    borderRadius: 1,
    border: 0,
    color: "black",
    height: 40,
    padding: "0 10px 0 10px"
  },
  //TODO: underline funktioniert nicht
  underline: {
    "&:after": {
      borderBottomColor: "rgba(25, 157, 116, 1)"
    }
  }
})(Input);

//Settings
const restServer = "http://server1:300"; //die url des rest servers
const thisDomain = ".server1"; //die domain des clients mit führendem " "."

/*
Displays the Login on the complete Page
 */
class FullPageLogin extends React.Component {
  render(props) {
    return (
      <div className={"FullPageLogin"}>
        <Login width={"25%"} height={"50%"} />
      </div>
    );
  }
}

/*
The Login Component can be used everywhere on the Page.
It has a width and a height prop that are passed to css.
*/
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      width: this.props.width === undefined ? "min-content" : this.props.width,
      height: this.props.height,
      status: "ready"
    };
    this.submit = this.submit.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
  }

  submit() {
    fetch(restServer + "/api/user/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({ name: this.state.user, pass: this.state.pass })
    })
      .then(response => {
        return response.text();
      })
      .then(response => {
        if (response !== "Nope") {
          document.cookie =
            "token=" + response + "; path=/; domain=" + thisDomain;
          this.setState({
            status: "loading"
          });
        } else {
          this.setState({
            status: "false"
          });
        }
      });
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangePass(e) {
    this.setState({
      pass: e.target.value
    });
  }

  render() {
    let statusObject = undefined;
    if (this.state.status === "false") {
      statusObject = <div>User oder Password falsch!</div>;
    } else if (this.state.status === "loading") {
      statusObject = <div>Loading...</div>;
    }
    return (
      <div
        style={{ width: this.state.width, height: this.state.height }}
        className={"Login"}
      >
        <div className={"LoginInner"}>
          <StyledInput
            className={"FormItem"}
            onChange={this.onChangeUser}
            placeholder={"User name..."}
          />
          <br />
          <StyledInput
            className={"FormItem"}
            onChange={this.onChangePass}
            placeholder={"Password..."}
            inputProps={{ type: "password" }}
          />
          <br />
          {statusObject}
          <NormalButton
            text="login"
            className={"FormItem"}
            onClick={this.submit}
          />
        </div>
      </div>
    );
  }
}

export { Login, FullPageLogin };
