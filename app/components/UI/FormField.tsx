"use client";

import styled, { css } from "styled-components";
import { useId } from "react";
import { FieldError } from "react-hook-form";

const Wrapper = styled.div<{ $margin?: string }>`
  position: relative;
  margin-top: ${({ $margin }) => $margin || "24px"};
  width: 100%;
`;

const sharedStyles = css<{ $error?: boolean }>`
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  border: 1px solid ${({ $error }) => ($error ? "#d32f2f" : "#7b7b7bff")};
  border-radius: 8px;
  background: #c7c7c7ff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#d32f2f" : "#1976d2")};
  }

  &:not(:placeholder-shown) + label {
    transform: translate(0px, -27px) scale(0.75);
    color: ${({ $error }) => ($error ? "#d32f2f" : "#666")};
  }

  &:focus + label {
    transform: translate(0px, -27px) scale(0.75);
    color: ${({ $error }) => ($error ? "#d32f2f" : "#1976d2")};
  }
`;

const Input = styled.input<{ $error?: boolean }>`
  height: 53px;
  ${sharedStyles}
`;

const Textarea = styled.textarea<{ $error?: boolean }>`
  resize: vertical;
  min-height: 120px;
  ${sharedStyles}
`;

const Label = styled.label<{ $error?: boolean }>`
  background: #c7c7c7ff;
  position: absolute;
  top: 20px;
  left: 14px;
  font-size: 1rem;
  color: ${({ $error }) => ($error ? "#d32f2f" : "#666")};
  pointer-events: none;
  transition: 0.2s ease;
  padding: 0 4px;
`;

const ErrorText = styled.div`
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 4px;
`;

type Props = {
  label: string;
  error?: FieldError;
  multiline?: boolean;
  rows?: number;
  margin?: string;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export default function FormField({
  label,
  error,
  value,
  multiline,
  rows,
  margin,
  ...rest
}: Props) {
  const id = useId();

  return (
    <Wrapper $margin={margin}>
      {multiline ? (
        <Textarea
          id={id}
          placeholder=" "
          $error={!!error}
          rows={rows || 4}
          value={value}
          {...rest}
        />
      ) : (
        <Input
          id={id}
          placeholder=" "
          $error={!!error}
          value={value}
          {...rest}
        />
      )}
      <Label htmlFor={id} $error={!!error}>
        {label}
      </Label>
      {error && <ErrorText>{error.message}</ErrorText>}
    </Wrapper>
  );
}
