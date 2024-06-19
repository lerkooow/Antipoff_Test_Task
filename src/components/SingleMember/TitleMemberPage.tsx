import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { MdExitToApp } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchMemberQuery } from "../../features/teamSlice";

const HeaderPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #512689;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Name = styled.h1`
  margin: 64px 0 16px 0;
  font-size: 64px;
  color: #fff;

  @media (max-width: 1024px) {
    font-size: 54px;
    margin: 64px 0 16px 0;
  }

  @media (max-width: 768px) {
    font-size: 54px;
    margin: 64px 0 16px 0;
  }

  @media (max-width: 425px) {
    font-size: 36px;
    margin: 64px 0 16px 0;
  }
`;

const Role = styled.h2`
  max-width: 846px;
  margin: 0 0 64px 0;
  font-size: 32px;
  color: #fff;

  @media (max-width: 425px) {
    font-size: 20px;
  }
`;

const Button = styled.button`
  padding: 8px;
  font-family: "Roboto", sans-serif;
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

const IconButtonRight = styled(MdExitToApp)`
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

const IconButtonLeft = styled(IoIosArrowBack)`
  position: absolute;
  top: 23px;
  left: 27px;
  width: 18px;
  height: 18px;
  color: #fff;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MemberImage = styled.img`
  width: 187px;
  height: 187px;
  border-radius: 50%;
  margin-bottom: 39px;
`;

const Wrapper = styled.div`
  display: flex;
  padding-top: 39px;
  gap: 32px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 0;
  }
`;

const WrapperText = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const WrapperButton = styled.div`
  padding: 39px 80px 0 80px;
`;

export const StyledLinkWhite = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const TitleMemberPage: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Member ID is missing</div>;
  }

  const { data, isLoading } = useFetchMemberQuery({ id });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/account/login");
  };

  return (
    <div>
      <HeaderPage>
        <WrapperButton>
          {isMobile ? (
            <IconButtonLeft />
          ) : (
            <Button>
              <StyledLinkWhite to="/our-team">Назад</StyledLinkWhite>
            </Button>
          )}
        </WrapperButton>
        <Wrapper>
          <MemberImage src={data?.data.avatar} />
          <WrapperText>
            <Name>{`${data?.data.first_name} ${data?.data.last_name}`}</Name>
            <Role>Партнер</Role>
          </WrapperText>
        </Wrapper>
        <WrapperButton>{isMobile ? <IconButtonRight /> : <Button onClick={handleLogout}>Выход</Button>}</WrapperButton>
      </HeaderPage>
    </div>
  );
};

export default TitleMemberPage;
