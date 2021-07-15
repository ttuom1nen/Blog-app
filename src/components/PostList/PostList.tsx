import React, { useEffect, useState } from "react";
import PostItem from "../Post/PostItem";
import EditPost from "../EditPost/EditPost";
import { listPosts } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import {
  Post,
  OnCreatePostSubscription,
  OnDeletePostSubscription,
} from "../../API";
import { PostsContainer } from "./PostList.styles";
import { onCreatePost, onDeletePost } from "../../graphql/subscriptions";

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

export interface EditablePost extends Post {
  editmode?: boolean;
}

const PostList = () => {
  const [posts, setPosts] = useState<EditablePost[]>([]);

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
        console.log(newPost);
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
        console.log(deletedPost);
        const updatedPosts = posts.filter((post) => post.id !== deletedPost.id);
        setPosts(updatedPosts);
      },
    });

    return () => {
      createPostListener.unsubscribe();
      deletePostListener.unsubscribe();
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

  const submitEditedPost = (
    postId: string,
    postTitle: string,
    postBody: string
  ) => {
    console.log("Submit");
  };

  const renderPosts = () => {
    return posts?.map((post: EditablePost) => {
      return !post.editmode ? (
        <PostItem key={post.id} post={post} editPost={editPostById}></PostItem>
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
