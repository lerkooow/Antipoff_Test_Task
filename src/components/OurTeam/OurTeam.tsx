import { FC } from "react";
import styled from "styled-components";
import TitlePage from "./TitlePage";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useFetchTeamMembersQuery } from "../../features/teamSlice";

const MemberCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 64px auto 0 auto;
  max-width: 975px;
  justify-content: center;
`;

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 305px;
  height: 263px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const MemberImage = styled.img`
  width: 124px;
  height: 124px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const NameMember = styled.h2`
  font-size: 20px;
`;

const Button = styled.button`
  font-size: 16px;
  height: 40px;
  width: 170px;
  margin: 56px auto;
  display: block;
  background-color: transparent;
  color: #151317;
  border: 2px solid #151317;
  border-radius: 8px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const OurTeam: FC = () => {
  const { data, isLoading } = useFetchTeamMembersQuery();

  return (
    <>
      <TitlePage />
      <MemberCards>
        {data?.data.map((member) => (
          <MemberCard key={member.id}>
            <MemberImage src={member.avatar} />
            <StyledLink to={`/${member.id}`}>
              <NameMember>{`${member.first_name} ${member.last_name}`}</NameMember>
            </StyledLink>
          </MemberCard>
        ))}
      </MemberCards>
      <Button>
        Показать еще
        <IoIosArrowDown />
      </Button>
    </>
  );
};

export default OurTeam;
