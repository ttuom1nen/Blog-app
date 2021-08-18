import styled, { css } from "styled-components";
import { Props } from "./CustomButton";

const defaultButtonStyles = css`
  background: #2bdfff;
`;

const primaryButtonStyles = css`
  background: #2bdfff;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    background-color: #80ecff;
  }
`;

const secondaryButtonStyles = css`
  background: white;
  color: #80b5ff;
  font-size: 12px;
  font-weight: 400;
  &:hover {
    color: #80ecff;
    text-decoration: underline;
  }
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
  padding: 10px 20px;
  color: white;
  text-shadow: 0px 1px rgba{0,0,0,0.5};
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  ${getButtonStyles}
`;
