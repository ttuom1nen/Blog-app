import React, { useState, useEffect } from "react";
import { FormContainer, Form } from "./CreatePost.styles";
import CustomButton from "../CustomButton/CustomButton";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createPost } from "../../graphql/mutations";

interface SubmitPost {
  postOwnerId: string;
  postOwnerUsername: string;
  postTitle: string;
  postBody: string;
  createdAt: string;
}

const CreatePost = () => {
  const [postOwnerId, setpostOwnerId] = useState<string>("");
  const [postOwnerUsername, setpostOwnerUsername] = useState<string>("Paul");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const input: SubmitPost = {
      postOwnerId,
      postOwnerUsername,
      postTitle,
      postBody,
      createdAt: new Date().toISOString(),
    };

    try {
      await API.graphql(graphqlOperation(createPost, { input }));
    } catch (error) {
      console.error(error);
    }
    setPostTitle("");
    setPostBody("");
  };

  return (
    <FormContainer>
      <Form className="add-post" onSubmit={(event) => handleSubmit(event)}>
        <input
          name="postTitle"
          type="text"
          placeholder="Title"
          value={postTitle}
          onChange={(event) => setPostTitle(event.target.value)}
          required
        ></input>

        <textarea
          name="postBody"
          placeholder="New blog post"
          rows={3}
          cols={40}
          value={postBody}
          onChange={(event) => setPostBody(event.target.value)}
          required
        ></textarea>

        <CustomButton type="submit">Submit</CustomButton>
      </Form>
    </FormContainer>
  );
};

export default CreatePost;
