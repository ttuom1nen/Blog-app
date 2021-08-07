import React, { useEffect, useState } from "react";
import PostItem from "../Post/PostItem";
import EditPost from "../EditPost/EditPost";
import { listPosts } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import {
  Post,
  OnCreatePostSubscription,
  OnDeletePostSubscription,
  OnUpdatePostSubscription,
  OnCreateCommentSubscription,
} from "../../API";
import { PostsContainer } from "./PostList.styles";
import {
  onCreatePost,
  onDeletePost,
  onUpdatePost,
  onCreateComment,
} from "../../graphql/subscriptions";
import { Auth } from "aws-amplify";
import { updatePost, createComment } from "../../graphql/mutations";

interface PostData {
  value: {
    data: OnCreatePostSubscription;
  };
}

interface DeletedPostData {
  value: {
    data: OnDeletePostSubscription;
  };
}

interface UpdatePostData {
  value: {
    data: OnUpdatePostSubscription;
  };
}

interface CreateCommentData {
  value: {
    data: OnCreateCommentSubscription;
  };
}

export interface EditablePost extends Post {
  editmode?: boolean;
}

const PostList = () => {
  const [posts, setPosts] = useState<EditablePost[]>([]);
  const [postOwnerId, setpostOwnerId] = useState<string>("");
  const [postOwnerUsername, setpostOwnerUsername] = useState<string>("Paul");

  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentUserInfo();
        setpostOwnerId(user.attributes.sub);
        setpostOwnerUsername(user.username);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // Rationale for any:
        // As of 22.05.2021 the graphql response type does not know .data
        // TODO: Fix it
        const response: any = await API.graphql(graphqlOperation(listPosts));
        if (response) {
          setPosts(response.data.listPosts.items);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const createPostListener = (
      API.graphql(graphqlOperation(onCreatePost)) as any
    ).subscribe({
      next: (postData: PostData) => {
        // TODO: Fix any
        const newPost: any = postData.value.data.onCreatePost;
        const prevPosts = posts.filter((post) => post.id !== newPost.id);
        const updatedPosts = [newPost, ...prevPosts];

        setPosts(updatedPosts);
      },
      error: (error: string) => console.warn(error),
    });

    const deletePostListener = (
      API.graphql(graphqlOperation(onDeletePost)) as any
    ).subscribe({
      next: (postData: DeletedPostData) => {
        // TODO: Fix any
        const deletedPost: any = postData.value.data.onDeletePost;
        const updatedPosts = posts.filter((post) => post.id !== deletedPost.id);
        setPosts(updatedPosts);
      },
    });

    const updatePostListener = (
      API.graphql(graphqlOperation(onUpdatePost)) as any
    ).subscribe({
      next: (postData: UpdatePostData) => {
        // TODO: Fix any
        const updatedPost: any = postData.value.data.onUpdatePost;
        const updatedPosts = posts.map((post) =>
          post.id === updatedPost!.id ? updatedPost : post
        );

        setPosts(updatedPosts);
      },
      error: (error: string) => console.warn(error),
    });

    const createPostCommentListener = (
      API.graphql(graphqlOperation(onCreateComment)) as any
    ).subscribe({
      next: (commentData: CreateCommentData) => {
        const createdComment = commentData.value.data.onCreateComment;

        if (!createdComment || !createdComment.post) return;

        let newPosts = [...posts];

        for (let post of newPosts) {
          if (!post.comments || !post.comments.items) break;

          if (post.id === createdComment.post!.id) {
            (post.comments.items as any).push(createdComment);
          }
        }

        setPosts(newPosts);
      },
      error: (error: string) => console.warn(error),
    });

    return () => {
      createPostListener.unsubscribe();
      deletePostListener.unsubscribe();
      updatePostListener.unsubscribe();
      createPostCommentListener.unsubscribe();
    };
  }, [posts]);

  const editPostById = (id: string, mode?: boolean | undefined) => {
    const newPosts: EditablePost[] = posts.map((post: EditablePost) => {
      if (post.id === id) {
        return { ...post, editmode: mode === undefined ? true : mode };
      }

      return { ...post, editmode: false };
    });

    setPosts(newPosts);
  };

  const submitEditedPost = async (
    postId: string,
    postTitle: string,
    postBody: string
  ) => {
    const input = {
      id: postId,
      postOwnerId,
      postOwnerUsername,
      postTitle,
      postBody,
    };

    editPostById(postId, false);
    await API.graphql(graphqlOperation(updatePost, { input }));
  };

  const submitComment = async (postId: string, comment: string) => {
    const input = {
      commentPostId: postId,
      commentOwnerId: postOwnerId,
      commentOwnerUsername: postOwnerUsername,
      content: comment,
      createdAt: new Date().toISOString(),
    };

    await API.graphql(graphqlOperation(createComment, { input }));
  };

  const renderPosts = () => {
    return posts?.map((post: EditablePost) => {
      return !post.editmode ? (
        <PostItem
          key={post.id}
          post={post}
          editPost={editPostById}
          submitComment={submitComment}
        ></PostItem>
      ) : (
        <EditPost
          key={post.id}
          post={post}
          editPost={editPostById}
          submitPost={submitEditedPost}
        ></EditPost>
      );
    });
  };

  if (posts && posts.length) {
    return <PostsContainer>{renderPosts()}</PostsContainer>;
  }

  return null;
};

export default PostList;
