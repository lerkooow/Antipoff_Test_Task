import React, { ChangeEvent, FC, useState, useEffect } from "react";
import styled from "styled-components";
import InputField from "../InputField";
import Button from "../Button";
import { loginUser } from "../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { StyledLinkBlack } from "../OurTeam/OurTeam";
import { validateEmail, validatePassword } from "../../validation/validation";

const FormContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  width: 100%;
`;

const Form = styled.form`
  width: 500px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const FormContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 16px;
`;

const Header2 = styled.h2`
  margin: 0 0 16px 0;
  font-size: 20px;
`;

const RegText = styled.p`
  text-align: center;
  font-size: 20px;
  position: relative;
`;

const Error = styled.p`
  margin: 5px 0;
  padding-top: 5px;
  text-align: center;
  color: red;
  font-size: 20px;
`;

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token, loading, error } = useAppSelector((state) => state.auth);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const error = validateEmail(value);
    setEmailError(error);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      return;
    }

    if (token) {
      navigate("/our-team");
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormContent>
            <Header2>Вход</Header2>
            <InputField
              label="Электронная почта"
              type="email"
              placeholder="example@mail.ru"
              value={email}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              errorMessage={emailError}
            />
            <InputField
              label="Пароль"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              errorMessage={passwordError}
            />
            <Button type="submit">Войти</Button>
            <RegText>
              <Error>{error}</Error>
              <StyledLinkBlack to="/">Еще нет аккаунта? Зарегистрируйтесь</StyledLinkBlack>
            </RegText>
          </FormContent>
        </Form>
      </FormContainer>
    </>
  );
};

export default LoginForm;
