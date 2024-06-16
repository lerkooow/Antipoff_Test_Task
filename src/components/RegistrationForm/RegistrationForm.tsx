import { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import InputField from "../InputField";
import SubmitButton from "../Button";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
`;

const Form = styled.form`
  max-width: 500px;
  height: 519px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormContent = styled.div`
  padding: 16px;
`;

const Header2 = styled.h2`
  font-family: "Roboto", sans-serif;
  margin: 0 0 16px 0;
  font-size: 20px;
`;

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Ошибка");
    } else {
      setEmailError("");
    }
  };

  return (
    <Wrapper>
      <Form>
        <FormContent>
          <Header2>Регистрация</Header2>
          <InputField label="Имя" type="text" placeholder="Артур" />
          <InputField
            label="Электронная почта"
            type="email"
            placeholder="example@mail.ru"
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            errorMessage={emailError}
          />
          <InputField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField
            label="Подтвердите пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SubmitButton type="submit">Зарегистрироваться</SubmitButton>
        </FormContent>
      </Form>
    </Wrapper>
  );
};

export default RegistrationForm;
