import { FC, useEffect } from "react";
import styled from "styled-components";
import { fetchTeamMembers } from "../../store/teamSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TitlePage from "./TitlePage";
import { IoIosArrowDown } from "react-icons/io";

const MemberCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 64px auto 0 auto;
  max-width: 1280px;
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
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 400;
`;

const Button = styled.button`
  font-family: "Roboto", sans-serif;
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

const OurTeam: FC = () => {
  const dispatch = useAppDispatch();
  const { members } = useAppSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  return (
    <>
      <TitlePage />
      <MemberCards>
        {members.map((member) => (
          <MemberCard key={member.id}>
            <MemberImage src={member.avatar} />
            <NameMember>{`${member.first_name} ${member.last_name}`}</NameMember>
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
