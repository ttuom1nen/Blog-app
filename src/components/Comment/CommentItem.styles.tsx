import styled from "styled-components";

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  margin: 5px;
`;

export const CommentBody = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
`;

export const CommentDate = styled.time`
  font-size: 12px;
  color: darkgray;
`;
