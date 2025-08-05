import styled from "styled-components";
import Link from "next/link";

const CardLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid #bcbcbcff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export default CardLink;
