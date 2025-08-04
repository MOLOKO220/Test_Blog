import styled from "styled-components";
import type { FormHTMLAttributes } from "react";

const Form = styled.form<FormHTMLAttributes<HTMLFormElement>>`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export default Form;
