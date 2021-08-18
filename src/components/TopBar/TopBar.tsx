import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import {
  TopBarContainer,
  UserNameContainer,
  UserActionContainer,
} from "./TopBar.styles";

interface Props {
  doSignOut: () => void;
  userId: string;
  userName: string;
}

const TopBar: React.FC<Props> = ({ doSignOut, userId, userName }) => {
  return (
    <TopBarContainer>
      <h3>Blog app</h3>
      <UserActionContainer>
        <UserNameContainer>Logged in as {userName}</UserNameContainer>
        <CustomButton onClick={doSignOut} role="secondary">
          Sign out
        </CustomButton>
      </UserActionContainer>
    </TopBarContainer>
  );
};

export default TopBar;
