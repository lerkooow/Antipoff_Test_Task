import { FC, useState, useEffect } from "react";

import styled from "styled-components";

import { logout } from "../features/authSlice";
import { useAppDispatch } from "../hooks";

import { MdExitToApp } from "react-icons/md";

const HeaderPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #512689;
  position: relative;
`;

const Header = styled.h1`
  margin: 64px 0 16px 0;
  text-align: center;
  font-size: 64px;
  color: #fff;

  @media (max-width: 425px) {
    font-size: 36px;
  }
`;

const Description = styled.h2`
  max-width: 846px;
  margin: 0 0 64px 0;
  text-align: center;
  font-size: 20px;
  color: #fff;

  @media (max-width: 768px) {
    margin: 0 20.5px 64px 20.5px;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 32px;
  right: 80px;
  padding: 8px;
  font-size: 16px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;

  @media (max-width: 375px) {
    display: none;
  }

  &:hover {
    box-shadow: 0px 0px 8px rgba(265, 265, 265, 0.5);
  }
`;

const IconButton = styled(MdExitToApp)`
  position: absolute;
  top: 23px;
  right: 27px;
  width: 18px;
  height: 18px;
  color: #fff;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const TitlePage: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <HeaderPage>
        {isMobile ? <IconButton onClick={handleLogout} /> : <Button onClick={handleLogout}>Выход</Button>}
        <Header>Наша команда</Header>
        <Description>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить
          выход из любых, даже самых сложных ситуаций.
        </Description>
      </HeaderPage>
    </div>
  );
};

export default TitlePage;
