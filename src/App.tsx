import React from "react";
import PostList from "./components/PostList/PostList";
import CreatePost from "./components/CreatePost/CreatePost";
import { withAuthenticator } from "aws-amplify-react";
import "./App.css";

import { Auth } from "aws-amplify";

function App() {
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <div className="App">
      <button onClick={signOut}>Sign out</button>
      <CreatePost></CreatePost>
      <PostList></PostList>
    </div>
  );
}

export default withAuthenticator(App);
