import React from "react";
import ReactDOM from "react-dom";

import ReactModal from "react-modal";
import "./Post.json";
import "./styles.css";
import { Feed } from "./Components/Feed";
import Header from "./Components/Header";
import { Search } from "./Components/Search";
import { Thread } from "./Thread";
import { WritePopUp } from "./Components/WritePopUp";
import { FeedThread } from "./Components/FeedThread";

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

    this.proceedClick = this.proceedClick.bind(this);
    this.returnToStartPage = this.returnToStartPage.bind(this);
    this.postPopUp = null;
  }
  searchStarted = searchValue => {
    console.log(searchValue);
    this.setState({ search: searchValue, page: "thread" });
    this.render();
  };

  render() {
    if (this.state.page === "start")
      return (
        <div className="App">
          <Header showModal={this} />
          <div id="main">
            <Search action={this.searchStarted} />
            <Feed onclick={this.proceedClick} />
          </div>
        </div>
      );
    if (this.state.page === "thread")
      return (
        <div className="App">
          <Header />
          <Search action={this.searchStarted} />
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
  returnToStartPage() {
    this.setState({
      page: "start",
      id: null
    });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
