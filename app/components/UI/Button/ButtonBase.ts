import styled from "styled-components";

export type ButtonStyleProps = {
  $bg?: string;
  $color?: string;
  $border?: string;
  $hoverBg?: string;
  $shadow?: string;
  $height?: string;
};

function darkenColor(color: string) {
  try {
    const amt = -20;
    return `#${color.replace(/^#/, "").replace(/../g, (col) =>
      Math.max(0, Math.min(255, parseInt(col, 16) + amt))
        .toString(16)
        .padStart(2, "0")
    )}`;
  } catch {
    return "#1565c0";
  }
}

const ButtonBase = styled.button<ButtonStyleProps>`
  background-color: ${({ $bg }) => $bg || "#1976d2"};
  color: ${({ $color }) => $color || "white"} !important;
  border: ${({ $border }) => $border || "none"};
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  transition: background-color 0.2s;
  height: ${({ $height }) => $height || "33px"};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ $shadow }) => $shadow || "none"};
  text-decoration: none;
  cursor: pointer;
  padding: 0 16px;

  &:hover {
    background-color: ${({ $hoverBg, $bg }) =>
      $hoverBg || ($bg ? darkenColor($bg) : "#1565c0")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default ButtonBase;
