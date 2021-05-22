import React, { useEffect, useState } from "react";
import { listPosts } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { Post } from "../../API";
import { PostsContainer, PostItem, UserName } from "./PostList.styles";
import CustomButton from "../CustomButton/CustomButton";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    (async () => {
      // Rationale for any:
      // As of 22.05.2021 the graphql response type does not know .data
      const response: any = await API.graphql(graphqlOperation(listPosts));

      if (response) {
        setPosts(response.data.listPosts.items);
      }
    })();
  }, []);

  const renderPosts = () => {
    return posts?.map((post: Post) => {
      return (
        <PostItem key={post.id}>
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
          <CustomButton role="delete">Delete</CustomButton>
        </PostItem>
      );
    });
  };

  if (posts && posts.length) {
    return <PostsContainer>{renderPosts()}</PostsContainer>;
  }

  return null;
};

export default PostList;
