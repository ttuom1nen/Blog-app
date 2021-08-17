import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

import { EditablePost } from "../PostList/PostList";

import { API, graphqlOperation } from "aws-amplify";
import { deletePost } from "../../graphql/mutations";

import { FaThumbsUp } from "react-icons/fa";

import {
  BlogPost,
  UserName,
  PostFooter,
  CommentList,
  LikeContainer,
  ToolTip,
} from "./PostItem.styles";
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

  const [showComments, setshowComments] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

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

  const handleMouseHover = (postId: string) => {
    setIsHovering(!isHovering);
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
        <CustomButton
          role="secondary"
          onClick={() => setshowComments(!showComments)}
        >
          {showComments ? "Hide" : "Show"} comments
        </CustomButton>

        <LikeContainer
          onClick={() =>
            currentUser !== post.postOwnerId && handleLike(post.id as string)
          }
          onMouseEnter={() =>
            post!.likes!.items?.length && handleMouseHover(post.id as string)
          }
          onMouseLeave={() => setIsHovering(false)}
          style={{
            color: post!.likes!.items!.length > 0 ? "blue" : "gray",
            cursor: currentUser !== post.postOwnerId ? "pointer" : "default",
          }}
        >
          {post?.likes?.items?.length && isHovering ? (
            <ToolTip>
              {post.likes.items.map((like) => {
                return <p key={like?.id}>{like?.likeOwnerUsername}</p> || "";
              })}
            </ToolTip>
          ) : null}

          <FaThumbsUp />
          {post.likes && post.likes.items ? post.likes.items.length : null}
        </LikeContainer>

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
      {showComments && (
        <CommentList>
          <CommentForm submitComment={handleSubmitComment}></CommentForm>
          {renderComments()}
        </CommentList>
      )}
    </BlogPost>
  );
};

export default PostItem;
