import styled from "styled-components";

export const BlogPost = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
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
  justify-content: flex-end;
`;

export const CommentList = styled.div`
  padding: 20px;
`;

export const LikeContainer = styled.div`
  position: relative;
`;

export const ToolTip = styled.div`
  position: absolute;
  background: white;
  border: 1px solid silver;
  padding: 10px;
  box-shadow: 0 2px 5px 1px rgb(0 0 0 / 10%);
  bottom: 54px;
  transform: translateX(-50%);
`;
