import styled from "styled-components";

export const PostsContainer = styled.div`
  max-width: 500px;
  padding: 20px;
  background-color: white;
`;

export const PostItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid silver;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding: 20px;
`;

export const PostFooter = styled.div`
  display: flex;
`;
