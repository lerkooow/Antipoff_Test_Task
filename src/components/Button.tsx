import { FC } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 48px;
  margin-top: 24px;
  background-color: #512689;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
`;

interface ButtonProps {
  type: "submit" | "button" | "reset";
  children: string;
  onSubmit?: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ type, onSubmit, children }) => {
  return (
    <StyledButton type={type} onClick={onSubmit}>
      {children}
    </StyledButton>
  );
};

export default Button;
