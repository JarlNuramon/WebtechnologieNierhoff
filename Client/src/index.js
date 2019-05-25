import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import "./Post.json";
import "./styles.css";
import { Feed } from "./Components/Feed/Feed";
import Header from "./Components/Header/Header";
import { Search } from "./Components/Search/Search";
import { Thread } from "./Thread";
import { FeedThread } from "./Components/Feed/FeedThread";
import LogoIcon from "/public/Pictures/Logo.png";
import { FullPageLogin } from "./Components/Login.jsx";
import { NormalButton } from "./Components/StyledButton.jsx";
//hahhahahahahaha
ReactModal.setAppElement("#root");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "start",
      id: null,
      showWriteModal: false,
      showPostModal: false,
      search: ""
    };
    this.setLogin = this.setLogin.bind(this);
    this.handleClosePostModal = this.handleClosePostModal.bind(this);
    this.proceedClick = this.proceedClick.bind(this);
    this.returnToStartPage = this.returnToStartPage.bind(this);
    this.postPopUp = null;
    this.searchStarted = this.searchStarted.bind(this);
    this.returnFavorite = this.returnFavorite.bind(this);
  }
  returnOpenModal() {
    return this.state.showModal;
  }
  handleOpenModal() {
    this.setState({ showWriteModal: true });
  }

  handleCloseModal() {
    this.setState({ showWriteModal: false });
  }
  handleOpenPostModal() {
    this.setState({ showPostModal: true });
  }

  handleClosePostModal() {
    this.setState({ showPostModal: false });
  }
  setLogin() {
    this.setState({ page: "login" });
    this.render();
  }
  searchStarted = searchValue => {
    this.setState({ search: searchValue, page: "thread" });
    this.render();
  };
  returnToStartPage() {
    this.setState({
      page: "start",
      id: null
    });
  }
  returnFavorite() {
    console.log("bin in returnFavorite in der Index.js");
    //TODO: Server soll hier alle fav. Videos zurück geben.
  }
  render() {
    if (this.state.page === "start")
      return (
        <div className="App">
          <Header
            showModal={this}
            action={this.returnToStartPage}
            searchAction={this.searchStarted}
            onStartPage="true"
            handleClick={this.searchStarted}
            searchFav={this.returnFavorite}
          />
          {this.state.showPostModal ? this.postPopUp : ""}
          <div id="main">
            <img src={LogoIcon} alt="logo" width="40%" />
            <Search action={this.searchStarted} />
            <Feed onclick={this.proceedClick} />
          </div>
          <NormalButton
            text="Login"
            className="Login"
            onClick={e => this.setLogin()}
          />
        </div>
      );
    if (this.state.page === "thread")
      return (
        <div className="App">
          <Header onStartPage="false" handleFav={this.returnFavorite} />
          <div id="main">
            {this.state.showPostModal ? this.postPopUp : ""}
            <FeedThread
              key="Search"
              search={this.state.search}
              onclick={this.proceedClick}
            />
          </div>
        </div>
      );
    if (this.state.page === "login") {
      return <FullPageLogin />;
    }
  }
  proceedClick(id) {
    console.log(id);
    this.postPopUp = (
      <Thread
        id={id}
        showModal={this}
        handleCloseModal={this.handleClosePostModal}
      />
    );
    this.setState({ showPostModal: true });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
