import React, { FC } from "react";
import styled from "styled-components";

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 48px;
  margin-top: 8px;
  background-color: #512689;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
`;

interface SubmitButtonProps {
  type: "submit" | "button" | "reset";
  children: string;
  onSubmit?: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const SubmitButton: FC<SubmitButtonProps> = ({ type, onSubmit, children }) => {
  return (
    <Button type={type} onClick={onSubmit}>
      {children}
    </Button>
  );
};

export default SubmitButton;
