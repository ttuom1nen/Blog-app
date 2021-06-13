import React, { useEffect, useState } from "react";
import PostItem from "../Post/PostItem";
import { listPosts } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { Post, OnCreatePostSubscription } from "../../API";
import { PostsContainer } from "./PostList.styles";

import { onCreatePost } from "../../graphql/subscriptions";

interface PostData {
  value: {
    data: OnCreatePostSubscription;
  };
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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
    });

    return () => {
      createPostListener.unsubscribe();
    };
  }, [posts]);

  const renderPosts = () => {
    return posts?.map((post: Post) => {
      return <PostItem post={post}></PostItem>;
    });
  };

  if (posts && posts.length) {
    return <PostsContainer>{renderPosts()}</PostsContainer>;
  }

  return null;
};

export default PostList;
