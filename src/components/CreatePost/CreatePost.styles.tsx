import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 500px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 10px;
  }
`;
