import React from "react";
import {
  CommentContainer,
  CommentDate,
  CommentBody,
} from "./CommentItem.styles";

import { Comment } from "../../API";

interface Props {
  commentData: Comment;
}

const CommentItem: React.FC<Props> = ({ commentData }) => {
  return (
    <CommentContainer>
      <CommentBody>{commentData.content}</CommentBody>
      <CommentDate>{new Date().toLocaleDateString()}</CommentDate>
    </CommentContainer>
  );
};

export default CommentItem;
