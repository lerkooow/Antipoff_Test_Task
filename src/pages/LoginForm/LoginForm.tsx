import { ChangeEvent, FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { loginUser, resetError } from "../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { StyledLinkBlack } from "../OurTeam/OurTeam";
import { validateEmail, validatePassword } from "../../validation/validation";

import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const FormContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
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

const PasswordField = styled.div`
  position: relative;
`;

const PasswordIcon = styled.span`
  position: absolute;
  right: 20px;
  top: 40px;
`;

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }

    return () => {
      dispatch(resetError());
    };
  }, [token, dispatch]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const error = validateEmail(value);
    setEmailError(error);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const error = validatePassword(value);
    setPasswordError(error);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) return;

    await dispatch(loginUser({ email, password }));
  };

  return (
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
          <PasswordField>
            <InputField
              label="Пароль"
              type={showPassword ? "password" : "text"}
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              errorMessage={passwordError}
            />
            <PasswordIcon onClick={toggleShowPassword}>{showPassword ? <LuEyeOff /> : <LuEye />}</PasswordIcon>
          </PasswordField>
          <Button type="submit">Войти</Button>
          <RegText>
            <Error>{error}</Error>
            <StyledLinkBlack to="/account/registration">Еще нет аккаунта? Зарегистрируйтесь</StyledLinkBlack>
          </RegText>
        </FormContent>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
