import React from "react";
import CustomButton from "../CustomButton/CustomButton";

import { EditablePost } from "../PostList/PostList";

import { API, graphqlOperation } from "aws-amplify";
import { deletePost } from "../../graphql/mutations";

import { FaThumbsUp } from "react-icons/fa";

import { BlogPost, UserName, PostFooter, CommentList } from "./PostItem.styles";
import CommentForm from "../CommentForm/CommentForm";
import CommentItem from "../Comment/CommentItem";

interface Props {
  post: EditablePost;
  currentUser: string;
  editPost: (id: string, mode?: boolean | undefined) => void;
  submitComment: (id: string, comment: string) => void;
  submitLike: (id: string) => void;
}

const PostItem: React.FC<Props> = ({
  post,
  currentUser,
  editPost,
  submitComment,
  submitLike,
}) => {
  const handlePostDelete = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const input = {
      id: post.id,
    };
    await API.graphql(graphqlOperation(deletePost, { input }));
  };

  const handlePostEdit = (id: string) => {
    editPost(id);
  };

  const handleSubmitComment = (comment: string) => {
    if (!post.id) return;
    submitComment(post.id, comment);
  };

  const handleLike = (postId: string) => {
    submitLike(postId);
  };

  if (!post.id) {
    return null;
  }

  const renderComments = () => {
    if (!post.comments || !post.comments.items) {
      return null;
    }

    return post.comments.items.map((comment) => (
      <CommentItem key={comment!.id} commentData={comment!}></CommentItem>
    ));
  };

  return (
    <BlogPost>
      <h3>{post.postTitle}</h3>
      <p>{post.postBody}</p>
      <UserName>
        {post.postOwnerUsername}
        <time>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : null}
        </time>
      </UserName>

      <PostFooter>
        <p onClick={() => handleLike(post.id as string)}>
          {currentUser !== post.postOwnerId ? <FaThumbsUp /> : "Likes: "}
          {post.likes && post.likes.items ? post.likes.items.length : null}
        </p>

        {currentUser === post.postOwnerId && (
          <>
            <CustomButton
              role="secondary"
              onClick={() => handlePostEdit(post.id as string)}
            >
              Edit
            </CustomButton>
            <CustomButton role="secondary" onClick={handlePostDelete}>
              Delete
            </CustomButton>
          </>
        )}
      </PostFooter>

      <CommentList>
        <CommentForm submitComment={handleSubmitComment}></CommentForm>
        {renderComments()}
      </CommentList>
    </BlogPost>
  );
};

export default PostItem;
