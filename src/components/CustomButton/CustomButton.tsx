import React, { ReactNode } from "react";
import { Button } from "./CustomButton.styles";

export interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  role?: "primary" | "secondary";
}

const CustomButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Button {...props} onClick={props.onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
