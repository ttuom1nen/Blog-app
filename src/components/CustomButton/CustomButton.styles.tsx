import styled, { css } from "styled-components";
import { Props } from "./CustomButton";

const buttonStyles = css`
  background: #2bdfff;
`;

const deleteButtonStyles = css`
  background: #c94f30;
`;

const getButtonStyles = (props: Props) => {
  if (props.role === "delete") {
    return deleteButtonStyles;
  }

  return buttonStyles;
};

export const CustomButtonContainer = styled.button`
  cursor: pointer;
  padding: 20px;
  color: white;
  border: 0;
  border-radius: 3px;
  ${getButtonStyles}
`;
