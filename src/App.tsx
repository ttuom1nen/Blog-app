import React from "react";
import PostList from "./components/PostList/PostList";
import CreatePost from "./components/CreatePost/CreatePost";
import { withAuthenticator } from "aws-amplify-react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CreatePost></CreatePost>
      <PostList></PostList>
    </div>
  );
}

export default withAuthenticator(App);
