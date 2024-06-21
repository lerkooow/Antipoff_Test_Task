import { FC } from "react";

import styled from "styled-components";

const LoadingText = styled.p`
  display: flex;
  align-items: center;
  font-size: 30px;
`;

const Loading: FC = () => <LoadingText>Загрузка...</LoadingText>;

export default Loading;
