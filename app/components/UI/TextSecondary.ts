import styled from "styled-components";

interface Props {
  color?: string;
  fontStyle?: string;
}

const TextSecondary = styled.p<Props>`
  color: ${({ color }) => color || "#8d8d8d"};
  margin-top: 8px;
  font-size: 1rem;
  line-height: 1.5;
  font-style: ${({ fontStyle }) => fontStyle || "normal"};
`;

export default TextSecondary;
