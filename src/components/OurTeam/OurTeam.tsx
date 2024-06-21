import { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import TitlePage from "./TitlePage";
import Loading from "../Loading/Loading";

import { TeamMember } from "../../features/teamSlice";
import { fetchTeamMembers, setPage, toggleLike, loadLikes } from "../../features/teamSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";

const MemberCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 64px auto 0 auto;
  max-width: 975px;
  justify-content: center;
  min-height: 546px;
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

export const StyledLinkBlack = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapperPageNumber = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  justify-content: center;
`;

const IconBack = styled(IoIosArrowBack)`
  margin: 40px;
  cursor: pointer;
`;

const IconForward = styled(IoIosArrowForward)`
  margin: 40px;
  cursor: pointer;
`;

const IconHear = styled.div`
  margin-left: 245px;
  height: 28px;
  width: 30px;
  cursor: pointer;
`;

const OurTeam: FC = () => {
  const { members, loading, page, total_pages, liked } = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeamMembers(page));
  }, [dispatch, page]);

  useEffect(() => {
    const likedMembers = JSON.parse(localStorage.getItem("likedMembers") || "{}");
    dispatch(loadLikes(likedMembers));
  }, [dispatch]);

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handleNextPage = () => {
    if (page < total_pages) {
      dispatch(setPage(page + 1));
    }
  };

  const handleToggleLike = (id: number) => {
    dispatch(toggleLike(id));
  };

  return (
    <>
      <TitlePage />
      <Wrapper>
        <MemberCards>
          {loading ? (
            <Loading />
          ) : (
            members.map((item: TeamMember) => (
              <MemberCard key={item.id}>
                <MemberImage src={item.avatar} />
                <StyledLinkBlack to={`/${item.id}`}>
                  <NameMember>{`${item.first_name} ${item.last_name}`}</NameMember>
                </StyledLinkBlack>
                <IconHear onClick={() => handleToggleLike(item.id)}>
                  {liked[item.id] ? <GoHeartFill color="#512689" /> : <GoHeart />}
                </IconHear>
              </MemberCard>
            ))
          )}
        </MemberCards>
        <WrapperPageNumber>
          <IconBack onClick={handlePrevPage} />
          <p>{page}</p>
          <IconForward onClick={handleNextPage} />
        </WrapperPageNumber>
      </Wrapper>
    </>
  );
};

export default OurTeam;
