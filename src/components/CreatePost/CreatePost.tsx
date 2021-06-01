import React, { useState, useEffect } from "react";
import { FormContainer, Form } from "./CreatePost.styles";
import CustomButton from "../CustomButton/CustomButton";
import { API, graphqlOperation } from "aws-amplify";
import { createPost } from "../../graphql/mutations";

const CreatePost = () => {
  const [ownerId, setOwnerId] = useState<string>(
    "38f68148-e908-5300-92a8-cc2368c31471"
  );
  const [ownerUserName, setOwnerUsername] = useState<string>("Paul");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");

  useEffect(() => {}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input = {
      ownerId,
      ownerUserName,
      postTitle,
      postBody,
      createdAt: new Date().toISOString(),
    };

    await API.graphql(graphqlOperation(createPost, { input }));
    setPostTitle("");
    setPostBody("");
  };

  return (
    <FormContainer>
      <Form className="add-post" onSubmit={handleSubmit}>
        <input
          name="postTitle"
          type="text"
          placeholder="Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        ></input>

        <textarea
          name="postBody"
          placeholder="New blog post"
          rows={3}
          cols={40}
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required
        ></textarea>

        <CustomButton type="submit">Submit</CustomButton>
      </Form>
    </FormContainer>
  );
};

export default CreatePost;
