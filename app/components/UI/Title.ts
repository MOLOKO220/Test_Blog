import styled from "styled-components";

interface TitleProps {
  fontSize?: string;
}

const Title = styled.h1<TitleProps>`
  font-size: ${({ fontSize }) => fontSize || "2rem"};
  margin: 0;
`;

export default Title;
