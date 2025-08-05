"use client";

import styled, { useTheme } from "styled-components";

interface Props {
  children: React.ReactNode;
  fontStyle?: string;
  className?: string;
}

const StyledText = styled.p<{ $fontStyle?: string; $color?: string }>`
  color: ${({ $color }) => $color};
  margin-top: 8px;
  font-size: 1rem;
  line-height: 1.5;
  font-style: ${({ $fontStyle }) => $fontStyle || "normal"};
`;

export default function TextSecondaryComponent({
  children,
  fontStyle = "normal",
  className,
}: Props) {
  const theme = useTheme();

  return (
    <StyledText
      className={className}
      $fontStyle={fontStyle}
      $color={theme.colors.text}
    >
      {children}
    </StyledText>
  );
}
