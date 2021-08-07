import React from "react";
import { Comment } from "../../API";

interface Props {
  commentData: Comment;
}

const CommentItem: React.FC<Props> = ({ commentData }) => {
  return (
    <div>
      <time>{new Date().toDateString()}</time>
      {commentData.content}
    </div>
  );
};

export default CommentItem;
