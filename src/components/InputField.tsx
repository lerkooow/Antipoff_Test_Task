import { ChangeEvent, FC } from "react";

import styled from "styled-components";

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input<{ error?: boolean }>`
  height: 16px;
  padding: 16px;
  border-radius: 9px;
  border: none;
  background-color: #f8f8f8;
  ${({ error }) => error && `border: 2px solid red;`}

  &:focus {
    outline: none;
    border: 2px solid #512689;
    ${({ error }) => error && `border: 2px solid red;`}
  }
`;

const ErrorMessage = styled.span`
  font-family: "Roboto", sans-serif;
  margin-top: 4px;
  color: red;
  font-size: 10px;
`;

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}

const InputField: FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error = false,
  errorMessage,
}) => {
  return (
    <FormField>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} error={error} />
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FormField>
  );
};

export default InputField;
