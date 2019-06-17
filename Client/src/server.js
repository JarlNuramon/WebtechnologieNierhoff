const domain = "zweipluseins.de";
const port = "300";

const server_adress = "http://" + domain + ":" + port;
const section = server_adress + "/api/section";
const post = server_adress + "/api/post";
const login = server_adress + "/api/user/login";
const favorite = server_adress + "/api/favorite";
const favoriteget = favorite + "/get";
const newest = server_adress + "/api/post/newest";
const filteredData = section + "/filteredData";
const searchTags = server_adress + "/api/tags";
const search = server_adress + "/api/post/search/";
const theID = server_adress + "/api/post/id/";
const postTree = server_adress + "/api/tree";
const postNode = server_adress + "/api/treenode";
const postAll = server_adress + "/api/posts";
const videoInTree = server_adress + "/api/tree/video/";
const treeNode = server_adress+"/api/treenodes/";

export {
  domain,
  server_adress,
  section,
  post,
  login,
  favorite,
  newest,
  search,
  theID,
  favoriteget,
  filteredData,
  searchTags,
  postTree,
  postNode,
    postAll,
  videoInTree,
  treeNode,
};
