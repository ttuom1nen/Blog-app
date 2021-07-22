import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { BlogPost, PostFooter } from "../Post/PostItem.styles";
import { FormContainer, Form } from "../CreatePost/CreatePost.styles";
import { EditablePost } from "../PostList/PostList";

interface Props {
  post: EditablePost;
  editPost: (id: string, mode?: boolean) => void;
  submitPost: (id: string, postTitle: string, postBody: string) => void;
}

const EditPost: React.FC<Props> = ({ post, editPost, submitPost }) => {
  const [postTitle, setPostTitle] = useState(post.postTitle || "");
  const [postBody, setPostBody] = useState(post.postBody || "");

  const handleSubmitEditForm = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    submitPost(post.id as string, postTitle, postBody);
  };

  return (
    <BlogPost>
      <FormContainer>
        <Form
          className="add-post"
          onSubmit={(event) => handleSubmitEditForm(event)}
        >
          <input
            type="text"
            placeholder="Title"
            value={postTitle}
            name="postTitle"
            onChange={(event) => setPostTitle(event.target.value)}
          />
          <textarea
            value={postBody}
            name="postBody"
            onChange={(event) => setPostBody(event.target.value)}
          />
          <PostFooter>
            <CustomButton
              role="secondary"
              onClick={() => editPost(post.id as string, false)}
              type="button"
            >
              Cancel
            </CustomButton>

            <CustomButton role="primary" type="submit">
              Update
            </CustomButton>
          </PostFooter>
        </Form>
      </FormContainer>
    </BlogPost>
  );
};

export default EditPost;
