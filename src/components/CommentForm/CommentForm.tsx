import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { FormContainer, Form } from "./CommentForm.styles";

interface Props {
  submitComment: (comment: string) => void;
}

const CommentForm: React.FC<Props> = ({ submitComment }) => {
  const [content, setContent] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitComment(content);
  };

  return (
    <FormContainer>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <textarea
          name="content"
          rows={3}
          cols={40}
          required
          placeholder="Type your comment here"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />

        <CustomButton type="submit" role="primary">
          Submit
        </CustomButton>
      </Form>
    </FormContainer>
  );
};

export default CommentForm;
