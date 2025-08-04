import styled from "styled-components";

interface Props {
  justify?: string;
  align?: string;
  gap?: string;
  direction?: "row" | "column";
  wrap?: string;
  margin?: string;
  height?: string;
}

const FlexBox = styled.div<Props>`
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ align }) => align || "stretch"};
  gap: ${({ gap }) => gap || "0"};
  flex-direction: ${({ direction }) => direction || "row"};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
  margin: ${({ margin }) => margin || "0 0 16px 0"};
  height: ${({ height }) => height || "auto"};
`;

export default FlexBox;
