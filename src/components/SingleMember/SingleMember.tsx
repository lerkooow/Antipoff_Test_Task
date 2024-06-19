import { FC } from "react";
import styled from "styled-components";

import TitleMemberPage from "./TitleMemberPage";
import { useFetchMemberQuery } from "../../features/teamSlice";
import { useParams } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 48px;
  gap: 129px;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 0;
  }
`;

const Description = styled.p`
  max-width: 630px;
  margin: 0;
  font-size: 16px;

  @media (max-width: 1024px) {
    margin: 16px 32px;
  }
`;

const WrapperEmail = styled.div`
  display: flex;
  gap: 8px;
  font-size: 16px;
`;

const Email = styled.p`
  margin: 0;
`;

const IconEmail = styled(AiOutlineMail)`
  margin-top: 3px;
  color: #512689;
  width: 21px;
  height: 15px;
`;

const SingleMember: FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Member ID is missing</div>;
  }

  const { data, isLoading } = useFetchMemberQuery({ id });

  return (
    <>
      <TitleMemberPage />
      <Wrapper>
        <Description>
          Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие
          аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше
          понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать
          продажи, используя самые современные аналитические инструменты. В работе с клиентами недостаточно просто
          решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену
          знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно
          новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое,
          чтобы дальше развиваться самостоятельно". Помимо разнообразных проектов для клиентов финансового сектора,
          Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической
          медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
        </Description>
        <WrapperEmail>
          <IconEmail />
          <Email>{data?.data.email}</Email>
        </WrapperEmail>
      </Wrapper>
    </>
  );
};

export default SingleMember;
