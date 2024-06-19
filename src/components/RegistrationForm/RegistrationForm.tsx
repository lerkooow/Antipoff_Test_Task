import { ChangeEvent, FC, useState, useEffect } from "react";
import styled from "styled-components";
import InputField from "../InputField";
import SubmitButton from "../Button";
import { StyledLinkBlack } from "../OurTeam/OurTeam";
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "../../validation/validation";
import { regUser } from "../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormContent = styled.div`
  padding: 16px;
`;

const Header2 = styled.h2`
  margin: 0 0 16px 0;
  font-size: 20px;
`;

const LoginText = styled.p`
  margin: 0;
  text-align: center;
  font-size: 20px;
`;

const Error = styled.p`
  margin: 5px 0;
  padding-top: 5px;
  text-align: center;
  color: red;
  font-size: 20px;
`;

const RegistrationForm: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { token, loading, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const error = validateEmail(value);
    setEmailError(error);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(e.target.value);

    if (value) {
      setPasswordError("");
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (value) {
      setNameError("");
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    const error = validateConfirmPassword(password, value);
    setConfirmPasswordError(error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const nameValidationError = validateName(name);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    setNameError(nameValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    if (emailValidationError || passwordValidationError || confirmPasswordValidationError || nameValidationError) {
      return;
    }

    if (token) {
      navigate("/our-team");
    }

    dispatch(regUser({ email, password }));
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <Header2>Регистрация</Header2>
          <InputField
            label="Имя"
            type="text"
            placeholder="Артур"
            onChange={handleNameChange}
            error={Boolean(nameError)}
            errorMessage={nameError}
          />
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
          <InputField
            label="Подтвердите пароль"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={Boolean(confirmPasswordError)}
            errorMessage={confirmPasswordError}
          />
          <SubmitButton type="submit">Зарегистрироваться</SubmitButton>
        </FormContent>
        <LoginText>
          <Error>{error}</Error>
          <StyledLinkBlack to="account/login">Уже есть аккаунт? Войдите</StyledLinkBlack>
        </LoginText>
      </Form>
    </Wrapper>
  );
};

export default RegistrationForm;
