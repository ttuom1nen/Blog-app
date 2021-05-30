import styled, { css } from "styled-components";
import { Props } from "./CustomButton";

const defaultButtonStyles = css`
  background: #2bdfff;
`;

const primaryButtonStyles = css`
  background: #2bdfff;
`;

const secondaryButtonStyles = css`
  background: #3bddff;
`;

const getButtonStyles = (props: Props) => {
  if (props.role === "primary") {
    return primaryButtonStyles;
  }

  if (props.role === "secondary") {
    return secondaryButtonStyles;
  }

  return defaultButtonStyles;
};

export const Button = styled.button`
  min-width: 90px;
  margin: 5px;
  padding: 20px;
  color: white;
  text-shadow: 0px 1px rgba{0,0,0,0.5};
  border: 0;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: red;
  }

  ${getButtonStyles}
`;
