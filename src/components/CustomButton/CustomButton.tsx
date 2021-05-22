import React, { ReactNode } from "react";
import { CustomButtonContainer } from "./CustomButton.styles";

export interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  role?: "delete";
}

const DeleteButton: React.FC<Props> = ({ children, ...props }) => {
  return <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;
};

export default DeleteButton;
