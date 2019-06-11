import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import "./Post.json";
import "./styles.css";
import { Feed } from "./Components/Feed/Feed";
import Header from "./Components/Header/Header";
import { Search } from "./Components/Search/Search";
import { Thread } from "./Components/Thread/Thread.jsx";
import { FeedThread } from "./Components/Feed/FeedThread";
import LogoIcon from "./Pictures/Logo.png";
import { FullPageLogin } from "./Components/Login.jsx";
import { NormalButton } from "./Components/StyledButton/StyledButton.jsx";
import { Filter } from "./Components/Filter/Filter";
import Collapse from "@material-ui/core/Collapse";
import LearningTree from "./Components/LearningTree/LearningTree.jsx";
import {TreeButton} from "./Components/StyledButton/StyledButton.jsx";

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
    let json = require("./LearningStack.json");
    let treeIds = [];
    for (var i = 0; i < json.Stack.length; i++) {
      if (json.Stack[i].video_id === id) treeIds.push(json.Stack[i].id);
    }
    if (treeIds.length >= 1) return treeIds;
    return [-1];
  }
  treeProccessing = id => {
    console.log(id);
    this.tree = (
      <LearningTree
        id={id}
        openThread={this.treeClick}
        showModal={this}
        close={this.closeTree}
      />
    );
    this.setState({ showPostModal: false });
    this.forceUpdate();
    this.setState({ isOpenTreeModal: true });
  };
  proceedClick(id) {
    let tree = this.checkIfisPartOfTree(id);
    console.log(tree);
    if (tree[0] !== -1) {
      var treeComponent = tree.map(element => (
        <TreeButton
          text="Tree"
          key={element}
          id={element}
          className="Treemaker"
          onClick={this.treeProccessing}
        />
      ));
    }
    this.postPopUp = (
      <Thread
        id={id}
        showModal={this}
        handleCloseModal={this.handleClosePostModal}
        tree={treeComponent}
      />
    );
    this.setState({ showPostModal: true });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
