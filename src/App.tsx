import React, { useState, useEffect } from "react";
import PostList from "./components/PostList/PostList";
import CreatePost from "./components/CreatePost/CreatePost";
import { withAuthenticator } from "aws-amplify-react";
import "./App.css";

import { Auth } from "aws-amplify";
import TopBar from "./components/TopBar/TopBar";

import { MainContent } from "./App.styles";

function App() {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentUserInfo();
        setUserId(user.attributes.sub);
        setUserName(user.username);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <div className="App">
      <TopBar userId={userId} userName={userName} doSignOut={signOut}></TopBar>
      <MainContent>
        <CreatePost userId={userId} userName={userName}></CreatePost>
        <PostList userId={userId} userName={userName}></PostList>
      </MainContent>
    </div>
  );
}

export default withAuthenticator(App);
