import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import "./Post.json";
import "./styles.css";
import { Feed } from "/src//Components/Feed/Feed";
import Header from "/src//Components/Header/Header";
import { Search } from "/src//Components/Search/Search";
import { Thread } from "/src//Components/Thread/Thread";
import { FeedThread } from "/src//Components/Feed/FeedThread";
import LogoIcon from "/public/Pictures/Logo.png";
import { FullPageLogin } from "/src//Components/Login.jsx";
import { NormalButton } from "/src//Components/StyledButton/StyledButton.jsx";
import { Filter } from "/src//Components/Filter/Filter";
import Collapse from "@material-ui/core/Collapse";
import LearningTree from "/src/Components/LearningTree/LearningTree.jsx";
ReactModal.setAppElement("#root");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "start",
      id: null,
      showWriteModal: false,
      showPostModal: false,
      search: "",
      showFilter: false,
      isOpenTreeModal: false
    };
    this.setLogin = this.setLogin.bind(this);
    this.handleClosePostModal = this.handleClosePostModal.bind(this);
    this.proceedClick = this.proceedClick.bind(this);
    this.returnToStartPage = this.returnToStartPage.bind(this);
    this.postPopUp = null;
    this.searchStarted = this.searchStarted.bind(this);
    this.switchFilter = this.switchFilter.bind(this);
    this.returnFavorite = this.returnFavorite.bind(this);
  }
  closeTree = () => {
    this.setState({ isOpenTreeModal: false });
  };

  treeClick = id => {
    this.setState({ isOpenTreeModal: false });
    this.proceedClick(id);
  };

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
    this.setState({ search: searchValue, showFilter: false, page: "thread" });
    this.render();
  };
  returnToStartPage() {
    this.setState({
      page: "start",
      id: null
    });
  }
  switchFilter() {
    this.setState({
      showFilter: !this.state.showFilter
    });
    console.log("bin in switchFilter");
  }
  returnFavorite() {
    //TODO: Server soll hier alle fav. Videos zurück geben.
  }
  closeTree = () => {
    this.setState({ isOpenTreeModal: false });
  };

  render() {
    if (this.state.page === "start")
      return (
        <div className="App">
          <Header
            showModal={this}
            action={this.returnToStartPage}
            searchAction={this.searchStarted}
            onStartPage={true}
            handleClick={this.searchStarted}
            filter={this.switchFilter}
            searchFav={this.returnFavorite}
            aria-label="Collapse"
          />
          <Collapse in={this.state.showFilter}>
            <Filter searchAction={this.searchStarted} />
          </Collapse>
          {this.state.showPostModal ? this.postPopUp : ""}
          {this.state.isOpenTreeModal ? this.tree : ""}
          <div id="main">
            <img src={LogoIcon} className="logoInMain" alt="logo" width="40%" />
            <Search action={this.searchStarted} filter={this.switchFilter} />
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
          <Header onStartPage={false} handleFav={this.returnFavorite} />
          <Collapse in={this.state.showFilter}>
            <Filter searchAction={this.searchStarted} />
          </Collapse>
          <div id="main">
            {this.state.showPostModal ? this.postPopUp : ""}
            {this.state.isOpenTreeModal ? this.tree : ""}
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

  checkIfisPartOfTree(id) {
    let json = require("/src/LearningStack.json");
    for (var i = 0; i < json.Stack.length; i++) {
      if (json.Stack[i].video_id === id) return json.Stack[i].id;
    }
    return -1;
  }
  proceedClick(id) {
    let tree = this.checkIfisPartOfTree(id);
    console.log(tree);
    if (tree !== -1) {
      this.tree = (
        <LearningTree
          id={tree}
          openThread={this.treeClick}
          showModal={this}
          close={this.closeTree}
        />
      );
      this.treeComponent = (
        <NormalButton
          text="Tree"
          className="Treemaker"
          onClick={e => {
            this.setState({ showPostModal: false });
            this.forceUpdate();
            this.setState({ isOpenTreeModal: true });
          }}
        />
      );
    }
    this.postPopUp = (
      <Thread
        id={id}
        showModal={this}
        handleCloseModal={this.handleClosePostModal}
        tree={this.treeComponent}
      />
    );
    this.setState({ showPostModal: true });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
