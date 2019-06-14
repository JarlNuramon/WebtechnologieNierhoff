import React from "react";
import "./Login.css";
import { NormalButton } from "./../StyledButton/StyledButton";
import Input from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import LogoIcon from "../../Pictures/Logo.png";

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
const restServer = "http://localhost:300"; //die url des rest servers
const thisDomain = ".localhost"; //die domain des clients mit führendem " "."



/*
The Login Component can be used everywhere on the Page.
It has a width and a height prop that are passed to css.
*/
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      width: this.props.width === undefined ? "min-content" : this.props.width,
      height: this.props.height,
      status: "ready",
      returnToStartPage: false
    };
    this.submit = this.submit.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.toStartPage = props.actionToStart;
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
            console.log(response);
            document.cookie = "token=" + response + ";";
            document.cookie = "path=/;";
            document.cookie = "domain=" + thisDomain + ";"
            document.cookie = "user=" + this.state.user + ";";
            this.setState({
              status: "loading"
            });
          } else {
            this.setState({
              status: "false"
            });
          }
        })
    this.getAll();
  }

  getAll(){
    var cookieList = (document.cookie) ? document.cookie.split(';') : [];
    var cookieValues = {};
    for (var i = 0, n = cookieList.length; i !== n; ++i) {
      var cookie = cookieList[i];
      var f = cookie.indexOf('=');
      if (f >= 0) {
        var cookieName = cookie.substring(0, f);
        var cookieValue = cookie.substring(f + 1);
        console.log ("cookieName=" + cookieName + " cookieValue=" + cookieValue);
        if (!cookieValues.hasOwnProperty(cookieName)) {
          cookieValues[cookieName] = cookieValue;
        }
      }
    }
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
          statusObject = <div className="false">Bitte Benutzername und Passwort eingeben. Beide Felder berücksichtigen die Groß-/Kleinschreibung.</div>;
    }
    if (this.state.status === "loading") {
      statusObject = <div>Success...</div>;
      this.toStartPage();
    }
    return (

        <div className={"FullPageLogin"}>
          <img src={LogoIcon} className="logoInMain" alt="logo" width="40%" />
          <div
              style={{ width: this.state.width, height: this.state.height }}
              className={"Login"}
          >
            <div className={"LoginInner"}>
                {statusObject}
                <StyledInput
                  className={"FormItem"}
                  onChange={this.onChangeUser}
                  placeholder={"User name..."}
              />
              <StyledInput
                  className={"FormItem"}
                  onChange={this.onChangePass}
                  placeholder={"Password..."}
                  inputProps={{ type: "password" }}
              />
              <NormalButton
                  text="login"
                  className={"FormItem"}
                  onClick={this.submit}
              />
            </div>
          </div>
        </div>
    );
  }
}
