import React, { useState, useEffect } from "react";
import { FormContainer, Form } from "./CreatePost.styles";
import CustomButton from "../CustomButton/CustomButton";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createPost } from "../../graphql/mutations";

const CreatePost = () => {
  const [postOwnerId, setpostOwnerId] = useState<string>(
    "38f68148-e908-5300-92a8-cc2368c31471"
  );
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("handleSubmit");

    const input = {
      postOwnerId,
      postOwnerUsername,
      postTitle,
      postBody,
      createdAt: new Date().toISOString(),
    };

    console.log(input);

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
